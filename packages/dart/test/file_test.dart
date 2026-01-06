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
      expect(getFileName('C:\\Users\\test\\Desktop\\text.txt'), 'text');
      expect(getFileName('/home/user/Desktop/example.txt'), 'example');
      expect(
          getFileName('C:\\example.txt', withExtension: true), 'example.txt');
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
      expect(isValidFileName('hello.:txt', unixType: true), true);
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
}
