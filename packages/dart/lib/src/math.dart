import 'dart:math';

/// Returns a random number (Between min and max).
int numRandom(int? min, int? max) {
  if (min == null && max == null) {
    return Random().nextBool() ? 1 : 0;
  }

  int limit = max ?? min!;
  int? offset = (max == null || (min != null && min >= max)) ? null : min;

  return (Random().nextInt((offset != null ? limit - offset + 1 : limit + 1)) +
          (offset ?? 0))
      .toInt();
}
