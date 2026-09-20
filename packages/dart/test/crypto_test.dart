import 'dart:convert';

import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

/// Decode a hex digest into bytes, so `binary` expectations can be written as the
/// digest itself rather than an opaque latin-1 literal.
List<int> hexToBytes(String hex) => [
      for (int i = 0; i < hex.length; i += 2)
        int.parse(hex.substring(i, i + 2), radix: 16)
    ];

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
      // base64url is unpadded, matching Node's `digest('base64url')` and Python's
      // `urlsafe_b64encode(...).rstrip('=')`.
      expect(md5Hash('test', encoding: BinaryToTextEncoding.base64url),
          'CY9rzUYh03PK3k6DJie09g');
      // `binary` is the raw digest as latin-1 characters, not a string of 0s and 1s.
      expect(md5Hash('test', encoding: BinaryToTextEncoding.binary),
          latin1.decode(hexToBytes('098f6bcd4621d373cade4e832627b4f6')));
      // A null encoding falls back to hex instead of throwing.
      expect(
          md5Hash('test', encoding: null), '098f6bcd4621d373cade4e832627b4f6');
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

    test('encrypt / decrypt', () {
      const String secret = '12345678901234567890123456789012';
      const String text = 'hello qsu, a message longer than one block';

      // Every mode round-trips, in both encodings. The ciphertext these produce
      // is the same one the JavaScript and Python packages produce, which is
      // what lets a value cross between them.
      for (final String mode in <String>['cbc', 'gcm', 'ctr', 'ofb', 'cfb']) {
        for (final bool toBase64 in <bool>[false, true]) {
          final String algorithm = 'aes-256-$mode';
          final String encrypted = encrypt(text, secret,
              algorithm: algorithm,
              ivSize: mode == 'gcm' ? 12 : 16,
              toBase64: toBase64);

          expect(
              decrypt(encrypted, secret,
                  algorithm: algorithm, toBase64: toBase64),
              text);
          // An authenticating mode carries its tag between the two.
          expect(encrypted.split(':').length, mode == 'gcm' ? 3 : 2);
        }
      }

      // A fresh initialisation vector every time, so the same text does not
      // encrypt to the same string twice.
      expect(encrypt(text, secret), isNot(encrypt(text, secret)));
      expect(encrypt('', secret), '');
      expect(decrypt('', secret), '');
    });

    test('decrypt reads what the other packages wrote', () {
      const String secret = '12345678901234567890123456789012';

      // Produced by the JavaScript package with the same key.
      expect(
          decrypt(
              '61ba43b65fc3fc2bdbd0d1ad8576344d'
              ':1831d7c37d12b3bf7ee73195d31af91b',
              secret),
          'test');
    });

    test('encrypt rejects a key or a name it cannot use', () {
      const String secret = '12345678901234567890123456789012';

      expect(() => encrypt('a', secret, algorithm: 'aes-999-cbc'),
          throwsArgumentError);
      expect(() => encrypt('a', secret, algorithm: 'des-256-cbc'),
          throwsArgumentError);
      expect(() => encrypt('a', secret, algorithm: 'aes-256-xyz'),
          throwsArgumentError);
      // The key has to be as long as the name says.
      expect(() => encrypt('a', 'short', algorithm: 'aes-256-cbc'),
          throwsArgumentError);
      // `decrypt` needs the shape `encrypt` returns.
      expect(() => decrypt('no-colon-here', secret), throwsArgumentError);
    });
  });
}
