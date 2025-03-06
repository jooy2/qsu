import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Crypto', () {
    test('objectId', () {
      expect(objectId().length, 24);
    });

    test('md5Hash', () {
      expect(md5Hash('test'), '098f6bcd4621d373cade4e832627b4f6');
      expect(md5Hash('qsu-md5'), '94af002364e42b514badb41b870ceb04');
    });

    test('sha1Hash', () {
      expect(sha1Hash('test'), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
      expect(sha1Hash('qsu-md5'), 'e5c5dc3b2be3542475671d460f906c3b176bb5bf');
    });

    test('sha256Hash', () {
      expect(sha256Hash('test'),
          '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
      expect(sha256Hash('qsu-md5'),
          '8c4cfec3ec79dc572958ea7f0e3cfd24b90d174969df9a4773b37b68498871ed');
    });

    test('encodeBase64', () {
      expect(encodeBase64('this is test'), 'dGhpcyBpcyB0ZXN0');
      expect(encodeBase64('1234567890Test'), 'MTIzNDU2Nzg5MFRlc3Q=');
    });

    test('decodeBase64', () {
      expect(decodeBase64('dGhpcyBpcyB0ZXN0'), 'this is test');
      expect(decodeBase64('MTIzNDU2Nzg5MFRlc3Q='), '1234567890Test');
    });

    test('strToNumberHash', () {
      expect(strToNumberHash(''), 0);
      expect(strToNumberHash(' '), 32);
      expect(strToNumberHash('abc'), 96354);
      expect(strToNumberHash('Hello'), 69609650);
      expect(strToNumberHash('hello'), 99162322);
      expect(strToNumberHash('ABCDEFGHIJKLMNOPQRSTUVWXYZ' * 10000), 285059024);
    });
  });
}
