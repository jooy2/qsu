import assert from 'assert';
import { after, before, describe, it } from 'node:test';
import {
	createDirectory,
	touchFile,
	createFileOfSize,
	emptyDirectory,
	deletePath,
	getCopyFileName,
	getFileExtension,
	getFileHashFromPath,
	getFileHashFromStream,
	getFileInfo,
	getFileName,
	getFilePathDepth,
	getFileSize,
	getParentFilePath,
	headFile,
	isExistingPath,
	isFileHidden,
	isValidFileName,
	joinFilePath,
	moveFile,
	normalizeFilePathUnicode,
	tailFile,
	toPosixFilePath,
	normalizeFilePath
} from '../dist/node';
import {
	createReadStream,
	mkdirSync,
	mkdtempSync,
	rmSync,
	symlinkSync,
	writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const TARGET_PATH = 'test/_resources/files';
const IS_WINDOWS_OS = process.platform === 'win32';
const LONG_PATH =
	'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\115.0.1901.203\\Trust Protection Lists';

describe('File', () => {
	it('isFileHidden', async () => {
		assert.strictEqual(await isFileHidden('/home/user/Desktop/hello.txt'), false);
		assert.strictEqual(await isFileHidden('~/.bash_profile'), true);
		assert.strictEqual(await isFileHidden('.zshrc'), true);
		assert.strictEqual(await isFileHidden('/home/user/Desktop/.hidden'), true);
		assert.strictEqual(await isFileHidden('/home/user/Desktop/.conf/config'), false);
		assert.strictEqual(await isFileHidden('/home/user/Desktop/.conf/.secret'), true);
		if (IS_WINDOWS_OS) {
			assert.strictEqual(await isFileHidden('C:\\ProgramData', true), true);
			assert.strictEqual(await isFileHidden('C:\\Users', true), false);
		}
	});

	it('isExistingPath', async () => {
		assert.strictEqual(await isExistingPath(`${TARGET_PATH}/hello.md`), true);
		assert.strictEqual(await isExistingPath(`${TARGET_PATH}`), true);
		assert.strictEqual(await isExistingPath(`${TARGET_PATH}/MV_TEST.txt`), true);
		assert.strictEqual(await isExistingPath(`${TARGET_PATH}/not-exists.txt`), false);
	});

	it('normalizeFilePath', () => {
		assert.strictEqual(normalizeFilePath('home'), '/home');
		assert.strictEqual(normalizeFilePath('/home//test/'), '/home/test');
		assert.strictEqual(normalizeFilePath('home/test/.conf'), '/home/test/.conf');
		assert.strictEqual(normalizeFilePath('/'), '/');
		assert.strictEqual(normalizeFilePath(''), '/');
		assert.strictEqual(normalizeFilePath('', true), '\\');
		assert.strictEqual(normalizeFilePath('\\', true), '\\');
		assert.strictEqual(normalizeFilePath('\\Users', true), '\\Users');
		assert.strictEqual(normalizeFilePath('\\\\net\\work', true), '\\\\net\\work');
		assert.strictEqual(
			normalizeFilePath('\\\\net\\work\\\\file.json', true),
			'\\\\net\\work\\file.json'
		);
		assert.strictEqual(normalizeFilePath('C:', true), 'C:\\');
		assert.strictEqual(normalizeFilePath('C:\\Users\\', true), 'C:\\Users');
		assert.strictEqual(normalizeFilePath('C:\\\\\\Users\\test\\', true), 'C:\\Users\\test');
		assert.strictEqual(normalizeFilePath('\\Users\\test\\.config', true), '\\Users\\test\\.config');
		assert.strictEqual(normalizeFilePath('Users\\test\\.config', true), '\\Users\\test\\.config');
	});

	it('joinFilePath', () => {
		assert.strictEqual(joinFilePath(true, 'C:\\', 'Windows', 'System32'), 'C:\\Windows\\System32');
		assert.strictEqual(joinFilePath(true, 'D:\\'), 'D:\\');
		assert.strictEqual(joinFilePath(true, 'C:\\', 'Windows', '..', 'text.txt'), 'C:\\text.txt');
		assert.strictEqual(
			joinFilePath(true, 'C:\\', 'Windows', '\\System32', 'text.txt'),
			'C:\\Windows\\System32\\text.txt'
		);
		assert.strictEqual(
			joinFilePath(true, 'C:\\', 'Windows', '\\System32', '.text.txt'),
			'C:\\Windows\\System32\\.text.txt'
		);
		assert.strictEqual(joinFilePath(true, 'Users', 'test\\'), '\\Users\\test');
		assert.strictEqual(joinFilePath(true, 'Users'), '\\Users');
		assert.strictEqual(joinFilePath(true, '\\\\net', '\\home'), '\\\\net\\home');
		assert.strictEqual(
			joinFilePath(true, '\\\\net', 'home', 'text.txt'),
			'\\\\net\\home\\text.txt'
		);
		assert.strictEqual(
			joinFilePath(true, '\\\\net', 'home', '.abc.txt'),
			'\\\\net\\home\\.abc.txt'
		);
		assert.strictEqual(
			joinFilePath(false, '/C:/', 'Users', 'test', 'text.txt'),
			'/C:/Users/test/text.txt'
		);
		assert.strictEqual(joinFilePath(false, '/'), '/');
		assert.strictEqual(joinFilePath(false, '/home/'), '/home');
		assert.strictEqual(joinFilePath(false, '/home//user/'), '/home/user');
		assert.strictEqual(
			joinFilePath(false, 'home', 'user', 'hello.world', 'text.txt'),
			'/home/user/hello.world/text.txt'
		);
		assert.strictEqual(joinFilePath(false, '/home', '/user', 'Desktop/'), '/home/user/Desktop');
		assert.strictEqual(joinFilePath(false, 'home', 'user', '.bashrc'), '/home/user/.bashrc');
		assert.strictEqual(joinFilePath(false, 'home', 'user', '..', '.bashrc'), '/home/.bashrc');
	});

	it('getFileSize', async () => {
		assert.strictEqual(await getFileSize(`${TARGET_PATH}/hello.md`), IS_WINDOWS_OS ? 89 : 82);
		assert.strictEqual(await getFileSize(`${TARGET_PATH}/MV_TEST.txt`), IS_WINDOWS_OS ? 14 : 13);
	});

	it('getCopyFileName', () => {
		const fileNameLists = [
			'123',
			'456 (1)',
			'aaa.txt',
			'bbb.txt',
			'bbb (1).txt',
			'ccc.txt',
			'ccc (1).txt',
			'ccc (1) (1).txt',
			'ccc (2).txt',
			'ccc (3).txt',
			'ccc (4).txt',
			'ddd.aaa.txt',
			'ddd.bbb.txt',
			'ddd.bbb (1).txt',
			'ddd.aaa.aaa (1).txt'
		];

		assert.strictEqual(getCopyFileName('abc', fileNameLists), 'abc');
		assert.strictEqual(getCopyFileName('abc.txt', fileNameLists), 'abc.txt');
		assert.strictEqual(getCopyFileName('123', fileNameLists), '123 (1)');
		assert.strictEqual(getCopyFileName('456 (1)', fileNameLists), '456 (1) (1)');
		assert.strictEqual(getCopyFileName('aaa.txt', fileNameLists), 'aaa (1).txt');
		assert.strictEqual(getCopyFileName('aaa (1).txt', fileNameLists), 'aaa (1).txt');
		assert.strictEqual(getCopyFileName('bbb.txt', fileNameLists), 'bbb (2).txt');
		assert.strictEqual(getCopyFileName('bbb (1).txt', fileNameLists), 'bbb (1) (1).txt');
		assert.strictEqual(getCopyFileName('ccc.txt', fileNameLists), 'ccc (5).txt');
		assert.strictEqual(getCopyFileName('ddd.aaa.txt', fileNameLists), 'ddd.aaa (1).txt');
		assert.strictEqual(
			getCopyFileName('ddd.aaa.aaa (1).txt', fileNameLists),
			'ddd.aaa.aaa (1) (1).txt'
		);
	});

	it('getFilePathDepth', () => {
		assert.strictEqual(getFilePathDepth('C:'), 1);
		assert.strictEqual(getFilePathDepth('C:\\'), 1);
		assert.strictEqual(getFilePathDepth('C:\\Windows\\System32'), 3);
		assert.strictEqual(getFilePathDepth(LONG_PATH), 7);
		assert.strictEqual(getFilePathDepth('/'), 1);
		assert.strictEqual(getFilePathDepth('/home/user'), 3);
		assert.strictEqual(getFilePathDepth('/home/user/.ssh/test file.txt'), 5);
	});

	it('getParentFilePath', () => {
		assert.strictEqual(getParentFilePath('/'), '/');
		assert.strictEqual(getParentFilePath('/home/user/test.txt'), '/home/user');
		assert.strictEqual(getParentFilePath('/home/user/abc'), '/home/user');
		assert.strictEqual(getParentFilePath('/home'), '/');
		assert.strictEqual(getParentFilePath('/'), '/');
		assert.strictEqual(getParentFilePath('C:\\', true), 'C:\\');
		assert.strictEqual(getParentFilePath('C:\\Users', true), 'C:\\');
		assert.strictEqual(getParentFilePath('C:\\Users\\user', true), 'C:\\Users');
		assert.strictEqual(getParentFilePath('C:\\Users\\user\\text.txt', true), 'C:\\Users\\user');
	});

	it('toPosixFilePath', () => {
		assert.strictEqual(toPosixFilePath('\\\\Shared'), '/Shared');
		assert.strictEqual(toPosixFilePath('C:\\'), 'C:/');
		assert.strictEqual(toPosixFilePath('C:\\Windows\\System32'), 'C:/Windows/System32');
		assert.strictEqual(toPosixFilePath('Windows\\System32'), 'Windows/System32');
		assert.strictEqual(
			toPosixFilePath(LONG_PATH),
			'C:/Program Files (x86)/Microsoft/Edge/Application/115.0.1901.203/Trust Protection Lists'
		);
		assert.strictEqual(toPosixFilePath('/home/user/Test file.txt'), '/home/user/Test file.txt');
	});

	it('isValidFileName', () => {
		assert.strictEqual(isValidFileName('System32'), true);
		assert.strictEqual(isValidFileName('.example', false), true);
		// The ':' lives in the extension; the whole name is validated.
		assert.strictEqual(isValidFileName('hello.:txt', false), false);
		assert.strictEqual(isValidFileName('C:\\Windows\\System32'), true);
		assert.strictEqual(isValidFileName('C:\\Users\\test\\Desktop\\hello.txt'), true);
		assert.strictEqual(isValidFileName('C:\\Users\\test\\Desktop\\hello*'), false);
		assert.strictEqual(isValidFileName('C:\\Users\\test\\Desktop\\hello!@#$%^&*()_+-:='), false);
		assert.strictEqual(isValidFileName('hello!@#$%^&*()_+-:=', false), false);
		assert.strictEqual(isValidFileName('/home/test/Desktop/test/.example', false), true);
		assert.strictEqual(isValidFileName('/home/test/Desktop/test/text.txt', false), true);
		assert.strictEqual(isValidFileName('/home/test/Desktop/test/hi!@#$%^&*()_+-=', false), true);
		assert.strictEqual(isValidFileName('/home/test/Desktop/test/*hi', false), true);
		assert.strictEqual(
			isValidFileName(
				'/home/test/Desktop/test/0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345'
			),
			false
		); // 256
		assert.strictEqual(
			isValidFileName(
				'/home/test/Desktop/test/012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234',
				false
			),
			true
		); // 255
	});

	const hashTable = IS_WINDOWS_OS
		? {
				md5: '239884dde2b4354613a228001b22d9b9',
				sha1: '38851813f75627d581c593f3ccfb7061dd013fbd',
				sha256: 'db42a58ad98348dc8647ef27054ffcab994a2359fe9e0daeeffe8cbfe2409583',
				sha512:
					'c0be4b1ff1aba7be9b02d619dd10e0bdfa4149cf0f241320fe237336aea286ff68c3f42fae4d707a1a59dc6a269e730d3bc4b9891347647bb5acb82b5792a503'
			}
		: {
				md5: '192ef428bd3e3413262df05679cee825',
				sha1: '2accd3e31a50c5ed9c6786ef34669bbda55d7156',
				sha256: '568770a759ef55df5c2a5d3cbfc5c62e2ade6a353c391037d91a97212dec9e88',
				sha512:
					'b03187c2962c947de2d5d3cdaa2f25e5e1df31c5190cccf42d03759d042dd5f5a2773ca9903e122b6faaf4a53b45c419d605464abb83cbe578ed249cb558844a'
			};

	it('getFileHashFromPath', async () => {
		const path = `${TARGET_PATH}/STATIC_FILE.txt`;

		assert.strictEqual(await getFileHashFromPath(path), hashTable.md5);
		assert.strictEqual(await getFileHashFromPath(path, 'sha1'), hashTable.sha1);
		assert.strictEqual(await getFileHashFromPath(path, 'sha256'), hashTable.sha256);
		assert.strictEqual(await getFileHashFromPath(path, 'sha512'), hashTable.sha512);
	});

	it('getFileHashFromStream', async () => {
		const path = `${TARGET_PATH}/STATIC_FILE.txt`;

		assert.strictEqual(await getFileHashFromStream(createReadStream(path)), hashTable.md5);
		assert.strictEqual(await getFileHashFromStream(createReadStream(path), 'sha1'), hashTable.sha1);
		assert.strictEqual(
			await getFileHashFromStream(createReadStream(path), 'sha256'),
			hashTable.sha256
		);
		assert.strictEqual(
			await getFileHashFromStream(createReadStream(path), 'sha512'),
			hashTable.sha512
		);
	});

	it('getFileExtension', () => {
		assert.strictEqual(getFileExtension('test.123/sample.txt'), 'txt');
		assert.strictEqual(getFileExtension('test.123/sample'), null);
		assert.strictEqual(getFileExtension('test/sample.txt'), 'txt');
		assert.strictEqual(getFileExtension('test/hello.1/sample.txt'), 'txt');
		assert.strictEqual(getFileExtension('test/sample'), null);
		assert.strictEqual(getFileExtension('test.txt.sample'), 'sample');
		assert.strictEqual(getFileExtension('test'), null);
		assert.strictEqual(getFileExtension('TEST.FILE.TXT'), 'txt');
		assert.strictEqual(getFileExtension('test..txt..png'), 'png');
		assert.strictEqual(getFileExtension('txt'), null);
		assert.strictEqual(getFileExtension('txt.png'), 'png');
		assert.strictEqual(getFileExtension('/home/txt.txt'), 'txt');
		assert.strictEqual(getFileExtension('/home/txt.abc.png'), 'png');
		assert.strictEqual(getFileExtension('C:\\test\\txt.png'), 'png');
		assert.strictEqual(getFileExtension('C:\\test.hello.sample\\txt'), null);
		assert.strictEqual(getFileExtension('C:\\test.hello.sample\\txt.txt'), 'txt');
	});

	it('getFileName', () => {
		assert.strictEqual(getFileName('test/sample.txt'), 'sample');
		assert.strictEqual(getFileName('test/sample'), 'sample');
		assert.strictEqual(getFileName('test/sample/'), 'sample');
		assert.strictEqual(getFileName('test/'), 'test');
		assert.strictEqual(getFileName('test/sample', true), 'sample');
		assert.strictEqual(getFileName('test/sample.txt.sample'), 'sample.txt');
		assert.strictEqual(getFileName('test/sample.txt', true), 'sample.txt');
		assert.strictEqual(getFileName('test/sample.a/'), 'sample.a');
		assert.strictEqual(getFileName('C:\\Users\\user\\Desktop\\hello.txt'), 'hello');
		assert.strictEqual(getFileName('C:\\Users\\user\\Desktop\\hello.txt', true), 'hello.txt');
		assert.strictEqual(getFileName('C:\\Users\\user\\Desktop'), 'Desktop');
		assert.strictEqual(getFileName('C:\\Users\\user\\Desktop\\'), 'Desktop');
		assert.strictEqual(getFileName('test'), 'test');
	});

	it('normalizeFilePathUnicode', async () => {
		const NFD = '안녕하세요_12345-ABCDE'.normalize('NFD'); // macOS
		const NFC = '안녕하세요_12345-ABCDE'.normalize('NFC'); // Windows

		assert.strictEqual(await normalizeFilePathUnicode(NFD, 'NFC'), NFC);
		assert.strictEqual(await normalizeFilePathUnicode(NFC, 'NFD'), NFD);
	});

	it('getFileInfo', async () => {
		assert(await getFileInfo(`${TARGET_PATH}/STATIC_FILE.txt`));
		assert(await getFileInfo('test'));
	});

	it('headFile', async () => {
		assert.strictEqual(await headFile(`${TARGET_PATH}/hello.md`), '# Hello, World!');
		assert.strictEqual(await headFile(`${TARGET_PATH}/hello.md`, 1), '# Hello, World!');
		assert.strictEqual(
			await headFile(`${TARGET_PATH}/hello.md`, 4),
			'# Hello, World!\n\nThis is Hello File.\n'
		);
	});

	it('tailFile', async () => {
		assert.strictEqual(await tailFile(`${TARGET_PATH}/hello.md`), '--- Hello End ---');
		assert.strictEqual(await tailFile(`${TARGET_PATH}/hello.md`, 1), '--- Hello End ---');
		assert.strictEqual(
			await tailFile(`${TARGET_PATH}/hello.md`, 4),
			'\nDo not modify this file.\n\n--- Hello End ---'
		);
	});

	it('createDirectory', async () => {
		await createDirectory(`${TARGET_PATH}/abc`);
		await createDirectory(`${TARGET_PATH}/abc/def`);

		assert.strictEqual(await isExistingPath(`${TARGET_PATH}/abc`), true);
		assert.strictEqual(await isExistingPath(`${TARGET_PATH}/abc/def`), true);

		await deletePath(`${TARGET_PATH}/abc`);

		assert.strictEqual(await isExistingPath(`${TARGET_PATH}/abc`), false);
		assert.strictEqual(await isExistingPath(`${TARGET_PATH}/abc/def`), false);
	});

	it('touchFile', async () => {
		const testFilePath = `${TARGET_PATH}/__TEST__TOUCH_FILE.txt`;

		await touchFile(testFilePath);

		assert.strictEqual(await isExistingPath(testFilePath), true);
	});

	it('deletePath', async () => {
		const testFilePath = `${TARGET_PATH}/__TEST__TOUCH_FILE.txt`;

		await deletePath(testFilePath);

		assert.strictEqual(await isExistingPath(testFilePath), false);
	});

	it('createFileOfSize', async () => {
		const dummyFilePath = `${TARGET_PATH}/__TEST__TOUCH_FILE.txt`;

		await createFileOfSize(dummyFilePath, 100);

		const dummyFileStat = await getFileInfo(dummyFilePath);

		await deletePath(dummyFilePath);

		if (dummyFileStat.size !== 100) {
			assert.fail('Test Failed. Dummy file not created correctly.');
		}
	});

	it('moveFile', async () => {
		await moveFile(`${TARGET_PATH}/MV_TEST.txt`, `${TARGET_PATH}/MV_TEST_1.txt`);
		await moveFile(`${TARGET_PATH}/MV_TEST_1.txt`, `${TARGET_PATH}/MV_TEST.txt`);
	});

	it('emptyDirectory', async () => {
		await emptyDirectory(`${TARGET_PATH}/EMPTY`);
	});
});

/**
 * Edge cases that the base suite does not cover: line-ending handling, empty
 * and blank-line-only files, symlinks, Unicode / space-bearing file names,
 * missing-path error behavior and the exact shape of `getFileInfo`.
 *
 * Fixtures are built at runtime in a temp directory rather than committed to
 * `_resources`, so the CRLF fixture cannot be rewritten by git's end-of-line
 * normalization on checkout (which would silently make the CRLF test vacuous).
 */
describe('File (edge cases)', () => {
	const UNICODE_FILE_NAME = '한글 파일 (1).txt';
	const EMPTY_MD5 = 'd41d8cd98f00b204e9800998ecf8427e';

	let tempDir: string;
	// Windows requires a privilege to create symlinks, so track whether the
	// fixtures could be created and skip the symlink assertions otherwise.
	let symlinksSupported = false;
	const p = (...parts: string[]): string => join(tempDir, ...parts);

	before(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'qsu-file-'));

		writeFileSync(p('empty.txt'), '');
		writeFileSync(p('crlf.txt'), 'line1\r\nline2\r\nline3\r\n');
		writeFileSync(p('no-trailing-newline.txt'), 'a\nb');
		writeFileSync(p('blank-lines.txt'), '\n\n\n');
		writeFileSync(p(UNICODE_FILE_NAME), 'hi');

		try {
			symlinkSync(p('ghost.txt'), p('broken.link'));
			symlinkSync(p('empty.txt'), p('good.link'));
			symlinksSupported = true;
		} catch {
			// No privilege to create symlinks (typical on Windows) — skip below.
		}
	});

	after(() => {
		// On Windows a just-closed file handle can linger briefly, so a plain
		// recursive remove may hit EBUSY/EPERM. Retry, and never let a failed
		// cleanup of a temp directory fail the run.
		try {
			rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
		} catch {
			// The OS reclaims the temp directory eventually.
		}
	});

	it('getFileName - additional path shapes', () => {
		// Only the last extension is stripped.
		assert.strictEqual(getFileName('a/b/c.tar.gz'), 'c.tar');
		assert.strictEqual(getFileName('a/b/c.tar.gz', true), 'c.tar.gz');
		assert.strictEqual(getFileName('a.b.c.d.e'), 'a.b.c.d');
		// A leading dot is part of the name, not an extension.
		assert.strictEqual(getFileName('.gitignore'), '.gitignore');
		assert.strictEqual(getFileName('x/.env.local'), '.env');
		assert.strictEqual(getFileName('x/.env.local', true), '.env.local');
		// Dots in a *directory* segment must not be mistaken for an extension.
		assert.strictEqual(getFileName('dir.with.dot/file'), 'file');
		// A path containing '/' takes the POSIX branch even with a drive letter.
		assert.strictEqual(getFileName('C:/mixed\\sep/file.txt'), 'file');
		assert.strictEqual(getFileName('file with spaces.txt'), 'file with spaces');
		assert.strictEqual(getFileName('  padded .txt'), '  padded ');
		assert.strictEqual(getFileName('a/b/c.TXT'), 'c');
		assert.strictEqual(getFileName('/single'), 'single');
		assert.strictEqual(getFileName('/a/b/파일.txt'), '파일');
		assert.strictEqual(getFileName('/a/b/파일.txt', true), '파일.txt');
		assert.strictEqual(getFileName('emoji🎉.txt'), 'emoji🎉');
	});

	it('getFileExtension - additional path shapes', () => {
		assert.strictEqual(getFileExtension('archive.tar.gz'), 'gz');
		assert.strictEqual(getFileExtension('a.b.c.d.e'), 'e');
		assert.strictEqual(getFileExtension('x/.env.local'), 'local');
		// A dotfile with no second dot has no extension.
		assert.strictEqual(getFileExtension('no_ext/.hidden'), null);
		// A trailing dot is not an extension.
		assert.strictEqual(getFileExtension('/a/b/c.'), null);
		// Extensions are always lower-cased.
		assert.strictEqual(getFileExtension('UPPER.PNG'), 'png');
		assert.strictEqual(getFileExtension('a b.c d.TXT'), 'txt');
		// Dots in a Windows directory segment are not an extension.
		assert.strictEqual(getFileExtension('C:\\a.b\\c'), null);
		assert.strictEqual(getFileExtension('file.a'), 'a');
		assert.strictEqual(getFileExtension('x.123'), '123');
		assert.strictEqual(getFileExtension('파일.한글'), '한글');
	});

	it('getFilePathDepth - additional path shapes', () => {
		assert.strictEqual(getFilePathDepth('/a/b'), 3);
		assert.strictEqual(getFilePathDepth('/a/b/c/d/e'), 6);
		// A relative path has no leading empty segment, so it counts one lower.
		assert.strictEqual(getFilePathDepth('a'), 1);
		assert.strictEqual(getFilePathDepth('.'), 1);
		assert.strictEqual(getFilePathDepth('./a/b'), 3);
		// A trailing backslash is stripped before counting.
		assert.strictEqual(getFilePathDepth('C:\\Windows\\System32\\'), 3);
		// A UNC prefix collapses to a single separator.
		assert.strictEqual(getFilePathDepth('\\\\server\\share'), 3);
	});

	it('toPosixFilePath - additional path shapes', () => {
		assert.strictEqual(toPosixFilePath(''), '');
		assert.strictEqual(toPosixFilePath('\\'), '/');
		assert.strictEqual(toPosixFilePath('/already/posix'), '/already/posix');
		assert.strictEqual(toPosixFilePath('mixed/win\\path'), 'mixed/win/path');
		// Runs of separators collapse to one.
		assert.strictEqual(toPosixFilePath('C:\\a\\\\\\b'), 'C:/a/b');
		assert.strictEqual(toPosixFilePath('C:\\파일\\한글.txt'), 'C:/파일/한글.txt');
	});

	it('isValidFileName - reserved characters and edge names', () => {
		// Characters Windows reserves.
		assert.strictEqual(isValidFileName('file<name>'), false);
		assert.strictEqual(isValidFileName('file|name'), false);
		assert.strictEqual(isValidFileName('file?name'), false);
		assert.strictEqual(isValidFileName('file"name'), false);
		assert.strictEqual(isValidFileName('file*'), false);
		// Dot-only names are never valid.
		assert.strictEqual(isValidFileName('.'), false);
		assert.strictEqual(isValidFileName('..'), false);
		assert.strictEqual(isValidFileName('...'), false);
		// A leading space is accepted (only all-whitespace is rejected).
		assert.strictEqual(isValidFileName(' leading'), true);
		// Windows strips a trailing space or dot instead of reporting an error,
		// so the name that ends up on disk is not the one that was asked for.
		assert.strictEqual(isValidFileName('trailing '), false);
		assert.strictEqual(isValidFileName('trailing.'), false);
		// Unix keeps them, so they stay valid there.
		assert.strictEqual(isValidFileName('trailing ', false), true);
		assert.strictEqual(isValidFileName('trailing.', false), true);
		assert.strictEqual(isValidFileName('한글파일.txt'), true);
		assert.strictEqual(isValidFileName('한글파일.txt', false), true);
		// Unix only rejects ':' and '/', so Windows-reserved chars pass.
		assert.strictEqual(isValidFileName('a:b', false), false);
		assert.strictEqual(isValidFileName('a|b', false), true);
		assert.strictEqual(isValidFileName('a<b>c', false), true);
		// `isWindows` defaults to `true`, so passing it applies the same Windows rules.
		assert.strictEqual(isValidFileName('a|b', true), false);
		assert.strictEqual(isValidFileName('a|b'), false);
		// Windows device names stay reserved even with an extension appended,
		// but they are only reserved on Windows.
		assert.strictEqual(isValidFileName('nul.txt'), false);
		assert.strictEqual(isValidFileName('CON'), false);
		assert.strictEqual(isValidFileName('com1'), false);
		assert.strictEqual(isValidFileName('LPT9'), false);
		assert.strictEqual(isValidFileName('nul.txt', false), true);
		// Near-misses are still valid names.
		assert.strictEqual(isValidFileName('COM0'), true);
		assert.strictEqual(isValidFileName('CONSOLE'), true);
	});

	it('getCopyFileName - additional collision shapes', () => {
		assert.strictEqual(getCopyFileName('a.txt', []), 'a.txt');
		// Only an exact match collides, so a pre-existing "(1)" is irrelevant.
		assert.strictEqual(getCopyFileName('a.txt', ['a (1).txt']), 'a.txt');
		// The first free index wins, gaps included.
		assert.strictEqual(getCopyFileName('a.txt', ['a.txt', 'a (1).txt', 'a (3).txt']), 'a (2).txt');
		assert.strictEqual(getCopyFileName('a', ['a', 'a (1)', 'a (2)']), 'a (3)');
		assert.strictEqual(getCopyFileName('한글.txt', ['한글.txt']), '한글 (1).txt');
		// The original extension casing is preserved.
		assert.strictEqual(getCopyFileName('a.TXT', ['a.TXT']), 'a (1).TXT');
		assert.strictEqual(getCopyFileName('Report.PDF', ['Report.PDF']), 'Report (1).PDF');
		assert.strictEqual(getCopyFileName('a.tar.GZ', ['a.tar.GZ']), 'a.tar (1).GZ');
	});

	it('normalizeFilePath - redundant separators', () => {
		assert.strictEqual(normalizeFilePath('/a/b/c'), '/a/b/c');
		assert.strictEqual(normalizeFilePath('a/b/c'), '/a/b/c');
		assert.strictEqual(normalizeFilePath('/a//b///c'), '/a/b/c');
		assert.strictEqual(normalizeFilePath('/a/b/c/'), '/a/b/c');
		assert.strictEqual(normalizeFilePath('/한글/파일'), '/한글/파일');
	});

	it('normalizeFilePathUnicode - compatibility forms', () => {
		// NFKC/NFKD fold compatibility characters; NFC/NFD do not.
		assert.strictEqual(normalizeFilePathUnicode('ﬁle', 'NFKC'), 'file');
		assert.strictEqual(normalizeFilePathUnicode('①', 'NFKC'), '1');
		assert.strictEqual(normalizeFilePathUnicode('ＡＢ', 'NFKD'), 'AB');
		// Composed Hangul is one code unit, decomposed is two.
		assert.strictEqual(normalizeFilePathUnicode('가', 'NFD').length, 2);
		assert.strictEqual(normalizeFilePathUnicode('가', 'NFC').length, 1);
		// The default form is NFC.
		assert.strictEqual(normalizeFilePathUnicode('가'), normalizeFilePathUnicode('가', 'NFC'));
		// Normalization is idempotent and leaves pure ASCII untouched.
		assert.strictEqual(
			normalizeFilePathUnicode(normalizeFilePathUnicode('가', 'NFD'), 'NFD'),
			normalizeFilePathUnicode('가', 'NFD')
		);
		assert.strictEqual(normalizeFilePathUnicode('/a/b/c.txt', 'NFD'), '/a/b/c.txt');
		assert.strictEqual(normalizeFilePathUnicode(''), '');
	});

	it('isFileHidden - additional path shapes', async () => {
		assert.strictEqual(await isFileHidden(''), false);
		assert.strictEqual(await isFileHidden('/'), false);
		assert.strictEqual(await isFileHidden('/a/b/.hidden.txt'), true);
		// Only the final segment decides.
		assert.strictEqual(await isFileHidden('/a/.git/config'), false);
		assert.strictEqual(await isFileHidden('.a/b'), false);
		// '.' and '..' are not hidden entries.
		assert.strictEqual(await isFileHidden('/a/b/.'), false);
		assert.strictEqual(await isFileHidden('..'), false);
		// A backslash path is not split, so it is never seen as hidden.
		assert.strictEqual(await isFileHidden('C:\\a\\.hidden'), false);
	});

	it('headFile / tailFile - empty file', async () => {
		assert.strictEqual(await headFile(p('empty.txt')), null);
		assert.strictEqual(await tailFile(p('empty.txt')), null);
		assert.strictEqual(await headFile(p('empty.txt'), 10), null);
		assert.strictEqual(await tailFile(p('empty.txt'), 10), null);
	});

	it('headFile / tailFile - CRLF line endings', async () => {
		// '\r' must be consumed as part of the line break, not kept in the text.
		assert.strictEqual(await headFile(p('crlf.txt')), 'line1');
		assert.strictEqual(await headFile(p('crlf.txt'), 2), 'line1\nline2');
		assert.strictEqual(await tailFile(p('crlf.txt')), 'line3');
		assert.strictEqual(await tailFile(p('crlf.txt'), 2), 'line2\nline3');
		assert.strictEqual(await headFile(p('crlf.txt'), 3), 'line1\nline2\nline3');
	});

	it('headFile / tailFile - file without a trailing newline', async () => {
		assert.strictEqual(await headFile(p('no-trailing-newline.txt')), 'a');
		assert.strictEqual(await tailFile(p('no-trailing-newline.txt')), 'b');
		// Asking beyond EOF returns everything rather than padding.
		assert.strictEqual(await headFile(p('no-trailing-newline.txt'), 5), 'a\nb');
		assert.strictEqual(await tailFile(p('no-trailing-newline.txt'), 5), 'a\nb');
	});

	it('headFile / tailFile - blank-line-only file', async () => {
		assert.strictEqual(await headFile(p('blank-lines.txt'), 3), '\n\n');
		// tailFile drops one trailing empty line by design.
		assert.strictEqual(await tailFile(p('blank-lines.txt'), 3), '\n');
		assert.strictEqual(await tailFile(p('blank-lines.txt'), 1), null);
	});

	it('headFile / tailFile - non-positive lineCount', async () => {
		assert.strictEqual(await headFile(p('crlf.txt'), 0), null);
		assert.strictEqual(await tailFile(p('crlf.txt'), 0), null);
		assert.strictEqual(await headFile(p('crlf.txt'), -1), null);
		assert.strictEqual(await tailFile(p('crlf.txt'), -1), null);
	});

	it('missing paths reject instead of returning a fallback', async () => {
		const missing = p('does-not-exist.txt');

		await assert.rejects(() => headFile(missing));
		await assert.rejects(() => tailFile(missing));
		await assert.rejects(() => getFileSize(missing));
		await assert.rejects(() => getFileInfo(missing));
		await assert.rejects(() => getFileHashFromPath(missing));
		await assert.rejects(() => moveFile(missing, p('target.txt')));
	});

	it('getFileSize / getFileHashFromPath - empty file', async () => {
		assert.strictEqual(await getFileSize(p('empty.txt')), 0);
		assert.strictEqual(await getFileHashFromPath(p('empty.txt')), EMPTY_MD5);
	});

	it('getFileHashFromPath and getFileHashFromStream agree', async () => {
		const target = p('crlf.txt');

		for (const algorithm of ['md5', 'sha1', 'sha256', 'sha512'] as const) {
			assert.strictEqual(
				await getFileHashFromPath(target, algorithm),
				await getFileHashFromStream(createReadStream(target), algorithm)
			);
		}
	});

	it('isExistingPath - symlinks are followed', async (t) => {
		if (!symlinksSupported) {
			t.skip('symlinks are not supported on this platform');
			return;
		}

		// A symlink to an existing file resolves; a dangling one does not.
		assert.strictEqual(await isExistingPath(p('good.link')), true);
		assert.strictEqual(await isExistingPath(p('broken.link')), false);
	});

	it('handles Unicode and space-bearing file names', async () => {
		assert.strictEqual(await isExistingPath(p(UNICODE_FILE_NAME)), true);
		assert.strictEqual(getFileName(UNICODE_FILE_NAME), '한글 파일 (1)');
		assert.strictEqual(getFileExtension(UNICODE_FILE_NAME), 'txt');
		assert.strictEqual(await getFileSize(p(UNICODE_FILE_NAME)), 2);
	});

	it('deletePath - missing path is a no-op', async () => {
		await deletePath(p('does-not-exist.txt'));
		await deletePath('');
	});

	it('emptyDirectory - clears nested entries but keeps the root', async () => {
		const root = p('nest');

		mkdirSync(join(root, 'sub'), { recursive: true });
		writeFileSync(join(root, 'top.txt'), 'top');
		writeFileSync(join(root, 'sub', 'inner.txt'), 'inner');

		await emptyDirectory(root);

		// Subdirectories are removed too, not just plain files.
		assert.strictEqual(await isExistingPath(root), true);
		assert.strictEqual(await isExistingPath(join(root, 'top.txt')), false);
		assert.strictEqual(await isExistingPath(join(root, 'sub')), false);
	});

	it('emptyDirectory - missing directory is a no-op', async () => {
		await emptyDirectory(p('no-such-directory'));
	});

	it('createFileOfSize - produces the exact requested size', async () => {
		for (const size of [1, 512, 4096]) {
			const target = p(`dummy-${size}.bin`);

			assert.strictEqual(await createFileOfSize(target, size), true);
			assert.strictEqual(await getFileSize(target), size);

			await deletePath(target);
		}
	});

	it('createFileOfSize - rejects a negative size', async () => {
		await assert.rejects(() => createFileOfSize(p('negative.bin'), -5));
	});

	it('getFileInfo - field level assertions', async () => {
		const fileInfo = await getFileInfo(p('crlf.txt'));

		assert.strictEqual(fileInfo.success, true);
		assert.strictEqual(fileInfo.isDirectory, false);
		assert.strictEqual(fileInfo.name, 'crlf');
		assert.strictEqual(fileInfo.ext, 'txt');
		assert.strictEqual(fileInfo.size, 21);
		assert.strictEqual(fileInfo.sizeHumanized, '21 Bytes');
		// `path` is always absolute even when a relative path is passed in.
		// Compare through `resolve` so platform-specific normalization (drive
		// letter casing, separators) does not make the assertion brittle.
		assert.strictEqual(fileInfo.path, resolve(p('crlf.txt')));
		assert.ok(fileInfo.changed > 0);
		assert.ok(fileInfo.modified > 0);

		const directoryInfo = await getFileInfo(tempDir);

		assert.strictEqual(directoryInfo.success, true);
		assert.strictEqual(directoryInfo.isDirectory, true);
		// A directory without a dot in its name has no extension.
		assert.strictEqual(directoryInfo.ext, null);
	});

	it('getFileInfo - resolves a relative path to an absolute one', async () => {
		const fileInfo = await getFileInfo(`${TARGET_PATH}/STATIC_FILE.txt`);

		assert.strictEqual(fileInfo.name, 'STATIC_FILE');
		assert.strictEqual(fileInfo.ext, 'txt');
		assert.ok(fileInfo.path.endsWith('STATIC_FILE.txt'));
		assert.notStrictEqual(fileInfo.path, `${TARGET_PATH}/STATIC_FILE.txt`);
	});

	it('createDirectory - nested creation and idempotence', async () => {
		const nested = p('a', 'b', 'c');

		await createDirectory(nested);
		assert.strictEqual(await isExistingPath(nested), true);

		// Re-creating an existing directory is a silent no-op.
		await createDirectory(nested);
		assert.strictEqual(await isExistingPath(nested), true);

		await deletePath(p('a'));
		assert.strictEqual(await isExistingPath(nested), false);
	});

	it('getParentFilePath - relative, empty and trailing-separator paths', () => {
		// A relative path keeps its parent segment instead of collapsing to root.
		assert.strictEqual(getParentFilePath('relative/path'), '/relative');
		assert.strictEqual(getParentFilePath('a/b/c'), '/a/b');
		// A single segment (and an empty path) has the root as its parent.
		assert.strictEqual(getParentFilePath('a'), '/');
		assert.strictEqual(getParentFilePath(''), '/');
		// Trailing separators are ignored, as in POSIX dirname(1).
		assert.strictEqual(getParentFilePath('/home/user/'), '/home');
		assert.strictEqual(getParentFilePath('/a/b/c/'), '/a/b');
		assert.strictEqual(getParentFilePath('/a//b'), '/a');
	});

	it('getParentFilePath - Windows relative and UNC paths', () => {
		assert.strictEqual(getParentFilePath('relative\\path', true), '\\relative');
		assert.strictEqual(getParentFilePath('a', true), '\\');
		assert.strictEqual(getParentFilePath('', true), '\\');
		assert.strictEqual(getParentFilePath('C:\\Users\\', true), 'C:\\');
		// The '\\\\' UNC prefix survives.
		assert.strictEqual(getParentFilePath('\\\\net\\share\\file.txt', true), '\\\\net\\share');
	});

	it('normalizeFilePath - resolves . and .. segments', () => {
		assert.strictEqual(normalizeFilePath('/home/user/../test'), '/home/test');
		assert.strictEqual(normalizeFilePath('/a/./b'), '/a/b');
		// A path that collapses to nothing resolves to the root.
		assert.strictEqual(normalizeFilePath('.'), '/');
		assert.strictEqual(normalizeFilePath('C:\\a\\..\\b', true), 'C:\\b');
		assert.strictEqual(normalizeFilePath('C:\\Windows\\..\\text.txt', true), 'C:\\text.txt');
		assert.strictEqual(normalizeFilePath('.', true), '\\');
	});

	it('getFilePathDepth - a trailing separator does not add a level', () => {
		assert.strictEqual(getFilePathDepth('/home/user/'), getFilePathDepth('/home/user'));
		assert.strictEqual(getFilePathDepth('/a/b//'), getFilePathDepth('/a/b'));
		assert.strictEqual(getFilePathDepth('C:\\Windows\\'), getFilePathDepth('C:\\Windows'));
		assert.strictEqual(getFilePathDepth('//'), 1);
	});

	it('createFileOfSize - a size of 0 creates an empty file', async () => {
		const target = p('zero.bin');

		assert.strictEqual(await createFileOfSize(target, 0), true);
		assert.strictEqual(await isExistingPath(target), true);
		assert.strictEqual(await getFileSize(target), 0);

		await deletePath(target);
	});

	it('createDirectory - a non-recursive nested creation rejects', async () => {
		await assert.rejects(() => createDirectory(p('missing-parent/child'), false));
		assert.strictEqual(await isExistingPath(p('missing-parent/child')), false);
	});

	it('moveFile - renames within the same directory', async () => {
		const source = p('move-source.txt');
		const target = p('move-target.txt');

		writeFileSync(source, 'payload');
		await moveFile(source, target);

		assert.strictEqual(await isExistingPath(source), false);
		assert.strictEqual(await isExistingPath(target), true);
		assert.strictEqual(await getFileSize(target), 7);

		await deletePath(target);
	});
});

// ---------------------------------------------------------------------------
// Covers what the filesystem actually does to these functions rather than what
// a path string looks like: names carrying characters no filesystem accepts,
// text that is not valid UTF-8, entries that are symlinks, and the cost of
// reading the end of a file that does not fit in memory.
//
// The timing assertions are deliberately loose. They separate "reads what it
// was asked for" from "reads the whole file", which is a difference of three
// orders of magnitude, not a measurement of the machine.
// ---------------------------------------------------------------------------

describe('File (hardening)', () => {
	// Enough lines that the previous tailFile, which walked the file from the
	// start and shifted a `length`-sized array once per line, needed minutes for
	// the window asked for below.
	const BIG_FILE_LINES = 500000;
	const BIG_WINDOW = 100000;
	const BUDGET_MS = 10000;
	const NUL = String.fromCharCode(0);

	let tempDir: string;
	let symlinksSupported = false;
	const p = (...parts: string[]): string => join(tempDir, ...parts);

	before(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'qsu-hard-'));

		const lines: string[] = [];

		for (let i = 0; i < BIG_FILE_LINES; i++) {
			lines.push(`line ${i}`);
		}

		writeFileSync(p('big.log'), `${lines.join('\n')}\n`);

		// 0xff and 0xfe cannot open a UTF-8 sequence, and the NUL after them is
		// valid text that has to survive.
		writeFileSync(
			p('malformed.bin'),
			Buffer.from([0xff, 0xfe, 0x00, 97, 98, 99, 10, 100, 101, 102, 10])
		);
		writeFileSync(p('lone-cr.txt'), 'one\rtwo\rthree\r');
		writeFileSync(p('bom.txt'), '﻿first\nsecond\n');
		writeFileSync(p('two-lines.txt'), 'a\nb\n');

		mkdirSync(p('keep'));
		writeFileSync(p('keep', 'precious.txt'), 'do not delete me');

		try {
			mkdirSync(p('linked'));
			symlinkSync(p('keep'), p('linked', 'shortcut'), 'dir');
			symlinksSupported = true;
		} catch {
			// No privilege to create symlinks (typical on Windows).
		}
	});

	after(() => {
		try {
			rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
		} catch {
			// The OS reclaims the temp directory eventually.
		}
	});

	it('isValidFileName - an empty name, control characters and the byte limit', () => {
		// A name of nothing cannot be created.
		assert.strictEqual(isValidFileName(''), false);
		assert.strictEqual(isValidFileName('', false), false);

		// NUL terminates the path in the system call underneath, so a name
		// carrying one is truncated rather than rejected by the filesystem.
		assert.strictEqual(isValidFileName(`fi${NUL}le.txt`), false);
		assert.strictEqual(isValidFileName(`fi${NUL}le.txt`, false), false);
		assert.strictEqual(isValidFileName(`tab${String.fromCharCode(9)}.txt`), false);
		assert.strictEqual(isValidFileName(`del${String.fromCharCode(127)}.txt`), false);

		// The limit is 255 *bytes*, which is what the filesystem enforces.
		assert.strictEqual(isValidFileName('a'.repeat(255)), true);
		assert.strictEqual(isValidFileName('a'.repeat(256)), false);
		// '가' is three bytes: 85 of them fit, 86 do not.
		assert.strictEqual(isValidFileName('가'.repeat(85)), true);
		assert.strictEqual(isValidFileName('가'.repeat(86)), false);
		// Counting UTF-16 units instead would make this 240-byte name too long,
		// and would disagree with the Python implementation.
		assert.strictEqual(isValidFileName('😀'.repeat(60)), true);
	});

	it('isFileHidden - a name shaped like a shell command is not run', async () => {
		const marker = p('injection-proof.txt');
		// A quote closes the quoting of `attrib "<path>"`, and '&' separates
		// commands in both sh and cmd. Running the command line through a shell
		// created the marker; running `attrib` directly cannot.
		const shaped = `a" & echo qsu > ${marker} & echo "b`;

		assert.strictEqual(await isFileHidden(shaped, true), false);

		// A shell would have backgrounded the write, so give it a moment.
		await new Promise((resolve) => setTimeout(resolve, 200));
		assert.strictEqual(await isExistingPath(marker), false);
	});

	it('createDirectory - reports a file already sitting at the path', async () => {
		const target = p('in-the-way.txt');

		writeFileSync(target, 'x');

		// Answering "already there, nothing to do" hid the fact that nothing
		// usable as a directory had been created.
		await assert.rejects(() => createDirectory(target));
		await assert.rejects(() => createDirectory(target, false));
	});

	it('touchFile - creates the parent directories it needs', async () => {
		const target = p('created', 'deep', 'nested', 'note.txt');

		await touchFile(target);

		assert.strictEqual(await isExistingPath(target), true);
		assert.strictEqual(await getFileSize(target), 0);
	});

	it('touchFile, deletePath and moveFile - a whitespace-only path does nothing', async () => {
		await touchFile('   ');
		assert.strictEqual(await isExistingPath('   '), false);

		const witness = p('witness.txt');

		writeFileSync(witness, 'still here');
		await deletePath('   ');
		await moveFile('   ', witness);
		await moveFile(witness, '  ');

		assert.strictEqual(await isExistingPath(witness), true);
	});

	it('headFile / tailFile - malformed UTF-8 is replaced, not thrown on', async () => {
		const head = await headFile(p('malformed.bin'));

		// Two bytes that cannot open a sequence become two replacement
		// characters; the NUL after them is text and stays.
		assert.deepStrictEqual(
			[...(head as string)].map((c) => c.codePointAt(0)),
			[65533, 65533, 0, 97, 98, 99]
		);
		assert.strictEqual(await tailFile(p('malformed.bin'), 1), 'def');
	});

	it('headFile / tailFile - a lone carriage return breaks a line', async () => {
		assert.strictEqual(await headFile(p('lone-cr.txt'), 3), 'one\ntwo\nthree');
		assert.strictEqual(await tailFile(p('lone-cr.txt'), 1), 'three');
		assert.strictEqual(await tailFile(p('lone-cr.txt'), 2), 'two\nthree');
	});

	it('headFile / tailFile - a byte order mark stays in the first line', async () => {
		assert.strictEqual(await headFile(p('bom.txt'), 1), '﻿first');
		assert.strictEqual(await tailFile(p('bom.txt'), 2), '﻿first\nsecond');
	});

	it('headFile / tailFile - a length beyond the file returns every line', async () => {
		assert.strictEqual(await headFile(p('two-lines.txt'), 99), 'a\nb');
		assert.strictEqual(await tailFile(p('two-lines.txt'), 99), 'a\nb');
	});

	it('tailFile - a large window costs no more than the lines it returns', async () => {
		const started = Date.now();
		const result = await tailFile(p('big.log'), BIG_WINDOW);
		const elapsed = Date.now() - started;

		assert.strictEqual(result?.split('\n').length, BIG_WINDOW);
		assert.strictEqual(result?.endsWith(`line ${BIG_FILE_LINES - 1}`), true);
		assert.strictEqual(result?.startsWith(`line ${BIG_FILE_LINES - BIG_WINDOW}\n`), true);
		assert.ok(elapsed < BUDGET_MS, `tailFile(${BIG_WINDOW}) took ${elapsed}ms`);
	});

	it('headFile - the cost does not follow the size of the file', async () => {
		const started = Date.now();

		assert.strictEqual(await headFile(p('big.log'), 1), 'line 0');
		assert.ok(
			Date.now() - started < BUDGET_MS,
			'headFile read more than the line it was asked for'
		);
	});

	it('getCopyFileName - takes a Set, and reusing one stays linear', () => {
		const existing = new Set(['a.txt', 'a (1).txt']);

		assert.strictEqual(getCopyFileName('a.txt', existing), 'a (2).txt');
		assert.strictEqual(getCopyFileName('b.txt', existing), 'b.txt');
		// A Set handed in is read, not copied, so one can be kept across a whole
		// loop. Rebuilding it per call made naming n files quadratic.
		const names = new Set<string>();

		for (let i = 0; i < 20000; i++) {
			names.add(`file${i}.txt`);
		}

		const started = Date.now();

		for (let i = 0; i < 20000; i++) {
			names.add(getCopyFileName(`file${i}.txt`, names));
		}

		assert.strictEqual(names.size, 40000);
		assert.ok(Date.now() - started < BUDGET_MS, 'naming 20,000 files did not stay linear');
	});

	it('moveFile - moves a directory, not only a file', async () => {
		const source = p('move-dir-source');
		const target = p('move-dir-target');

		mkdirSync(join(source, 'inner'), { recursive: true });
		writeFileSync(join(source, 'inner', 'leaf.txt'), 'payload');

		await moveFile(source, target);

		assert.strictEqual(await isExistingPath(source), false);
		assert.strictEqual(await isExistingPath(join(target, 'inner', 'leaf.txt')), true);
	});

	it('getFileSize / getFileInfo - the filesystem error keeps its code', async () => {
		const missing = p('does-not-exist.txt');
		const isEnoent = (err: NodeJS.ErrnoException): boolean =>
			err.code === 'ENOENT' && err.path === missing;

		// Re-throwing `new Error(err.message)` dropped `code`, `errno` and
		// `path`, leaving a caller unable to tell "missing" from "no access".
		await assert.rejects(() => getFileSize(missing), isEnoent);
		await assert.rejects(() => getFileInfo(missing), isEnoent);
	});

	it('normalizeFilePath - a leading .. cannot climb above the root', () => {
		assert.strictEqual(normalizeFilePath('../../etc/passwd'), '/etc/passwd');
		assert.strictEqual(normalizeFilePath('../a/../b'), '/b');
		assert.strictEqual(normalizeFilePath('..\\..\\Users', true), '\\Users');
	});

	it('emptyDirectory - unlinks a symlink and keeps its target', async (t) => {
		if (!symlinksSupported) {
			t.skip('symlinks are not supported on this platform');
			return;
		}

		await emptyDirectory(p('linked'));

		assert.strictEqual(await isExistingPath(p('linked', 'shortcut')), false);
		assert.strictEqual(await isExistingPath(p('keep', 'precious.txt')), true);
	});
});
