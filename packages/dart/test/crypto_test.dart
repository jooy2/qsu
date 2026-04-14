import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Crypto', () {
    test('objectId', () {
      expect(objectId().length, 24);
    });

    test('md5Hash', () {
      expect(md5Hash('test'), '098f6bcd4621d373cade4e832627b4f6');
      expect(md5Hash('test', encoding: BinaryToTextEncoding.hex),
          '098f6bcd4621d373cade4e832627b4f6');
      expect(md5Hash('test', encoding: BinaryToTextEncoding.base64),
          'CY9rzUYh03PK3k6DJie09g==');
      expect(md5Hash('test', encoding: BinaryToTextEncoding.base64url),
          'CY9rzUYh03PK3k6DJie09g==');
      expect(md5Hash('test', encoding: BinaryToTextEncoding.binary),
          '00001001100011110110101111001101010001100010000111010011011100111100101011011110010011101000001100100110001001111011010011110110');
      expect(md5Hash('qsu-md5'), '94af002364e42b514badb41b870ceb04');
    });

    test('sha1Hash', () {
      expect(sha1Hash('test'), 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
      expect(sha1Hash('test', encoding: BinaryToTextEncoding.base64),
          'qUqP5cyxm6YcTAhz05Hph5gvu9M=');
      expect(sha1Hash('qsu-sha1'), 'd81bc7ffbaed53cc8094dd2fe70cd5d4588aa0b1');
    });

    test('sha256Hash', () {
      expect(sha256Hash('test'),
          '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
      expect(sha256Hash('test', encoding: BinaryToTextEncoding.base64),
          'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=');
      expect(sha256Hash('qsu-sha256'),
          'c921e2216a342bad0a1b0dbe94027d69b3913f653a3878e3d5188a2c8551b51f');
    });

    test('sha512Hash', () {
      expect(sha512Hash('test'),
          'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff');
      expect(sha512Hash('test', encoding: BinaryToTextEncoding.base64),
          '7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==');
      expect(sha512Hash('qsu-sha512'),
          '22629d4da181d299e28abe986b55b066a3e2c062ccaab0f5d6f31be823f8f6b443d3d2a530ea2caf97cde89aacd1b5cbdddfd09758d05f1314414c6617ed5dc3');
    });

    test('encodeBase64', () {
      expect(encodeBase64('this is test'), 'dGhpcyBpcyB0ZXN0');
      expect(encodeBase64('1234567890Test'), 'MTIzNDU2Nzg5MFRlc3Q=');
    });

    test('decodeBase64', () {
      expect(decodeBase64('dGhpcyBpcyB0ZXN0'), 'this is test');
      expect(decodeBase64('MTIzNDU2Nzg5MFRlc3Q='), '1234567890Test');
    });

    test('numberHash', () {
      expect(numberHash(''), 0);
      expect(numberHash(' '), 32);
      expect(numberHash('abc'), 96354);
      expect(numberHash('Hello'), 69609650);
      expect(numberHash('hello'), 99162322);
      expect(numberHash('ABCDEFGHIJKLMNOPQRSTUVWXYZ' * 10000), 285059024);
    });
  });
}
