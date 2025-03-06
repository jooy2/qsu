import 'dart:convert';
import 'dart:math';

import 'package:crypto/crypto.dart';

/// Returns a random string hash of the ObjectId format (primarily utilized by MongoDB).
String objectId() {
  return (DateTime.now().millisecondsSinceEpoch ~/ 1000).toRadixString(16) +
      List.generate(16, (index) {
        return Random().nextInt(16).toRadixString(16);
      }).join();
}

/// Converts String data to md5 hash value and returns it.
String md5Hash(String str) {
  return md5.convert(utf8.encode(str)).toString();
}

/// Converts String data to sha1 hash value and returns it.
String sha1Hash(String str) {
  return sha1.convert(utf8.encode(str)).toString();
}

/// Converts String data to sha256 hash value and returns it.
String sha256Hash(String str) {
  return sha256.convert(utf8.encode(str)).toString();
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
int strToNumberHash(String str) {
  if (str.isEmpty) {
    return 0;
  }

  int hash = 0;

  for (int i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.codeUnitAt(i);
    hash &= 0xFFFFFFFF;
  }

  return hash;
}
