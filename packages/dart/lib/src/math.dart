import 'dart:math';

/// (Private) A single generator, reused. Creating a `Random` per draw is far more
/// expensive than drawing from it.
final Random _random = Random();

/// (Private) Last value handed out by [numUnique], so repeated calls never collide.
int _lastUniqueId = 0;

/// Returns a randomly selected number between the min and max values.
int numPick(int? min, int? max) {
  if (min == null && max == null) {
    return _random.nextBool() ? 1 : 0;
  }

  int limit = max ?? min!;
  int? offset = (max == null || (min != null && min >= max)) ? null : min;

  return (_random.nextInt((offset != null ? limit - offset + 1 : limit + 1)) +
          (offset ?? 0))
      .toInt();
}

/// Returns a unique number based on the current timestamp.
///
/// Milliseconds * 1000 leaves room for a per-millisecond sequence, so repeated calls
/// within a process always return a new, strictly increasing value. Uniqueness is only
/// guaranteed within one process, and the value is sequential and therefore predictable,
/// so it must not be used for anything security related.
int numUnique() {
  final int id = DateTime.now().millisecondsSinceEpoch * 1000;

  // Always move forward: within the same millisecond, and even if the clock steps back.
  _lastUniqueId = id > _lastUniqueId ? id : _lastUniqueId + 1;

  return _lastUniqueId;
}

/// Restricts a number to an inclusive range. Returns [min] when the value falls below it, [max] when it rises above it, and the value itself otherwise.
/// The upper bound is applied first and the lower bound second, so [min] wins when the two are passed the wrong way round: `clamp(5, 10, 1)` returns `10`.
/// The built-in `num.clamp` throws on an inverted range instead, so this function is shipped for parity with the JavaScript and Python implementations.
num clamp(num value, num min, num max) {
  final num upper = value > max ? max : value;

  return upper < min ? min : upper;
}

/// Returns after dividing all n arguments of numbers or the values of a single array of numbers.
double div(List<num> args) {
  double total = args[0].toDouble();

  for (var i = 1; i < args.length; i++) {
    total /= args[i];
  }

  return total;
}

/// Returns after multiplying all n arguments of numbers or the values of a single array of numbers.
num mul(List<num> args) {
  num total = args[0];

  for (var i = 1; i < args.length; i++) {
    total *= args[i];
  }

  return total;
}

/// Returns after subtracting all n arguments of numbers or the values of a single array of numbers.
num sub(List<num> args) {
  num total = args[0];

  for (var i = 1; i < args.length; i++) {
    total -= args[i];
  }

  return total;
}

/// Returns after adding up all the n arguments of numbers or the values of a single array of numbers.
num sum(List<num> args) {
  num total = 0;

  for (var i = 0; i < args.length; i++) {
    total += args[i];
  }

  return total;
}
