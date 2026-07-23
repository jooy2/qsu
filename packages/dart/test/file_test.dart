import 'dart:io';

import 'package:qsu/qsu.dart';
import 'package:test/test.dart';
import 'package:unorm_dart/unorm_dart.dart';

const longFilePath =
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\115.0.1901.203\\Trust Protection Lists';
const testTargetPath = 'test/_resources/files';
const testFilePath = '$testTargetPath/__TEST_TOUCH_FILE.txt';

void main() {
  group('File', () {
    test('createDirectory', () async {
      await createDirectory('$testTargetPath/abc');
      await createDirectory('$testTargetPath/abc/def');
      expect(await isFileExists('$testTargetPath/abc/def'), true);
      await deleteFile('$testTargetPath/abc');
    });

    test('createFile', () async {
      await createFile(testFilePath);
      expect(await isFileExists(testFilePath), true);
    });

    test('deleteFile', () async {
      await deleteFile(testFilePath);
      expect(await isFileExists(testFilePath), false);
    });

    test('dummyFilePath', () async {
      const dummyFilePath = '$testTargetPath/__TEST__TOUCH_FILE.txt';

      await createFileWithDummy(dummyFilePath, size: 100);

      final dummyFileStat = await getFileInfo(dummyFilePath);

      await deleteFile(dummyFilePath);

      if (dummyFileStat.size != 100) {
        fail('Test Failed. Dummy file not created correctly.');
      }
    });

    test('deleteAllFileFromDirectory', () async {
      await deleteAllFileFromDirectory('$testTargetPath/EMPTY');
    });

    test('getFileInfo', () async {
      final FileInfo fileInfo1 =
          await getFileInfo('$testTargetPath/STATIC_FILE.txt');
      final FileInfo fileInfo2 = await getFileInfo('test');

      expect(fileInfo1.size, Platform.isWindows ? 33 : 32);
      expect(fileInfo1.name, 'STATIC_FILE');
      expect(fileInfo1.ext, 'txt');
      expect(fileInfo1.isDirectory, false);
      expect(fileInfo2.name, 'test');
      expect(fileInfo2.isDirectory, true);
    });

    test('getFileName', () {
      expect(getFileName('C:\\Users\\test\\Desktop\\'), 'Desktop');
      expect(getFileName('C:\\Users\\test\\Desktop'), 'Desktop');
      expect(getFileName('C:\\Users\\test\\Desktop\\text'), 'text');
      expect(getFileName('C:\\Users\\test\\Desktop\\text.txt'), 'text');
      expect(getFileName('C:\\Users\\test\\Desktop\\a.b.c.txt'), 'a.b.c');
      expect(getFileName('/home/user/Desktop/example.txt'), 'example');
      expect(getFileName('/home/user/Desktop/example'), 'example');
      expect(getFileName('/home/user/Desktop/example/'), 'example');
      expect(getFileName('/home/user/Desktop/example.a/'), 'example.a');
      expect(
          getFileName('C:\\example.txt', withExtension: true), 'example.txt');
    });

    test('getCopyFileName', () {
      final List<String> fileNameList = [
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
        'ddd.aaa.aaa (1).txt',
      ];

      expect(getCopyFileName('abc', fileNameList), equals('abc'));
      expect(getCopyFileName('abc.txt', fileNameList), equals('abc.txt'));
      expect(getCopyFileName('123', fileNameList), equals('123 (1)'));
      expect(getCopyFileName('456 (1)', fileNameList), equals('456 (1) (1)'));
      expect(getCopyFileName('aaa.txt', fileNameList), equals('aaa (1).txt'));
      expect(
          getCopyFileName('aaa (1).txt', fileNameList), equals('aaa (1).txt'));
      expect(getCopyFileName('bbb.txt', fileNameList), equals('bbb (2).txt'));
      expect(getCopyFileName('bbb (1).txt', fileNameList),
          equals('bbb (1) (1).txt'));
      expect(getCopyFileName('ccc.txt', fileNameList), equals('ccc (5).txt'));
      expect(getCopyFileName('ddd.aaa.txt', fileNameList),
          equals('ddd.aaa (1).txt'));
      expect(
        getCopyFileName('ddd.aaa.aaa (1).txt', fileNameList),
        equals('ddd.aaa.aaa (1) (1).txt'),
      );
    });

    test('getFileExtension', () {
      expect(getFileExtension('test.123/sample.txt'), 'txt');
      expect(getFileExtension('test.123/sample'), null);
      expect(getFileExtension('test/sample.txt'), 'txt');
      expect(getFileExtension('test/hello.1/sample.txt'), 'txt');
      expect(getFileExtension('test/sample'), null);
      expect(getFileExtension('test.txt.sample'), 'sample');
      expect(getFileExtension('test'), null);
      expect(getFileExtension('TEST.FILE.TXT'), 'txt');
      expect(getFileExtension('test..txt..png'), 'png');
      expect(getFileExtension('txt'), null);
      expect(getFileExtension('txt.png'), 'png');
      expect(getFileExtension('/home/txt.txt'), 'txt');
      expect(getFileExtension('/home/txt.abc.png'), 'png');
      expect(getFileExtension('C:\\test\\txt.png'), 'png');
      expect(getFileExtension('C:\\test.hello.sample\\txt'), null);
      expect(getFileExtension('C:\\test.hello.sample\\txt.txt'), 'txt');
    });

    test('getParentFilePath', () {
      expect(getParentFilePath('/home/user/test.txt'), '/home/user');
      expect(getParentFilePath('/home'), '/');
      expect(getParentFilePath('/'), '/');
      expect(getParentFilePath('C:\\', isWindows: true), 'C:\\');
      expect(getParentFilePath('C:\\Users', isWindows: true), 'C:\\');
      expect(getParentFilePath('C:\\Users\\my', isWindows: true), 'C:\\Users');
    });

    test('isFileExists', () async {
      expect(await isFileExists('$testTargetPath/hello.md'), true);
      expect(await isFileExists('$testTargetPath/not-exists'), false);
      expect(await isFileExists(testTargetPath), true);
      expect(await isFileExists('$testTargetPath/MV_TEST.txt'), true);
      expect(await isFileExists('$testTargetPath/not-exists.txt'), false);
    });

    test('isValidFileName', () {
      expect(isValidFileName('System32'), true);
      expect(isValidFileName('.example', unixType: true), true);
      // The ':' lives in the extension; the whole name is validated.
      expect(isValidFileName('hello.:txt', unixType: true), false);
      expect(isValidFileName('C:\\Windows\\System32'), true);
      expect(isValidFileName('C:\\Users\\test\\Desktop\\hello.txt'), true);
      expect(isValidFileName('C:\\Users\\test\\Desktop\\hello*'), false);
      expect(isValidFileName('C:\\Users\\test\\Desktop\\hello!@#\$%^&*()_+-:='),
          false);
      expect(isValidFileName('hello!@#\$%^&*()_+-:=', unixType: true), false);
      expect(
          isValidFileName('/home/test/Desktop/test/.example', unixType: true),
          true);
      expect(
          isValidFileName('/home/test/Desktop/test/text.txt', unixType: true),
          true);
      expect(
          isValidFileName('/home/test/Desktop/test/hi!@#\$%^&*()_+-=',
              unixType: true),
          true);
      expect(
          isValidFileName('/home/test/Desktop/test/*hi', unixType: true), true);
      expect(
          isValidFileName(
              '/home/test/Desktop/test/0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345'),
          false); // 256
      expect(
          isValidFileName(
              '/home/test/Desktop/test/012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234',
              unixType: true),
          true); // 255
    });

    final Map<String, String> hashTable = Platform.isWindows
        ? {
            'md5': '239884dde2b4354613a228001b22d9b9',
            'sha1': '38851813f75627d581c593f3ccfb7061dd013fbd',
            'sha256':
                'db42a58ad98348dc8647ef27054ffcab994a2359fe9e0daeeffe8cbfe2409583',
            'sha512':
                'c0be4b1ff1aba7be9b02d619dd10e0bdfa4149cf0f241320fe237336aea286ff68c3f42fae4d707a1a59dc6a269e730d3bc4b9891347647bb5acb82b5792a503'
          }
        : {
            'md5': '192ef428bd3e3413262df05679cee825',
            'sha1': '2accd3e31a50c5ed9c6786ef34669bbda55d7156',
            'sha256':
                '568770a759ef55df5c2a5d3cbfc5c62e2ade6a353c391037d91a97212dec9e88',
            'sha512':
                'b03187c2962c947de2d5d3cdaa2f25e5e1df31c5190cccf42d03759d042dd5f5a2773ca9903e122b6faaf4a53b45c419d605464abb83cbe578ed249cb558844a'
          };

    test('getFileHashFromPath', () async {
      final String path = '$testTargetPath/STATIC_FILE.txt';

      expect(await getFileHashFromPath(path), hashTable['md5']);
      expect(await getFileHashFromPath(path, algorithm: 'sha1'),
          hashTable['sha1']);
      expect(await getFileHashFromPath(path, algorithm: 'sha256'),
          hashTable['sha256']);
      expect(await getFileHashFromPath(path, algorithm: 'sha512'),
          hashTable['sha512']);
    });

    test('toPosixFilePath', () {
      expect(toPosixFilePath('\\\\Shared'), '/Shared');
      expect(toPosixFilePath('C:\\'), 'C:/');
      expect(toPosixFilePath('C:\\Windows\\System32'), 'C:/Windows/System32');
      expect(toPosixFilePath('Windows\\System32'), 'Windows/System32');
      expect(toPosixFilePath(longFilePath),
          'C:/Program Files (x86)/Microsoft/Edge/Application/115.0.1901.203/Trust Protection Lists');
      expect(toPosixFilePath('/home/user/Test file.txt'),
          '/home/user/Test file.txt');
    });

    test('getFileSize', () async {
      expect(await getFileSize('$testTargetPath/hello.md'),
          Platform.isWindows ? 89 : 82);
      expect(await getFileSize('$testTargetPath/MV_TEST.txt'),
          Platform.isWindows ? 14 : 13);
    });

    test('getFilePathLevel', () {
      expect(getFilePathLevel('C:'), 1);
      expect(getFilePathLevel('C:\\'), 1);
      expect(getFilePathLevel('C:\\Windows\\System32'), 3);
      expect(getFilePathLevel(longFilePath), 7);
      expect(getFilePathLevel('/'), 1);
      expect(getFilePathLevel('/home/user'), 3);
      expect(getFilePathLevel('/home/user/.ssh/test file.txt'), 5);
    });

    test('moveFile', () async {
      await moveFile(
          '$testTargetPath/MV_TEST.txt', '$testTargetPath/MV_TEST_1.txt');
      expect(await isFileExists('$testTargetPath/MV_TEST_1.txt'), true);
      await moveFile(
          '$testTargetPath/MV_TEST_1.txt', '$testTargetPath/MV_TEST.txt');
      expect(await isFileExists('$testTargetPath/MV_TEST.txt'), true);
    });

    test('joinFilePath', () {
      expect(joinFilePath(['C:\\', 'Windows', 'System32'], isWindows: true),
          'C:\\Windows\\System32');
      expect(
          joinFilePath(['C:\\', 'Windows', '..', 'System32', 'Test.txt'],
              isWindows: true),
          'C:\\System32\\Test.txt');
      expect(joinFilePath(['Users', 'test'], isWindows: true), '\\Users\\test');
      expect(joinFilePath(['C:\\Users\\test'], isWindows: true),
          'C:\\Users\\test');
      expect(joinFilePath(['/home', 'user', 'Desktop']), '/home/user/Desktop');
      expect(joinFilePath(['home', '/user', '.bashrc']), '/home/user/.bashrc');
      expect(joinFilePath(['home', '/user', '..', '.bashrc']), '/home/.bashrc');
    });

    test('normalizeFile', () {
      final String nfdStr = nfd('안녕하세요_12345-ABCDE'); // macOS
      final String nfcStr = nfc('안녕하세요_12345-ABCDE'); // Windows

      expect(normalizeFile(nfdStr, normalizationForm: 'NFC'), nfcStr);
      expect(normalizeFile(nfcStr, normalizationForm: 'NFD'), nfdStr);
    });

    test('toValidFilePath', () {
      expect(toValidFilePath('home'), '/home');
      expect(toValidFilePath('/home//test/'), '/home/test');
      expect(toValidFilePath('home/test/.conf'), '/home/test/.conf');
      expect(toValidFilePath('/'), '/');
      expect(toValidFilePath('C:\\\\Users\\test\\', isWindows: true),
          'C:\\Users\\test');
      expect(toValidFilePath('C:\\Users\\test\\.config', isWindows: true),
          'C:\\Users\\test\\.config');
      expect(toValidFilePath('\\Users\\test\\.config', isWindows: true),
          '\\Users\\test\\.config');
      expect(toValidFilePath('Users\\test\\.config', isWindows: true),
          '\\Users\\test\\.config');
      expect(toValidFilePath('C:', isWindows: true), 'C:\\');
      expect(toValidFilePath('C:\\\\', isWindows: true), 'C:\\');
      expect(toValidFilePath('C:\\Users\\', isWindows: true), 'C:\\Users');
    });

    test('headFile', () async {
      expect(await headFile('$testTargetPath/hello.md'), '# Hello, World!');
      expect(await headFile('$testTargetPath/hello.md', length: 1),
          '# Hello, World!');
      expect(await headFile('$testTargetPath/hello.md', length: 4),
          '# Hello, World!\n\nThis is Hello File.\n');
    });

    test('tailFile', () async {
      expect(await tailFile('$testTargetPath/hello.md'), '--- Hello End ---');
      expect(await tailFile('$testTargetPath/hello.md', length: 1),
          '--- Hello End ---');
      expect(await tailFile('$testTargetPath/hello.md', length: 4),
          '\nDo not modify this file.\n\n--- Hello End ---');
    });
  });

  edgeCaseTests();
}

/// Edge cases that the base suite does not cover: line-ending handling, empty
/// and blank-line-only files, symlinks, Unicode / space-bearing file names,
/// missing-path error behavior and the exact shape of `getFileInfo`.
///
/// Fixtures are built at runtime in a temp directory rather than committed to
/// `_resources`, so the CRLF fixture cannot be rewritten by git's end-of-line
/// normalization on checkout (which would silently make the CRLF test vacuous).
void edgeCaseTests() {
  group('File (edge cases)', () {
    const String unicodeFileName = '한글 파일 (1).txt';
    const String emptyMd5 = 'd41d8cd98f00b204e9800998ecf8427e';

    late Directory tempDir;
    String p(String name) => '${tempDir.path}/$name';

    setUpAll(() {
      tempDir = Directory.systemTemp.createTempSync('qsu-file-');

      File(p('empty.txt')).writeAsStringSync('');
      File(p('crlf.txt')).writeAsStringSync('line1\r\nline2\r\nline3\r\n');
      File(p('no-trailing-newline.txt')).writeAsStringSync('a\nb');
      File(p('blank-lines.txt')).writeAsStringSync('\n\n\n');
      File(p(unicodeFileName)).writeAsStringSync('hi');

      Link(p('broken.link')).createSync(p('ghost.txt'));
      Link(p('good.link')).createSync(p('empty.txt'));
    });

    tearDownAll(() {
      tempDir.deleteSync(recursive: true);
    });

    test('getFileName - additional path shapes', () {
      // Only the last extension is stripped.
      expect(getFileName('a/b/c.tar.gz'), 'c.tar');
      expect(getFileName('a/b/c.tar.gz', withExtension: true), 'c.tar.gz');
      expect(getFileName('a.b.c.d.e'), 'a.b.c.d');
      // A leading dot is part of the name, not an extension.
      expect(getFileName('.gitignore'), '.gitignore');
      expect(getFileName('x/.env.local'), '.env');
      expect(getFileName('x/.env.local', withExtension: true), '.env.local');
      // Dots in a *directory* segment must not be mistaken for an extension.
      expect(getFileName('dir.with.dot/file'), 'file');
      expect(getFileName('C:/mixed\\sep/file.txt'), 'file');
      expect(getFileName('file with spaces.txt'), 'file with spaces');
      expect(getFileName('  padded .txt'), '  padded ');
      expect(getFileName('a/b/c.TXT'), 'c');
      expect(getFileName('/single'), 'single');
      expect(getFileName('/a/b/파일.txt'), '파일');
      expect(getFileName('/a/b/파일.txt', withExtension: true), '파일.txt');
      expect(getFileName('emoji🎉.txt'), 'emoji🎉');
    });

    test('getFileExtension - additional path shapes', () {
      expect(getFileExtension('archive.tar.gz'), 'gz');
      expect(getFileExtension('a.b.c.d.e'), 'e');
      expect(getFileExtension('x/.env.local'), 'local');
      // A dotfile with no second dot has no extension.
      expect(getFileExtension('no_ext/.hidden'), null);
      // A trailing dot is not an extension.
      expect(getFileExtension('/a/b/c.'), null);
      // Extensions are always lower-cased.
      expect(getFileExtension('UPPER.PNG'), 'png');
      expect(getFileExtension('a b.c d.TXT'), 'txt');
      // Dots in a Windows directory segment are not an extension.
      expect(getFileExtension('C:\\a.b\\c'), null);
      expect(getFileExtension('file.a'), 'a');
      expect(getFileExtension('x.123'), '123');
      expect(getFileExtension('파일.한글'), '한글');
    });

    test('getFilePathLevel - additional path shapes', () {
      expect(getFilePathLevel('/a/b'), 3);
      expect(getFilePathLevel('/a/b/c/d/e'), 6);
      // A relative path has no leading empty segment, so it counts one lower.
      expect(getFilePathLevel('a'), 1);
      expect(getFilePathLevel('.'), 1);
      expect(getFilePathLevel('./a/b'), 3);
      // A trailing backslash is stripped before counting.
      expect(getFilePathLevel('C:\\Windows\\System32\\'), 3);
      // A UNC prefix collapses to a single separator.
      expect(getFilePathLevel('\\\\server\\share'), 3);
    });

    test('toPosixFilePath - additional path shapes', () {
      expect(toPosixFilePath(''), '');
      expect(toPosixFilePath('\\'), '/');
      expect(toPosixFilePath('/already/posix'), '/already/posix');
      expect(toPosixFilePath('mixed/win\\path'), 'mixed/win/path');
      // Runs of separators collapse to one.
      expect(toPosixFilePath('C:\\a\\\\\\b'), 'C:/a/b');
      expect(toPosixFilePath('C:\\파일\\한글.txt'), 'C:/파일/한글.txt');
    });

    test('isValidFileName - reserved characters and edge names', () {
      // Characters Windows reserves.
      expect(isValidFileName('file<name>'), false);
      expect(isValidFileName('file|name'), false);
      expect(isValidFileName('file?name'), false);
      expect(isValidFileName('file"name'), false);
      expect(isValidFileName('file*'), false);
      // Dot-only names are never valid.
      expect(isValidFileName('.'), false);
      expect(isValidFileName('..'), false);
      expect(isValidFileName('...'), false);
      // Leading/trailing spaces are accepted (only all-whitespace is rejected).
      expect(isValidFileName(' leading'), true);
      expect(isValidFileName('trailing '), true);
      expect(isValidFileName('한글파일.txt'), true);
      expect(isValidFileName('한글파일.txt', unixType: true), true);
      // Unix only rejects ':' and '/', so Windows-reserved chars pass.
      expect(isValidFileName('a:b', unixType: true), false);
      expect(isValidFileName('a|b', unixType: true), true);
      expect(isValidFileName('a<b>c', unixType: true), true);
      // Windows device names stay reserved even with an extension appended,
      // but they are only reserved on Windows.
      expect(isValidFileName('nul.txt'), false);
      expect(isValidFileName('CON'), false);
      expect(isValidFileName('com1'), false);
      expect(isValidFileName('LPT9'), false);
      expect(isValidFileName('nul.txt', unixType: true), true);
      // Near-misses are still valid names.
      expect(isValidFileName('COM0'), true);
      expect(isValidFileName('CONSOLE'), true);
    });

    test('getCopyFileName - additional collision shapes', () {
      expect(getCopyFileName('a.txt', []), 'a.txt');
      // Only an exact match collides, so a pre-existing "(1)" is irrelevant.
      expect(getCopyFileName('a.txt', ['a (1).txt']), 'a.txt');
      // The first free index wins, gaps included.
      expect(getCopyFileName('a.txt', ['a.txt', 'a (1).txt', 'a (3).txt']),
          'a (2).txt');
      expect(getCopyFileName('a', ['a', 'a (1)', 'a (2)']), 'a (3)');
      expect(getCopyFileName('한글.txt', ['한글.txt']), '한글 (1).txt');
      // The original extension casing is preserved.
      expect(getCopyFileName('a.TXT', ['a.TXT']), 'a (1).TXT');
      expect(getCopyFileName('Report.PDF', ['Report.PDF']), 'Report (1).PDF');
      expect(getCopyFileName('a.tar.GZ', ['a.tar.GZ']), 'a.tar (1).GZ');
    });

    test('toValidFilePath - redundant separators', () {
      expect(toValidFilePath('/a/b/c'), '/a/b/c');
      expect(toValidFilePath('a/b/c'), '/a/b/c');
      expect(toValidFilePath('/a//b///c'), '/a/b/c');
      expect(toValidFilePath('/a/b/c/'), '/a/b/c');
      expect(toValidFilePath('/한글/파일'), '/한글/파일');
    });

    test('normalizeFile - compatibility forms', () {
      // NFKC/NFKD fold compatibility characters; NFC/NFD do not.
      expect(normalizeFile('ﬁle', normalizationForm: 'NFKC'), 'file');
      expect(normalizeFile('①', normalizationForm: 'NFKC'), '1');
      expect(normalizeFile('ＡＢ', normalizationForm: 'NFKD'), 'AB');
      // Composed Hangul is one code unit, decomposed is two.
      expect(normalizeFile('가', normalizationForm: 'NFD').length, 2);
      expect(normalizeFile('가', normalizationForm: 'NFC').length, 1);
      // The default form is NFC.
      expect(normalizeFile('가'), normalizeFile('가', normalizationForm: 'NFC'));
      // Normalization is idempotent and leaves pure ASCII untouched.
      expect(
          normalizeFile(normalizeFile('가', normalizationForm: 'NFD'),
              normalizationForm: 'NFD'),
          normalizeFile('가', normalizationForm: 'NFD'));
      expect(
          normalizeFile('/a/b/c.txt', normalizationForm: 'NFD'), '/a/b/c.txt');
      expect(normalizeFile(''), '');
    });

    test('headFile / tailFile - empty file', () async {
      expect(await headFile(p('empty.txt')), null);
      expect(await tailFile(p('empty.txt')), null);
      expect(await headFile(p('empty.txt'), length: 10), null);
      expect(await tailFile(p('empty.txt'), length: 10), null);
    });

    test('headFile / tailFile - CRLF line endings', () async {
      // '\r' must be consumed as part of the line break, not kept in the text.
      expect(await headFile(p('crlf.txt')), 'line1');
      expect(await headFile(p('crlf.txt'), length: 2), 'line1\nline2');
      expect(await tailFile(p('crlf.txt')), 'line3');
      expect(await tailFile(p('crlf.txt'), length: 2), 'line2\nline3');
      expect(await headFile(p('crlf.txt'), length: 3), 'line1\nline2\nline3');
    });

    test('headFile / tailFile - file without a trailing newline', () async {
      expect(await headFile(p('no-trailing-newline.txt')), 'a');
      expect(await tailFile(p('no-trailing-newline.txt')), 'b');
      // Asking beyond EOF returns everything rather than padding.
      expect(await headFile(p('no-trailing-newline.txt'), length: 5), 'a\nb');
      expect(await tailFile(p('no-trailing-newline.txt'), length: 5), 'a\nb');
    });

    test('headFile / tailFile - blank-line-only file', () async {
      expect(await headFile(p('blank-lines.txt'), length: 3), '\n\n');
      // tailFile drops one trailing empty line by design.
      expect(await tailFile(p('blank-lines.txt'), length: 3), '\n');
      expect(await tailFile(p('blank-lines.txt'), length: 1), null);
    });

    test('headFile / tailFile - non-positive length', () async {
      expect(await headFile(p('crlf.txt'), length: 0), null);
      expect(await tailFile(p('crlf.txt'), length: 0), null);
      expect(await headFile(p('crlf.txt'), length: -1), null);
      expect(await tailFile(p('crlf.txt'), length: -1), null);
    });

    test('missing paths throw instead of returning a fallback', () async {
      final String missing = p('does-not-exist.txt');

      expect(headFile(missing), throwsA(anything));
      expect(tailFile(missing), throwsA(anything));
      expect(getFileSize(missing), throwsA(anything));
      expect(getFileInfo(missing), throwsA(anything));
      expect(getFileHashFromPath(missing), throwsA(anything));
    });

    test('getFileSize / getFileHashFromPath - empty file', () async {
      expect(await getFileSize(p('empty.txt')), 0);
      expect(await getFileHashFromPath(p('empty.txt')), emptyMd5);
    });

    test('isFileExists - symlinks are followed', () async {
      // A symlink to an existing file resolves; a dangling one does not.
      expect(await isFileExists(p('good.link')), true);
      expect(await isFileExists(p('broken.link')), false);
    });

    test('handles Unicode and space-bearing file names', () async {
      expect(await isFileExists(p(unicodeFileName)), true);
      expect(getFileName(unicodeFileName), '한글 파일 (1)');
      expect(getFileExtension(unicodeFileName), 'txt');
      expect(await getFileSize(p(unicodeFileName)), 2);
    });

    test('deleteFile - missing path is a no-op', () async {
      await deleteFile(p('does-not-exist.txt'));
      await deleteFile('');
    });

    test(
        'deleteAllFileFromDirectory - clears nested entries but keeps the root',
        () async {
      final String root = p('nest');

      Directory('$root/sub').createSync(recursive: true);
      File('$root/top.txt').writeAsStringSync('top');
      File('$root/sub/inner.txt').writeAsStringSync('inner');

      await deleteAllFileFromDirectory(root);

      // Subdirectories are removed too, not just plain files.
      expect(await isFileExists(root), true);
      expect(await isFileExists('$root/top.txt'), false);
      expect(await isFileExists('$root/sub'), false);
    });

    test('deleteAllFileFromDirectory - missing directory is a no-op', () async {
      await deleteAllFileFromDirectory(p('no-such-directory'));
    });

    test('createFileWithDummy - produces the exact requested size', () async {
      for (final int size in [1, 512, 4096]) {
        final String target = p('dummy-$size.bin');

        expect(await createFileWithDummy(target, size: size), true);
        expect(await getFileSize(target), size);

        await deleteFile(target);
      }
    });

    test('getFileInfo - field level assertions', () async {
      final FileInfo fileInfo = await getFileInfo(p('crlf.txt'));

      expect(fileInfo.success, true);
      expect(fileInfo.isDirectory, false);
      expect(fileInfo.name, 'crlf');
      expect(fileInfo.ext, 'txt');
      expect(fileInfo.size, 21);
      expect(fileInfo.sizeHumanized, '21 Bytes');
      // `path` is absolute. Separators are normalized before comparing, because
      // `normalize` emits '\' on Windows while the `p()` helper builds paths
      // with '/'.
      expect(toPosixFilePath(fileInfo.path), toPosixFilePath(p('crlf.txt')));
      expect(fileInfo.created > 0, true);
      expect(fileInfo.modified > 0, true);

      final FileInfo directoryInfo = await getFileInfo(tempDir.path);

      expect(directoryInfo.success, true);
      expect(directoryInfo.isDirectory, true);
      // A directory without a dot in its name has no extension.
      expect(directoryInfo.ext, null);
    });

    test('getFileInfo - resolves a relative path to an absolute one', () async {
      final FileInfo fileInfo =
          await getFileInfo('$testTargetPath/STATIC_FILE.txt');

      expect(fileInfo.name, 'STATIC_FILE');
      expect(fileInfo.ext, 'txt');
      expect(fileInfo.path.endsWith('STATIC_FILE.txt'), true);
      expect(fileInfo.path == '$testTargetPath/STATIC_FILE.txt', false);
    });

    test('createDirectory - nested creation and idempotence', () async {
      final String nested = p('a/b/c');

      await createDirectory(nested);
      expect(await isFileExists(nested), true);

      // Re-creating an existing directory is a silent no-op.
      await createDirectory(nested);
      expect(await isFileExists(nested), true);

      await deleteFile(p('a'));
      expect(await isFileExists(nested), false);
    });

    test('getParentFilePath - relative, empty and trailing-separator paths',
        () {
      // A relative path keeps its parent segment instead of collapsing to root.
      expect(getParentFilePath('relative/path'), '/relative');
      expect(getParentFilePath('a/b/c'), '/a/b');
      // A single segment (and an empty path) has the root as its parent.
      expect(getParentFilePath('a'), '/');
      expect(getParentFilePath(''), '/');
      // Trailing separators are ignored, as in POSIX dirname(1).
      expect(getParentFilePath('/home/user/'), '/home');
      expect(getParentFilePath('/a/b/c/'), '/a/b');
      expect(getParentFilePath('/a//b'), '/a');
    });

    test('getParentFilePath - Windows relative and UNC paths', () {
      expect(
          getParentFilePath('relative\\path', isWindows: true), '\\relative');
      expect(getParentFilePath('a', isWindows: true), '\\');
      expect(getParentFilePath('', isWindows: true), '\\');
      expect(getParentFilePath('C:\\Users\\', isWindows: true), 'C:\\');
      // The '\\' UNC prefix survives.
      expect(getParentFilePath('\\\\net\\share\\file.txt', isWindows: true),
          '\\\\net\\share');
    });

    test('toValidFilePath - resolves . and .. segments', () {
      expect(toValidFilePath('/home/user/../test'), '/home/test');
      expect(toValidFilePath('/a/./b'), '/a/b');
      // A path that collapses to nothing resolves to the root.
      expect(toValidFilePath('.'), '/');
      expect(toValidFilePath('C:\\a\\..\\b', isWindows: true), 'C:\\b');
      expect(toValidFilePath('C:\\Windows\\..\\text.txt', isWindows: true),
          'C:\\text.txt');
      expect(toValidFilePath('.', isWindows: true), '\\');
      expect(toValidFilePath('', isWindows: true), '\\');
    });

    test('getFilePathLevel - a trailing separator does not add a level', () {
      expect(getFilePathLevel('/home/user/'), getFilePathLevel('/home/user'));
      expect(getFilePathLevel('/a/b//'), getFilePathLevel('/a/b'));
      expect(
          getFilePathLevel('C:\\Windows\\'), getFilePathLevel('C:\\Windows'));
      expect(getFilePathLevel('//'), 1);
    });

    test('createFileWithDummy - a size of 0 creates an empty file', () async {
      final String target = p('zero.bin');

      expect(await createFileWithDummy(target, size: 0), true);
      expect(await isFileExists(target), true);
      expect(await getFileSize(target), 0);

      await deleteFile(target);
    });

    test('createFileWithDummy - rejects a negative size', () {
      expect(
          createFileWithDummy(p('negative.bin'), size: -5), throwsA(anything));
    });

    test('createDirectory - a non-recursive nested creation throws', () async {
      expect(createDirectory(p('missing-parent/child'), recursive: false),
          throwsA(anything));
      expect(await isFileExists(p('missing-parent/child')), false);
    });

    test('moveFile - a missing source throws', () {
      expect(moveFile(p('does-not-exist.txt'), p('target.txt')),
          throwsA(anything));
    });

    test('moveFile - renames within the same directory', () async {
      final String source = p('move-source.txt');
      final String target = p('move-target.txt');

      File(source).writeAsStringSync('payload');
      await moveFile(source, target);

      expect(await isFileExists(source), false);
      expect(await isFileExists(target), true);
      expect(await getFileSize(target), 7);

      await deleteFile(target);
    });
  });
}
