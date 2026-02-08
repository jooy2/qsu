import 'dart:math';

/// Returns a randomly selected number between the min and max values.
int numPick(int? min, int? max) {
  if (min == null && max == null) {
    return Random().nextBool() ? 1 : 0;
  }

  int limit = max ?? min!;
  int? offset = (max == null || (min != null && min >= max)) ? null : min;

  return (Random().nextInt((offset != null ? limit - offset + 1 : limit + 1)) + (offset ?? 0))
      .toInt();
}

/// Returns a unique number combining a timestamp and a random number.
int numUnique() {
  return int.parse('${DateTime.now().millisecondsSinceEpoch}${Random().nextInt(89999) + 10000}');
}
