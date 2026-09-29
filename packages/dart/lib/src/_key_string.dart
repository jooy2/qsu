/// (Private to the package, not exported) The text a value becomes when it is used as a key,
/// written as JavaScript's `String()` writes it, so that `objInvert` and `arrGroupBy` name a
/// key the same way in all three packages.
///
/// Dart already writes a `double` the way JavaScript does, exponent notation from `1e21` and
/// below `1e-6` included, except that it keeps a trailing `.0` on a whole number and writes
/// `-0.0` for zero. JavaScript has no int/double distinction, so `1.0` is `'1'` there.
String toKeyString(Object? value) {
  if (value is double && value.isFinite && value == value.truncateToDouble()) {
    if (value == 0) {
      return '0';
    }

    final String text = value.toString();

    return text.endsWith('.0') ? text.substring(0, text.length - 2) : text;
  }

  return '$value';
}
