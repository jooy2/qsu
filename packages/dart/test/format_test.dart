import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Format', () {
    test('numberFormat', () {
      expect(numberFormat(1234), '1,234');
      expect(numberFormat(12345678), '12,345,678');
      expect(numberFormat('12345'), '12,345');
      expect(numberFormat(123456.123), '123,456.123');
      expect(numberFormat('12.345'), '12.345');
      expect(numberFormat('12345.1'), '12,345.1');
      expect(numberFormat(1.2), '1.2');
      expect(numberFormat(0), '0');
      expect(numberFormat(-123456), '-123,456');
    });

    test('fileName', () {
      expect(fileName('C:\\Users\\test\\Desktop\\text.txt'), 'text');
      expect(fileName('/home/user/Desktop/example.txt'), 'example');
      expect(fileName('C:\\example.txt', true), 'example.txt');
    });

    test('fileSize', () {
      expect(fileSize(1), '1 Bytes');
      expect(fileSize(1000000), '976.56 KB');
      expect(fileSize(2000, decimals: 3), '1.953 KB');
      expect(fileSize(250000000), '238.42 MB');
    });

    test('fileExt', () {
      expect(fileExt('C:\\Users\\test\\Desktop\\text.txt'), 'txt');
      expect(fileExt('hello.html'), 'html');
      expect(fileExt('this.is.file.PNG'), 'png');
      expect(fileExt('no-ext'), 'Unknown');
    });

    test('safeParseInt', () {
      expect(safeParseInt(null), 0);
      expect(safeParseInt('', fallback: -1), -1);
      expect(safeParseInt('0001234'), 1234);
      expect(safeParseInt('1.234.567'), 1);
      expect(safeParseInt('1234', fallback: 10), 1234);
      expect(safeParseInt('1234', fallback: 0, radix: 16), 4660);
    });

    test('safeJSONParse', () {
      expect(safeJSONParse({}), {});
      expect(safeJSONParse('{}'), {});
      expect(safeJSONParse(''), {});
      expect(safeJSONParse(null), {});
      expect(safeJSONParse('{"a":1,"b":2}'), {'a': 1, 'b': 2});
      expect(safeJSONParse('{"a":{"aa":1},"b":null}'), {
        'a': {'aa': 1},
        'b': null
      });
    });
  });
}
