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
	assert isValidFileName('hello.:txt', True) is True
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
