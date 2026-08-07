// Prefixed, because this library declares its own top-level `max` and `min`.
import 'dart:math' as math;

/// (Private) A single generator, reused. Creating a `Random` per draw is far more
/// expensive than drawing from it.
final math.Random _random = math.Random();

/// (Private) Last value handed out by [numUnique], so repeated calls never collide.
int _lastUniqueId = 0;

/// (Private) Multiplies a number by a power of ten by moving the exponent of its shortest
/// string representation, instead of multiplying by `10` raised to that power.
///
/// `1.005 * 100` is `100.49999999999999`, so the naive form answers `1` for
/// `round(1.005, 2)`, and `1.1 * 10` is `11.000000000000002`, so `ceil(1.1, 1)` answers
/// `1.2`. Parsing `'1.005e2'` yields exactly `100.5` instead, because the shortest
/// representation is the decimal the caller wrote and the parser rounds it to the nearest
/// double exactly once.
num _decimalShift(num value, int exponent) {
  final String text = value.toString();
  // A large or tiny number already stringifies with an exponent (`1e+21`), which has to be
  // folded into the new one rather than appended to it.
  final int exponentIndex = text.indexOf('e');
  final String base =
      exponentIndex == -1 ? text : text.substring(0, exponentIndex);
  final int currentExponent =
      exponentIndex == -1 ? 0 : int.parse(text.substring(exponentIndex + 1));

  return num.parse('${base}e${currentExponent + exponent}');
}

/// (Private) `num.parse` always answers with a `double` once an exponent is involved, so a
/// whole result is handed back as an `int`. Without this, `round(1234, -2)` would answer
/// `1200.0` where the JavaScript and Python implementations answer `1200`.
num _toWholeWhenExact(num value) {
  if (value is int || !value.isFinite || value != value.truncateToDouble()) {
    return value;
  }

  // Outside this range a double can no longer represent every integer, so converting would
  // claim a precision the value does not have.
  return value.abs() <= 9007199254740992.0 ? value.toInt() : value;
}

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

/// Rounds a number up, to the given number of decimal places. A negative [precision] rounds up to tens, hundreds and so on, so `ceil(6040, -2)` returns `6100`.
/// Rounding goes toward positive infinity, not away from zero, so a negative value rises: `ceil(-4.006)` returns `-4`.
/// The value is shifted through its shortest string representation rather than multiplied by a power of ten, so `ceil(1.1, 1)` returns `1.1` and not `1.2`.
/// `NaN` and the infinities are returned as they are.
/// This is the "always up" companion of [round]; [floor] is the "always down" one.
num ceil(num value, [int precision = 0]) {
  if (value is double && !value.isFinite) {
    return value;
  }

  final num shifted = _decimalShift(value, precision);

  // Already whole: a value as large as `1e21` cannot carry a fraction, and `num.ceil`
  // cannot answer with an `int` that far outside the 64-bit range.
  if (shifted is int || shifted == shifted.truncateToDouble()) {
    return _toWholeWhenExact(_decimalShift(shifted, -precision));
  }

  return _toWholeWhenExact(_decimalShift(shifted.ceil(), -precision));
}

/// Restricts a number to an inclusive range. Returns [min] when the value falls below it, [max] when it rises above it, and the value itself otherwise.
/// The upper bound is applied first and the lower bound second, so [min] wins when the two are passed the wrong way round: `clamp(5, 10, 1)` returns `10`.
/// The built-in `num.clamp` throws on an inverted range instead, so this function is shipped for parity with the JavaScript and Python implementations.
num clamp(num value, num min, num max) {
  final num upper = value > max ? max : value;

  return upper < min ? min : upper;
}

/// Rounds a number down, to the given number of decimal places. A negative [precision] rounds down to tens, hundreds and so on, so `floor(4060, -2)` returns `4000`.
/// Rounding goes toward negative infinity, not toward zero, so a negative value falls: `floor(-4.006)` returns `-5`.
/// The value is shifted through its shortest string representation rather than multiplied by a power of ten, so `floor(1.1, 1)` returns `1.1` and not `1.0`.
/// `NaN` and the infinities are returned as they are.
/// This is the "always down" companion of [round]; [ceil] is the "always up" one.
num floor(num value, [int precision = 0]) {
  if (value is double && !value.isFinite) {
    return value;
  }

  final num shifted = _decimalShift(value, precision);

  // Already whole: a value as large as `1e21` cannot carry a fraction, and `num.floor`
  // cannot answer with an `int` that far outside the 64-bit range.
  if (shifted is int || shifted == shifted.truncateToDouble()) {
    return _toWholeWhenExact(_decimalShift(shifted, -precision));
  }

  return _toWholeWhenExact(_decimalShift(shifted.floor(), -precision));
}

/// Returns after dividing all n arguments of numbers or the values of a single array of numbers.
double div(List<num> args) {
  double total = args[0].toDouble();

  for (var i = 1; i < args.length; i++) {
    total /= args[i];
  }

  return total;
}

/// Returns the largest of the given numbers. Like [sum], it takes a single array of numbers.
/// Values that are `NaN` are skipped, because `NaN` loses every comparison and would otherwise win by being seen first and then never being replaced.
/// When nothing is left to compare, `null` is returned.
/// This shadows `max` from `dart:math`, so a file that needs both has to import one of them with a prefix.
num? max(List<num> args) {
  num? result;

  for (var i = 0; i < args.length; i++) {
    final num value = args[i];

    if (value.isNaN) {
      continue;
    }

    if (result == null || value > result) {
      result = value;
    }
  }

  return result;
}

/// Returns after multiplying all n arguments of numbers or the values of a single array of numbers.
num mul(List<num> args) {
  num total = args[0];

  for (var i = 1; i < args.length; i++) {
    total *= args[i];
  }

  return total;
}

/// Rounds a number to the given number of decimal places. A negative [precision] rounds to tens, hundreds and so on, so `round(1234, -2)` returns `1200`.
/// Ties round half away from zero, so `0.5` becomes `1` and `-0.5` becomes `-1`. The three languages disagree natively, and Lodash sends ties toward positive infinity, so this is a parity fix first and a precision helper second.
/// The value is shifted through its shortest string representation rather than multiplied by a power of ten, so `round(1.005, 2)` returns `1.01` and not `1`.
/// `NaN` and the infinities are returned as they are.
/// To round up or down instead of to the nearest value, use [ceil] and [floor], which take the same arguments.
num round(num value, [int precision = 0]) {
  if (value is double && !value.isFinite) {
    return value;
  }

  final num shifted = _decimalShift(value, precision);

  // Already whole: a value as large as `1e21` cannot carry a fraction, and `num.round`
  // cannot answer with an `int` that far outside the 64-bit range.
  if (shifted is int || shifted == shifted.truncateToDouble()) {
    return _toWholeWhenExact(_decimalShift(shifted, -precision));
  }

  // `num.round` already sends ties away from zero, unlike JavaScript's `Math.round`, which
  // sends them toward positive infinity.
  return _toWholeWhenExact(_decimalShift(shifted.round(), -precision));
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
