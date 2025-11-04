import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

const longFilePath =
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\115.0.1901.203\\Trust Protection Lists';
const testTargetPath = 'test/_resources/files';

void main() {
  group('File', () {
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
      expect(getFileExtension('txt', isWindows: true), null);
      expect(getFileExtension('txt.png', isWindows: true), 'png');
      expect(getFileExtension('/home/txt.txt'), 'txt');
      expect(getFileExtension('/home/txt.abc.png'), 'png');
      expect(getFileExtension('C:\\test\\txt.png', isWindows: true), 'png');
      expect(getFileExtension('C:\\test.hello.sample\\txt', isWindows: true),
          null);
      expect(
          getFileExtension('C:\\test.hello.sample\\txt.txt', isWindows: true),
          'txt');
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

    test('getFilePathLevel', () {
      expect(getFilePathLevel('C:'), 1);
      expect(getFilePathLevel('C:\\'), 1);
      expect(getFilePathLevel('C:\\Windows\\System32'), 3);
      expect(getFilePathLevel(longFilePath), 7);
      expect(getFilePathLevel('/'), 1);
      expect(getFilePathLevel('/home/user'), 3);
      expect(getFilePathLevel('/home/user/.ssh/test file.txt'), 5);
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
  });
}
