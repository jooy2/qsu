import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

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
  });
}
