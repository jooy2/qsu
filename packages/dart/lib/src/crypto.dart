import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:pointycastle/export.dart' as pc;

/// (Private) A single generator, reused. Creating a `Random` per draw is far more
/// expensive than drawing from it.
final Random _random = Random();

/// (Private) convert digest to specify encoding
String _convertDigestTo(Digest digest, BinaryToTextEncoding? encoding) {
  switch (encoding) {
    // Treat a `null` encoding as the default rather than an error, matching the
    // JavaScript and Python implementations.
    case null:
    case BinaryToTextEncoding.hex:
      return digest.toString(); // 기본값: hex 문자열
    case BinaryToTextEncoding.base64:
      return base64.encode(digest.bytes);
    case BinaryToTextEncoding.base64url:
      // Unpadded, like Node's `digest('base64url')` and Python's `urlsafe_b64encode`.
      return base64Url.encode(digest.bytes).replaceAll('=', '');
    case BinaryToTextEncoding.binary:
      // The raw bytes as latin-1 characters, like Node's `digest('binary')` and
      // Python's `digest().decode('latin-1')` — not a string of 0s and 1s.
      return latin1.decode(digest.bytes);
  }
}

/// Returns a random string hash of the ObjectId format (primarily utilized by MongoDB).
String objectId() {
  return (DateTime.now().millisecondsSinceEpoch ~/ 1000).toRadixString(16) +
      List.generate(16, (index) {
        return _random.nextInt(16).toRadixString(16);
      }).join();
}

/// Converts String data to md5 hash value and returns it.
String md5Hash(String str,
    {BinaryToTextEncoding? encoding = BinaryToTextEncoding.hex}) {
  return _convertDigestTo(md5.convert(utf8.encode(str)), encoding);
}

/// Converts String data to sha1 hash value and returns it.
String sha1Hash(String str,
    {BinaryToTextEncoding? encoding = BinaryToTextEncoding.hex}) {
  return _convertDigestTo(sha1.convert(utf8.encode(str)), encoding);
}

/// Converts String data to sha256 hash value and returns it.
String sha256Hash(String str,
    {BinaryToTextEncoding? encoding = BinaryToTextEncoding.hex}) {
  return _convertDigestTo(sha256.convert(utf8.encode(str)), encoding);
}

/// Converts String data to sha512 hash value and returns it.
String sha512Hash(String str,
    {BinaryToTextEncoding? encoding = BinaryToTextEncoding.hex}) {
  return _convertDigestTo(sha512.convert(utf8.encode(str)), encoding);
}

/// Base64-encode the given string.
String encodeBase64(String str) {
  return base64Encode(utf8.encode(str));
}

/// Decodes an encoded base64 string to a plain string.
String decodeBase64(String encodedStr) {
  return utf8.decode(base64Decode(encodedStr));
}

/// Returns the specified string as a hash value of type number.
/// The return value can also be negative.
int numberHash(String str) {
  if (str.isEmpty) {
    return 0;
  }

  int hash = 0;

  for (int i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.codeUnitAt(i);
    // Keep the low 32 bits and read them as signed, like JavaScript's `hash |= 0`.
    // Masking alone made the result unsigned, so it never went negative and diverged
    // from the JavaScript and Python implementations.
    hash &= 0xFFFFFFFF;

    if (hash >= 0x80000000) {
      hash -= 0x100000000;
    }
  }

  return hash;
}

enum BinaryToTextEncoding { hex, base64, base64url, binary }

/// (Private) Modes that produce an authentication tag, which decrypting needs,
/// so the tag is carried alongside the ciphertext.
const List<String> _aeadModes = <String>['gcm'];

/// (Private) Modes that need the plaintext padded to a whole number of blocks.
const List<String> _paddedModes = <String>['cbc'];

const int _blockSizeBytes = 16;
const int _authTagBits = 128;

/// (Private) A generator the operating system seeds, for the initialisation
/// vector. The one above is not fit for this.
final Random _secureRandom = Random.secure();

/// (Private) Split an `aes-<bits>-<mode>` name and check the key against it.
(Uint8List, String) _parseAlgorithm(String algorithm, String secret) {
  final List<String> parts = algorithm.toLowerCase().split('-');

  if (parts.length != 3 ||
      parts[0] != 'aes' ||
      int.tryParse(parts[1]) == null) {
    throw ArgumentError('Unsupported algorithm: $algorithm');
  }

  final Uint8List key = Uint8List.fromList(utf8.encode(secret));

  if (key.length * 8 != int.parse(parts[1])) {
    throw ArgumentError('Invalid key length');
  }

  return (key, parts[2]);
}

/// (Private) The cipher for one mode, ready to run in [forEncryption].
pc.BlockCipher _blockCipher(String mode) {
  switch (mode) {
    case 'cbc':
      return pc.PaddedBlockCipherImpl(
          pc.PKCS7Padding(), pc.CBCBlockCipher(pc.AESEngine()));
    case 'gcm':
      return pc.GCMBlockCipher(pc.AESEngine());
    case 'ofb':
      return pc.OFBBlockCipher(pc.AESEngine(), _blockSizeBytes);
    case 'cfb':
      return pc.CFBBlockCipher(pc.AESEngine(), _blockSizeBytes);
    default:
      throw ArgumentError('Unsupported algorithm mode: $mode');
  }
}

/// (Private) Run one of the modes over [data], whichever shape it takes.
Uint8List _cipher(String mode, Uint8List key, Uint8List iv, Uint8List data,
    {required bool forEncryption, Uint8List? authTag}) {
  if (mode == 'ctr') {
    return (pc.CTRStreamCipher(pc.AESEngine())
          ..init(forEncryption,
              pc.ParametersWithIV<pc.KeyParameter>(pc.KeyParameter(key), iv)))
        .process(data);
  }

  final pc.BlockCipher cipher = _blockCipher(mode);

  if (mode == 'gcm') {
    cipher.init(
        forEncryption,
        pc.AEADParameters<pc.KeyParameter>(
            pc.KeyParameter(key), _authTagBits, iv, Uint8List(0)));

    // The tag rides at the end of the buffer this implementation works on,
    // where the other packages keep it beside the ciphertext.
    return cipher.process(
        forEncryption ? data : Uint8List.fromList(<int>[...data, ...?authTag]));
  }

  final pc.ParametersWithIV<pc.KeyParameter> parameters =
      pc.ParametersWithIV<pc.KeyParameter>(pc.KeyParameter(key), iv);

  if (_paddedModes.contains(mode)) {
    cipher.init(
        forEncryption,
        pc.PaddedBlockCipherParameters<pc.CipherParameters,
            pc.CipherParameters>(parameters, null));

    return cipher.process(data);
  }

  cipher.init(forEncryption, parameters);

  // OFB and CFB are stream modes riding on a block cipher, so the tail that
  // does not fill a block is processed against a padded block and then cut
  // back to the length it came in at.
  final Uint8List out = Uint8List(data.length);
  int offset = 0;

  while (data.length - offset >= _blockSizeBytes) {
    cipher.processBlock(data, offset, out, offset);
    offset += _blockSizeBytes;
  }

  if (offset < data.length) {
    final Uint8List block = Uint8List(_blockSizeBytes)
      ..setRange(0, data.length - offset, data, offset);
    final Uint8List result = Uint8List(_blockSizeBytes);

    cipher.processBlock(block, 0, result, 0);
    out.setRange(offset, data.length, result);
  }

  return out;
}

String _encodeBytes(Uint8List value, bool toBase64) => toBase64
    ? base64.encode(value)
    : value.map((int byte) => byte.toRadixString(16).padLeft(2, '0')).join();

Uint8List _decodeBytes(String value, bool toBase64) {
  if (toBase64) {
    return base64.decode(value);
  }

  return Uint8List.fromList(<int>[
    for (int at = 0; at + 1 < value.length; at += 2)
      int.parse(value.substring(at, at + 2), radix: 16),
  ]);
}

/// Encrypt [str] with [secret], returning `iv:encrypted` as hex, or
/// `iv:authTag:encrypted` for a mode that authenticates. [algorithm] is
/// `aes-<bits>-<mode>`, where the mode is one of `cbc`, `gcm`, `ctr`, `ofb` and
/// `cfb`, and the key's byte length has to match the bits in the name.
///
/// The initialisation vector is drawn fresh on every call, so the same text
/// does not encrypt to the same string twice.
String encrypt(String? str, String secret,
    {String algorithm = 'aes-256-cbc',
    int ivSize = 16,
    bool toBase64 = false}) {
  if (str == null || str.isEmpty) {
    return '';
  }

  final (Uint8List key, String mode) = _parseAlgorithm(algorithm, secret);
  final Uint8List iv = Uint8List.fromList(
      List<int>.generate(ivSize, (int index) => _secureRandom.nextInt(256)));
  final Uint8List data = Uint8List.fromList(utf8.encode(str));
  final Uint8List processed = _cipher(mode, key, iv, data, forEncryption: true);

  if (_aeadModes.contains(mode)) {
    final int cut = processed.length - _blockSizeBytes;

    return '${_encodeBytes(iv, toBase64)}'
        ':${_encodeBytes(processed.sublist(cut), toBase64)}'
        ':${_encodeBytes(processed.sublist(0, cut), toBase64)}';
  }

  return '${_encodeBytes(iv, toBase64)}:${_encodeBytes(processed, toBase64)}';
}

/// Decrypt what [encrypt] returned, with the same [secret] and [algorithm].
String decrypt(String? str, String secret,
    {String algorithm = 'aes-256-cbc', bool toBase64 = false}) {
  if (str == null || str.isEmpty) {
    return '';
  }

  final (Uint8List key, String mode) = _parseAlgorithm(algorithm, secret);
  final bool isAead = _aeadModes.contains(mode);
  final List<String> parts = str.split(':');

  if (parts.length < (isAead ? 3 : 2)) {
    throw ArgumentError(isAead
        ? '`str` must be in the `iv:authTag:encrypted` format returned by `encrypt`.'
        : '`str` must be in the `iv:encrypted` format returned by `encrypt`.');
  }

  final Uint8List iv = _decodeBytes(parts.removeAt(0), toBase64);
  final Uint8List? authTag =
      isAead ? _decodeBytes(parts.removeAt(0), toBase64) : null;
  final Uint8List data = _decodeBytes(parts.join(':'), toBase64);

  return utf8.decode(
      _cipher(mode, key, iv, data, forEncryption: false, authTag: authTag));
}
