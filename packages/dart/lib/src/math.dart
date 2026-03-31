import 'dart:math';

/// Returns a randomly selected number between the min and max values.
int numPick(int? min, int? max) {
  if (min == null && max == null) {
    return Random().nextBool() ? 1 : 0;
  }

  int limit = max ?? min!;
  int? offset = (max == null || (min != null && min >= max)) ? null : min;

  return (Random().nextInt((offset != null ? limit - offset + 1 : limit + 1)) +
          (offset ?? 0))
      .toInt();
}

/// Returns a unique number combining a timestamp and a random number.
int numUnique() {
  return int.parse(
      '${DateTime.now().millisecondsSinceEpoch}${Random().nextInt(89999) + 10000}');
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
