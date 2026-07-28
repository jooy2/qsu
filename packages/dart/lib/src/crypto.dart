import 'dart:convert';
import 'dart:math';

import 'package:crypto/crypto.dart';

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
