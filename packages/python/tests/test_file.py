import os
import unicodedata

import pytest

from qsu.file import (
	createDirectory,
	createFile,
	createFileWithDummy,
	deleteAllFileFromDirectory,
	deleteFile,
	getCopyFileName,
	getFileExtension,
	getFileHashFromPath,
	getFileHashFromStream,
	getFileInfo,
	getFileName,
	getFilePathLevel,
	getFileSize,
	getParentFilePath,
	headFile,
	isFileExists,
	isFileHidden,
	isValidFileName,
	joinFilePath,
	moveFile,
	normalizeFile,
	tailFile,
	toPosixFilePath,
	toValidFilePath,
)

LONG_PATH = (
	'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\'
	'115.0.1901.203\\Trust Protection Lists'
)

HELLO_CONTENT = (
	'# Hello, World!\n\nThis is Hello File.\n\n'
	'Do not modify this file.\n\n--- Hello End ---\n'
)
STATIC_CONTENT = 'This file must not be modified.\n'

# Hashes of STATIC_CONTENT (POSIX / LF line ending), matching the JS test suite.
HASH_TABLE = {
	'md5': '192ef428bd3e3413262df05679cee825',
	'sha1': '2accd3e31a50c5ed9c6786ef34669bbda55d7156',
	'sha256': '568770a759ef55df5c2a5d3cbfc5c62e2ade6a353c391037d91a97212dec9e88',
	'sha512': (
		'b03187c2962c947de2d5d3cdaa2f25e5e1df31c5190cccf42d03759d042dd5f5a'
		'2773ca9903e122b6faaf4a53b45c419d605464abb83cbe578ed249cb558844a'
	),
}


@pytest.fixture
def resources(tmp_path):
	"""Recreate the JS fixtures under test/_resources/files in a temp dir."""
	hello = tmp_path / 'hello.md'
	hello.write_bytes(HELLO_CONTENT.encode('utf-8'))

	static = tmp_path / 'STATIC_FILE.txt'
	static.write_bytes(STATIC_CONTENT.encode('utf-8'))

	mv = tmp_path / 'MV_TEST.txt'
	mv.write_bytes('Hello, World!'.encode('utf-8'))

	empty = tmp_path / 'EMPTY'
	empty.mkdir()

	return tmp_path


def test_isFileHidden():
	assert isFileHidden('/home/user/Desktop/hello.txt') is False
	assert isFileHidden('~/.bash_profile') is True
	assert isFileHidden('.zshrc') is True
	assert isFileHidden('/home/user/Desktop/.hidden') is True
	assert isFileHidden('/home/user/Desktop/.conf/config') is False
	assert isFileHidden('/home/user/Desktop/.conf/.secret') is True


def test_isFileExists(resources):
	assert isFileExists(str(resources / 'hello.md')) is True
	assert isFileExists(str(resources)) is True
	assert isFileExists(str(resources / 'MV_TEST.txt')) is True
	assert isFileExists(str(resources / 'not-exists.txt')) is False


def test_toValidFilePath():
	assert toValidFilePath('home') == '/home'
	assert toValidFilePath('/home//test/') == '/home/test'
	assert toValidFilePath('home/test/.conf') == '/home/test/.conf'
	assert toValidFilePath('/') == '/'
	assert toValidFilePath('') == '/'
	assert toValidFilePath('', True) == '\\'
	assert toValidFilePath('\\', True) == '\\'
	assert toValidFilePath('\\Users', True) == '\\Users'
	assert toValidFilePath('\\\\net\\work', True) == '\\\\net\\work'
	assert toValidFilePath('\\\\net\\work\\\\file.json', True) == '\\\\net\\work\\file.json'
	assert toValidFilePath('C:', True) == 'C:\\'
	assert toValidFilePath('C:\\Users\\', True) == 'C:\\Users'
	assert toValidFilePath('C:\\\\\\Users\\test\\', True) == 'C:\\Users\\test'
	assert toValidFilePath('\\Users\\test\\.config', True) == '\\Users\\test\\.config'
	assert toValidFilePath('Users\\test\\.config', True) == '\\Users\\test\\.config'


def test_joinFilePath():
	assert joinFilePath(True, 'C:\\', 'Windows', 'System32') == 'C:\\Windows\\System32'
	assert joinFilePath(True, 'D:\\') == 'D:\\'
	assert joinFilePath(True, 'C:\\', 'Windows', '..', 'text.txt') == 'C:\\text.txt'
	assert (
		joinFilePath(True, 'C:\\', 'Windows', '\\System32', 'text.txt')
		== 'C:\\Windows\\System32\\text.txt'
	)
	assert (
		joinFilePath(True, 'C:\\', 'Windows', '\\System32', '.text.txt')
		== 'C:\\Windows\\System32\\.text.txt'
	)
	assert joinFilePath(True, 'Users', 'test\\') == '\\Users\\test'
	assert joinFilePath(True, 'Users') == '\\Users'
	assert joinFilePath(True, '\\\\net', '\\home') == '\\\\net\\home'
	assert joinFilePath(True, '\\\\net', 'home', 'text.txt') == '\\\\net\\home\\text.txt'
	assert joinFilePath(True, '\\\\net', 'home', '.abc.txt') == '\\\\net\\home\\.abc.txt'
	assert (
		joinFilePath(False, '/C:/', 'Users', 'test', 'text.txt')
		== '/C:/Users/test/text.txt'
	)
	assert joinFilePath(False, '/') == '/'
	assert joinFilePath(False, '/home/') == '/home'
	assert joinFilePath(False, '/home//user/') == '/home/user'
	assert (
		joinFilePath(False, 'home', 'user', 'hello.world', 'text.txt')
		== '/home/user/hello.world/text.txt'
	)
	assert joinFilePath(False, '/home', '/user', 'Desktop/') == '/home/user/Desktop'
	assert joinFilePath(False, 'home', 'user', '.bashrc') == '/home/user/.bashrc'
	assert joinFilePath(False, 'home', 'user', '..', '.bashrc') == '/home/.bashrc'


def test_getFileSize(resources):
	# Sizes use POSIX (LF) line endings, matching the non-Windows JS expectations.
	assert getFileSize(str(resources / 'hello.md')) == 82
	assert getFileSize(str(resources / 'MV_TEST.txt')) == 13


def test_getCopyFileName():
	fileNameLists = [
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
	]

	assert getCopyFileName('abc', fileNameLists) == 'abc'
	assert getCopyFileName('abc.txt', fileNameLists) == 'abc.txt'
	assert getCopyFileName('123', fileNameLists) == '123 (1)'
	assert getCopyFileName('456 (1)', fileNameLists) == '456 (1) (1)'
	assert getCopyFileName('aaa.txt', fileNameLists) == 'aaa (1).txt'
	assert getCopyFileName('aaa (1).txt', fileNameLists) == 'aaa (1).txt'
	assert getCopyFileName('bbb.txt', fileNameLists) == 'bbb (2).txt'
	assert getCopyFileName('bbb (1).txt', fileNameLists) == 'bbb (1) (1).txt'
	assert getCopyFileName('ccc.txt', fileNameLists) == 'ccc (5).txt'
	assert getCopyFileName('ddd.aaa.txt', fileNameLists) == 'ddd.aaa (1).txt'
	assert getCopyFileName('ddd.aaa.aaa (1).txt', fileNameLists) == 'ddd.aaa.aaa (1) (1).txt'


def test_getFilePathLevel():
	assert getFilePathLevel('C:') == 1
	assert getFilePathLevel('C:\\') == 1
	assert getFilePathLevel('C:\\Windows\\System32') == 3
	assert getFilePathLevel(LONG_PATH) == 7
	assert getFilePathLevel('/') == 1
	assert getFilePathLevel('/home/user') == 3
	assert getFilePathLevel('/home/user/.ssh/test file.txt') == 5


def test_getParentFilePath():
	assert getParentFilePath('/') == '/'
	assert getParentFilePath('/home/user/test.txt') == '/home/user'
	assert getParentFilePath('/home/user/abc') == '/home/user'
	assert getParentFilePath('/home') == '/'
	assert getParentFilePath('C:\\', True) == 'C:\\'
	assert getParentFilePath('C:\\Users', True) == 'C:\\'
	assert getParentFilePath('C:\\Users\\user', True) == 'C:\\Users'
	assert getParentFilePath('C:\\Users\\user\\text.txt', True) == 'C:\\Users\\user'


def test_toPosixFilePath():
	assert toPosixFilePath('\\\\Shared') == '/Shared'
	assert toPosixFilePath('C:\\') == 'C:/'
	assert toPosixFilePath('C:\\Windows\\System32') == 'C:/Windows/System32'
	assert toPosixFilePath('Windows\\System32') == 'Windows/System32'
	assert toPosixFilePath(LONG_PATH) == (
		'C:/Program Files (x86)/Microsoft/Edge/Application/'
		'115.0.1901.203/Trust Protection Lists'
	)
	assert toPosixFilePath('/home/user/Test file.txt') == '/home/user/Test file.txt'


def test_isValidFileName():
	assert isValidFileName('System32') is True
	assert isValidFileName('.example', True) is True
	# The ':' lives in the extension; the whole name is validated.
	assert isValidFileName('hello.:txt', True) is False
	assert isValidFileName('C:\\Windows\\System32') is True
	assert isValidFileName('C:\\Users\\test\\Desktop\\hello.txt') is True
	assert isValidFileName('C:\\Users\\test\\Desktop\\hello*') is False
	assert isValidFileName('C:\\Users\\test\\Desktop\\hello!@#$%^&*()_+-:=') is False
	assert isValidFileName('hello!@#$%^&*()_+-:=', True) is False
	assert isValidFileName('/home/test/Desktop/test/.example', True) is True
	assert isValidFileName('/home/test/Desktop/test/text.txt', True) is True
	assert isValidFileName('/home/test/Desktop/test/hi!@#$%^&*()_+-=', True) is True
	assert isValidFileName('/home/test/Desktop/test/*hi', True) is True
	# 256-character file name (invalid)
	assert (
		isValidFileName(
			'/home/test/Desktop/test/' + '0123456789' * 25 + '012345'
		)
		is False
	)
	# 255-character file name (valid)
	assert (
		isValidFileName(
			'/home/test/Desktop/test/' + '0123456789' * 25 + '01234', True
		)
		is True
	)


def test_getFileHashFromPath(resources):
	path = str(resources / 'STATIC_FILE.txt')

	assert getFileHashFromPath(path) == HASH_TABLE['md5']
	assert getFileHashFromPath(path, 'sha1') == HASH_TABLE['sha1']
	assert getFileHashFromPath(path, 'sha256') == HASH_TABLE['sha256']
	assert getFileHashFromPath(path, 'sha512') == HASH_TABLE['sha512']


def test_getFileHashFromStream(resources):
	path = str(resources / 'STATIC_FILE.txt')

	with open(path, 'rb') as stream:
		assert getFileHashFromStream(stream) == HASH_TABLE['md5']
	with open(path, 'rb') as stream:
		assert getFileHashFromStream(stream, 'sha1') == HASH_TABLE['sha1']
	with open(path, 'rb') as stream:
		assert getFileHashFromStream(stream, 'sha256') == HASH_TABLE['sha256']
	with open(path, 'rb') as stream:
		assert getFileHashFromStream(stream, 'sha512') == HASH_TABLE['sha512']


def test_getFileExtension():
	assert getFileExtension('test.123/sample.txt') == 'txt'
	assert getFileExtension('test.123/sample') is None
	assert getFileExtension('test/sample.txt') == 'txt'
	assert getFileExtension('test/hello.1/sample.txt') == 'txt'
	assert getFileExtension('test/sample') is None
	assert getFileExtension('test.txt.sample') == 'sample'
	assert getFileExtension('test') is None
	assert getFileExtension('TEST.FILE.TXT') == 'txt'
	assert getFileExtension('test..txt..png') == 'png'
	assert getFileExtension('txt') is None
	assert getFileExtension('txt.png') == 'png'
	assert getFileExtension('/home/txt.txt') == 'txt'
	assert getFileExtension('/home/txt.abc.png') == 'png'
	assert getFileExtension('C:\\test\\txt.png') == 'png'
	assert getFileExtension('C:\\test.hello.sample\\txt') is None
	assert getFileExtension('C:\\test.hello.sample\\txt.txt') == 'txt'


def test_getFileName():
	assert getFileName('test/sample.txt') == 'sample'
	assert getFileName('test/sample') == 'sample'
	assert getFileName('test/sample/') == 'sample'
	assert getFileName('test/') == 'test'
	assert getFileName('test/sample', True) == 'sample'
	assert getFileName('test/sample.txt.sample') == 'sample.txt'
	assert getFileName('test/sample.txt', True) == 'sample.txt'
	assert getFileName('test/sample.a/') == 'sample.a'
	assert getFileName('C:\\Users\\user\\Desktop\\hello.txt') == 'hello'
	assert getFileName('C:\\Users\\user\\Desktop\\hello.txt', True) == 'hello.txt'
	assert getFileName('C:\\Users\\user\\Desktop') == 'Desktop'
	assert getFileName('C:\\Users\\user\\Desktop\\') == 'Desktop'
	assert getFileName('test') == 'test'


def test_normalizeFile():
	NFD = unicodedata.normalize('NFD', '안녕하세요_12345-ABCDE')
	NFC = unicodedata.normalize('NFC', '안녕하세요_12345-ABCDE')

	assert normalizeFile(NFD, 'NFC') == NFC
	assert normalizeFile(NFC, 'NFD') == NFD


def test_getFileInfo(resources):
	assert getFileInfo(str(resources / 'STATIC_FILE.txt'))
	assert getFileInfo(str(resources))


def test_headFile(resources):
	path = str(resources / 'hello.md')

	assert headFile(path) == '# Hello, World!'
	assert headFile(path, 1) == '# Hello, World!'
	assert headFile(path, 4) == '# Hello, World!\n\nThis is Hello File.\n'


def test_tailFile(resources):
	path = str(resources / 'hello.md')

	assert tailFile(path) == '--- Hello End ---'
	assert tailFile(path, 1) == '--- Hello End ---'
	assert tailFile(path, 4) == '\nDo not modify this file.\n\n--- Hello End ---'


def test_createDirectory(resources):
	abc = str(resources / 'abc')
	defp = str(resources / 'abc' / 'def')

	createDirectory(abc)
	createDirectory(defp)

	assert isFileExists(abc) is True
	assert isFileExists(defp) is True

	deleteFile(abc)

	assert isFileExists(abc) is False
	assert isFileExists(defp) is False


def test_createFile(resources):
	testFilePath = str(resources / '__TEST__TOUCH_FILE.txt')

	createFile(testFilePath)

	assert isFileExists(testFilePath) is True


def test_deleteFile(resources):
	testFilePath = str(resources / '__TEST__TOUCH_FILE.txt')

	createFile(testFilePath)
	deleteFile(testFilePath)

	assert isFileExists(testFilePath) is False


def test_createFileWithDummy(resources):
	dummyFilePath = str(resources / '__TEST__TOUCH_FILE.txt')

	createFileWithDummy(dummyFilePath, 100)

	dummyFileStat = getFileInfo(dummyFilePath)

	deleteFile(dummyFilePath)

	assert dummyFileStat['size'] == 100


def test_moveFile(resources):
	src = str(resources / 'MV_TEST.txt')
	dst = str(resources / 'MV_TEST_1.txt')

	moveFile(src, dst)
	assert isFileExists(src) is False
	assert isFileExists(dst) is True

	moveFile(dst, src)
	assert isFileExists(src) is True
	assert isFileExists(dst) is False


def test_deleteAllFileFromDirectory(resources):
	empty = str(resources / 'EMPTY')

	(resources / 'EMPTY' / 'a.txt').write_text('a')
	(resources / 'EMPTY' / 'b.txt').write_text('b')

	deleteAllFileFromDirectory(empty)

	assert isFileExists(str(resources / 'EMPTY' / 'a.txt')) is False
	assert isFileExists(str(resources / 'EMPTY' / 'b.txt')) is False


# ---------------------------------------------------------------------------
# Edge cases that the base suite does not cover: line-ending handling, empty
# and blank-line-only files, symlinks, Unicode / space-bearing file names,
# missing-path error behavior and the exact shape of `getFileInfo`.
#
# Fixtures are built at runtime rather than committed to a resources directory,
# so the CRLF fixture cannot be rewritten by git's end-of-line normalization on
# checkout (which would silently make the CRLF test vacuous).
# ---------------------------------------------------------------------------

UNICODE_FILE_NAME = '한글 파일 (1).txt'
EMPTY_MD5 = 'd41d8cd98f00b204e9800998ecf8427e'


@pytest.fixture
def edge(tmp_path):
	"""Build the edge-case fixture tree in a temp directory."""
	(tmp_path / 'empty.txt').write_bytes(b'')
	(tmp_path / 'crlf.txt').write_bytes(b'line1\r\nline2\r\nline3\r\n')
	(tmp_path / 'no-trailing-newline.txt').write_bytes(b'a\nb')
	(tmp_path / 'blank-lines.txt').write_bytes(b'\n\n\n')
	(tmp_path / UNICODE_FILE_NAME).write_bytes(b'hi')

	os.symlink(str(tmp_path / 'ghost.txt'), str(tmp_path / 'broken.link'))
	os.symlink(str(tmp_path / 'empty.txt'), str(tmp_path / 'good.link'))

	return tmp_path


def test_getFileName_additional_path_shapes():
	# Only the last extension is stripped.
	assert getFileName('a/b/c.tar.gz') == 'c.tar'
	assert getFileName('a/b/c.tar.gz', True) == 'c.tar.gz'
	assert getFileName('a.b.c.d.e') == 'a.b.c.d'
	# A leading dot is part of the name, not an extension.
	assert getFileName('.gitignore') == '.gitignore'
	assert getFileName('x/.env.local') == '.env'
	assert getFileName('x/.env.local', True) == '.env.local'
	# Dots in a *directory* segment must not be mistaken for an extension.
	assert getFileName('dir.with.dot/file') == 'file'
	# A path containing '/' takes the POSIX branch even with a drive letter.
	assert getFileName('C:/mixed\\sep/file.txt') == 'file'
	assert getFileName('file with spaces.txt') == 'file with spaces'
	assert getFileName('  padded .txt') == '  padded '
	assert getFileName('a/b/c.TXT') == 'c'
	assert getFileName('/single') == 'single'
	assert getFileName('/a/b/파일.txt') == '파일'
	assert getFileName('/a/b/파일.txt', True) == '파일.txt'
	assert getFileName('emoji🎉.txt') == 'emoji🎉'


def test_getFileExtension_additional_path_shapes():
	assert getFileExtension('archive.tar.gz') == 'gz'
	assert getFileExtension('a.b.c.d.e') == 'e'
	assert getFileExtension('x/.env.local') == 'local'
	# A dotfile with no second dot has no extension.
	assert getFileExtension('no_ext/.hidden') is None
	# A trailing dot is not an extension.
	assert getFileExtension('/a/b/c.') is None
	# Extensions are always lower-cased.
	assert getFileExtension('UPPER.PNG') == 'png'
	assert getFileExtension('a b.c d.TXT') == 'txt'
	# Dots in a Windows directory segment are not an extension.
	assert getFileExtension('C:\\a.b\\c') is None
	assert getFileExtension('file.a') == 'a'
	assert getFileExtension('x.123') == '123'
	assert getFileExtension('파일.한글') == '한글'


def test_getFilePathLevel_additional_path_shapes():
	assert getFilePathLevel('/a/b') == 3
	assert getFilePathLevel('/a/b/c/d/e') == 6
	# A relative path has no leading empty segment, so it counts one lower.
	assert getFilePathLevel('a') == 1
	assert getFilePathLevel('.') == 1
	assert getFilePathLevel('./a/b') == 3
	# A trailing backslash is stripped before counting.
	assert getFilePathLevel('C:\\Windows\\System32\\') == 3
	# A UNC prefix collapses to a single separator.
	assert getFilePathLevel('\\\\server\\share') == 3


def test_toPosixFilePath_additional_path_shapes():
	assert toPosixFilePath('') == ''
	assert toPosixFilePath('\\') == '/'
	assert toPosixFilePath('/already/posix') == '/already/posix'
	assert toPosixFilePath('mixed/win\\path') == 'mixed/win/path'
	# Runs of separators collapse to one.
	assert toPosixFilePath('C:\\a\\\\\\b') == 'C:/a/b'
	assert toPosixFilePath('C:\\파일\\한글.txt') == 'C:/파일/한글.txt'


def test_isValidFileName_reserved_characters_and_edge_names():
	# Characters Windows reserves.
	assert isValidFileName('file<name>') is False
	assert isValidFileName('file|name') is False
	assert isValidFileName('file?name') is False
	assert isValidFileName('file"name') is False
	assert isValidFileName('file*') is False
	# Dot-only names are never valid.
	assert isValidFileName('.') is False
	assert isValidFileName('..') is False
	assert isValidFileName('...') is False
	# Leading/trailing spaces are accepted (only all-whitespace is rejected).
	assert isValidFileName(' leading') is True
	assert isValidFileName('trailing ') is True
	assert isValidFileName('한글파일.txt') is True
	assert isValidFileName('한글파일.txt', True) is True
	# Unix only rejects ':' and '/', so Windows-reserved chars pass.
	assert isValidFileName('a:b', True) is False
	assert isValidFileName('a|b', True) is True
	assert isValidFileName('a<b>c', True) is True
	# Windows device names stay reserved even with an extension appended, but
	# they are only reserved on Windows.
	assert isValidFileName('nul.txt') is False
	assert isValidFileName('CON') is False
	assert isValidFileName('com1') is False
	assert isValidFileName('LPT9') is False
	assert isValidFileName('nul.txt', True) is True
	# Near-misses are still valid names.
	assert isValidFileName('COM0') is True
	assert isValidFileName('CONSOLE') is True


def test_getCopyFileName_additional_collision_shapes():
	assert getCopyFileName('a.txt', []) == 'a.txt'
	# Only an exact match collides, so a pre-existing "(1)" is irrelevant.
	assert getCopyFileName('a.txt', ['a (1).txt']) == 'a.txt'
	# The first free index wins, gaps included.
	assert getCopyFileName('a.txt', ['a.txt', 'a (1).txt', 'a (3).txt']) == 'a (2).txt'
	assert getCopyFileName('a', ['a', 'a (1)', 'a (2)']) == 'a (3)'
	assert getCopyFileName('한글.txt', ['한글.txt']) == '한글 (1).txt'
	# The original extension casing is preserved.
	assert getCopyFileName('a.TXT', ['a.TXT']) == 'a (1).TXT'
	assert getCopyFileName('Report.PDF', ['Report.PDF']) == 'Report (1).PDF'
	assert getCopyFileName('a.tar.GZ', ['a.tar.GZ']) == 'a.tar (1).GZ'


def test_toValidFilePath_redundant_separators():
	assert toValidFilePath('/a/b/c') == '/a/b/c'
	assert toValidFilePath('a/b/c') == '/a/b/c'
	assert toValidFilePath('/a//b///c') == '/a/b/c'
	assert toValidFilePath('/a/b/c/') == '/a/b/c'
	assert toValidFilePath('/한글/파일') == '/한글/파일'


def test_normalizeFile_compatibility_forms():
	# NFKC/NFKD fold compatibility characters; NFC/NFD do not.
	assert normalizeFile('ﬁle', 'NFKC') == 'file'
	assert normalizeFile('①', 'NFKC') == '1'
	assert normalizeFile('ＡＢ', 'NFKD') == 'AB'
	# Composed Hangul is one code point, decomposed is two.
	assert len(normalizeFile('가', 'NFD')) == 2
	assert len(normalizeFile('가', 'NFC')) == 1
	# The default form is NFC.
	assert normalizeFile('가') == normalizeFile('가', 'NFC')
	# Normalization is idempotent and leaves pure ASCII untouched.
	assert normalizeFile(normalizeFile('가', 'NFD'), 'NFD') == normalizeFile('가', 'NFD')
	assert normalizeFile('/a/b/c.txt', 'NFD') == '/a/b/c.txt'
	assert normalizeFile('') == ''


def test_isFileHidden_additional_path_shapes():
	assert isFileHidden('') is False
	assert isFileHidden('/') is False
	assert isFileHidden('/a/b/.hidden.txt') is True
	# Only the final segment decides.
	assert isFileHidden('/a/.git/config') is False
	assert isFileHidden('.a/b') is False
	# '.' and '..' are not hidden entries.
	assert isFileHidden('/a/b/.') is False
	assert isFileHidden('..') is False
	# A backslash path is not split, so it is never seen as hidden.
	assert isFileHidden('C:\\a\\.hidden') is False


def test_headFile_tailFile_empty_file(edge):
	path = str(edge / 'empty.txt')

	assert headFile(path) is None
	assert tailFile(path) is None
	assert headFile(path, 10) is None
	assert tailFile(path, 10) is None


def test_headFile_tailFile_crlf_line_endings(edge):
	path = str(edge / 'crlf.txt')

	# '\r' must be consumed as part of the line break, not kept in the text.
	assert headFile(path) == 'line1'
	assert headFile(path, 2) == 'line1\nline2'
	assert tailFile(path) == 'line3'
	assert tailFile(path, 2) == 'line2\nline3'
	assert headFile(path, 3) == 'line1\nline2\nline3'


def test_headFile_tailFile_without_trailing_newline(edge):
	path = str(edge / 'no-trailing-newline.txt')

	assert headFile(path) == 'a'
	assert tailFile(path) == 'b'
	# Asking beyond EOF returns everything rather than padding.
	assert headFile(path, 5) == 'a\nb'
	assert tailFile(path, 5) == 'a\nb'


def test_headFile_tailFile_blank_line_only_file(edge):
	path = str(edge / 'blank-lines.txt')

	assert headFile(path, 3) == '\n\n'
	# tailFile drops one trailing empty line by design.
	assert tailFile(path, 3) == '\n'
	assert tailFile(path, 1) is None


def test_headFile_tailFile_non_positive_length(edge):
	path = str(edge / 'crlf.txt')

	assert headFile(path, 0) is None
	assert tailFile(path, 0) is None
	assert headFile(path, -1) is None
	assert tailFile(path, -1) is None


def test_missing_paths_raise(edge):
	missing = str(edge / 'does-not-exist.txt')

	with pytest.raises(Exception):
		headFile(missing)
	with pytest.raises(Exception):
		tailFile(missing)
	with pytest.raises(Exception):
		getFileSize(missing)
	with pytest.raises(Exception):
		getFileInfo(missing)
	with pytest.raises(Exception):
		getFileHashFromPath(missing)
	with pytest.raises(Exception):
		moveFile(missing, str(edge / 'target.txt'))


def test_getFileSize_and_hash_empty_file(edge):
	path = str(edge / 'empty.txt')

	assert getFileSize(path) == 0
	assert getFileHashFromPath(path) == EMPTY_MD5


def test_getFileHashFromPath_and_FromStream_agree(edge):
	path = str(edge / 'crlf.txt')

	for algorithm in ('md5', 'sha1', 'sha256', 'sha512'):
		with open(path, 'rb') as stream:
			assert getFileHashFromPath(path, algorithm) == getFileHashFromStream(
				stream, algorithm
			)


def test_isFileExists_symlinks_are_followed(edge):
	# A symlink to an existing file resolves; a dangling one does not.
	assert isFileExists(str(edge / 'good.link')) is True
	assert isFileExists(str(edge / 'broken.link')) is False


def test_unicode_and_space_bearing_file_names(edge):
	assert isFileExists(str(edge / UNICODE_FILE_NAME)) is True
	assert getFileName(UNICODE_FILE_NAME) == '한글 파일 (1)'
	assert getFileExtension(UNICODE_FILE_NAME) == 'txt'
	assert getFileSize(str(edge / UNICODE_FILE_NAME)) == 2


def test_deleteFile_missing_path_is_a_noop(edge):
	deleteFile(str(edge / 'does-not-exist.txt'))
	deleteFile('')


def test_deleteAllFileFromDirectory_clears_nested_entries(edge):
	root = edge / 'nest'
	(root / 'sub').mkdir(parents=True)
	(root / 'top.txt').write_text('top')
	(root / 'sub' / 'inner.txt').write_text('inner')

	deleteAllFileFromDirectory(str(root))

	# Subdirectories are removed too, not just plain files.
	assert isFileExists(str(root)) is True
	assert isFileExists(str(root / 'top.txt')) is False
	assert isFileExists(str(root / 'sub')) is False


def test_deleteAllFileFromDirectory_missing_directory_is_a_noop(edge):
	deleteAllFileFromDirectory(str(edge / 'no-such-directory'))


def test_createFileWithDummy_exact_size(edge):
	for size in (1, 512, 4096):
		target = str(edge / f'dummy-{size}.bin')

		assert createFileWithDummy(target, size) is True
		assert getFileSize(target) == size

		deleteFile(target)


def test_createFileWithDummy_rejects_negative_size(edge):
	with pytest.raises(Exception):
		createFileWithDummy(str(edge / 'negative.bin'), -5)


def test_getFileInfo_field_level(edge):
	fileInfo = getFileInfo(str(edge / 'crlf.txt'))

	assert fileInfo['success'] is True
	assert fileInfo['isDirectory'] is False
	assert fileInfo['name'] == 'crlf'
	assert fileInfo['ext'] == 'txt'
	assert fileInfo['size'] == 21
	assert fileInfo['sizeHumanized'] == '21 Bytes'
	# `path` is always absolute even when a relative path is passed in.
	assert fileInfo['path'] == str(edge / 'crlf.txt')
	assert fileInfo['created'] > 0
	assert fileInfo['modified'] > 0

	directoryInfo = getFileInfo(str(edge))

	assert directoryInfo['success'] is True
	assert directoryInfo['isDirectory'] is True
	# A directory without a dot in its name has no extension.
	assert directoryInfo['ext'] is None


def test_getFileInfo_resolves_relative_path(edge, monkeypatch):
	monkeypatch.chdir(edge)

	fileInfo = getFileInfo('crlf.txt')

	assert fileInfo['name'] == 'crlf'
	assert fileInfo['ext'] == 'txt'
	assert fileInfo['path'].endswith('crlf.txt')
	assert fileInfo['path'] != 'crlf.txt'


def test_createDirectory_nested_and_idempotent(edge):
	nested = str(edge / 'a' / 'b' / 'c')

	createDirectory(nested)
	assert isFileExists(nested) is True

	# Re-creating an existing directory is a silent no-op.
	createDirectory(nested)
	assert isFileExists(nested) is True

	deleteFile(str(edge / 'a'))
	assert isFileExists(nested) is False


def test_getParentFilePath_relative_empty_and_trailing_separator():
	# A relative path keeps its parent segment instead of collapsing to root.
	assert getParentFilePath('relative/path') == '/relative'
	assert getParentFilePath('a/b/c') == '/a/b'
	# A single segment (and an empty path) has the root as its parent.
	assert getParentFilePath('a') == '/'
	assert getParentFilePath('') == '/'
	# Trailing separators are ignored, as in POSIX dirname(1).
	assert getParentFilePath('/home/user/') == '/home'
	assert getParentFilePath('/a/b/c/') == '/a/b'
	assert getParentFilePath('/a//b') == '/a'


def test_getParentFilePath_windows_relative_and_unc():
	assert getParentFilePath('relative\\path', True) == '\\relative'
	assert getParentFilePath('a', True) == '\\'
	assert getParentFilePath('', True) == '\\'
	assert getParentFilePath('C:\\Users\\', True) == 'C:\\'
	# The '\\\\' UNC prefix survives.
	assert getParentFilePath('\\\\net\\share\\file.txt', True) == '\\\\net\\share'


def test_toValidFilePath_resolves_dot_segments():
	assert toValidFilePath('/home/user/../test') == '/home/test'
	assert toValidFilePath('/a/./b') == '/a/b'
	# A path that collapses to nothing resolves to the root.
	assert toValidFilePath('.') == '/'
	assert toValidFilePath('C:\\a\\..\\b', True) == 'C:\\b'
	assert toValidFilePath('C:\\Windows\\..\\text.txt', True) == 'C:\\text.txt'
	assert toValidFilePath('.', True) == '\\'


def test_getFilePathLevel_trailing_separator_does_not_add_a_level():
	assert getFilePathLevel('/home/user/') == getFilePathLevel('/home/user')
	assert getFilePathLevel('/a/b//') == getFilePathLevel('/a/b')
	assert getFilePathLevel('C:\\Windows\\') == getFilePathLevel('C:\\Windows')
	assert getFilePathLevel('//') == 1


def test_createFileWithDummy_zero_size_creates_empty_file(edge):
	target = str(edge / 'zero.bin')

	assert createFileWithDummy(target, 0) is True
	assert isFileExists(target) is True
	assert getFileSize(target) == 0

	deleteFile(target)


def test_createDirectory_non_recursive_nested_raises(edge):
	with pytest.raises(Exception):
		createDirectory(str(edge / 'missing-parent' / 'child'), False)

	assert isFileExists(str(edge / 'missing-parent' / 'child')) is False


def test_moveFile_renames_within_same_directory(edge):
	source = str(edge / 'move-source.txt')
	target = str(edge / 'move-target.txt')

	(edge / 'move-source.txt').write_text('payload')
	moveFile(source, target)

	assert isFileExists(source) is False
	assert isFileExists(target) is True
	assert getFileSize(target) == 7

	deleteFile(target)
