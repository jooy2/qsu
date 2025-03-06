/// Check whether the given data is of type `Object`.
/// Returns `false` for other data types including `Array`.
bool isObject(dynamic data) {
  return data != null && data is Map;
}

/// It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.
bool isEqual(dynamic leftOperand, [dynamic right1, dynamic right2]) {
  if (right1 == null && right2 == null) {
    return true;
  }

  final List<dynamic> rightOperands;

  if (right2 == null) {
    rightOperands = (right1 is List) ? right1 : [right1];
  } else {
    rightOperands = [right1, right2];
  }

  for (var item in rightOperands) {
    if (leftOperand == item) {
      continue;
    } else if (leftOperand is num && item is String) {
      final parsed = num.tryParse(item);

      if (parsed == null || parsed != leftOperand) {
        return false;
      }
    } else if (leftOperand is String && item is num) {
      final parsed = num.tryParse(leftOperand);

      if (parsed == null || parsed != item) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

/// It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.
/// `isEqual` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.
bool isEqualStrict(dynamic leftOperand, [dynamic right1, dynamic right2]) {
  if (right1 == null && right2 == null) {
    return true;
  }

  final List<dynamic> rightOperands;

  if (right2 == null) {
    rightOperands = (right1 is List) ? right1 : [right1];
  } else {
    rightOperands = [right1, right2];
  }

  for (var item in rightOperands) {
    if (leftOperand == item) {
      continue;
    } else if (leftOperand is num && item is String ||
        leftOperand is String && item is num) {
      return false;
    } else {
      return false;
    }
  }
  return true;
}

/// Returns true if the passed data is empty or has a length of 0.
bool isEmpty(dynamic data) {
  if (data == null) {
    return true;
  }
  if (data is String) {
    return data.isEmpty;
  }
  if (data is List) {
    return data.isEmpty;
  }
  if (data is Map) {
    return data.isEmpty;
  }

  return false;
}

/// Returns `true` if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is `true`, it returns true only for an exact match.
bool contains(dynamic str, dynamic search, {bool exact = false}) {
  if (search.runtimeType == String) {
    return str.length < 1 ? false : str.indexOf(search) != -1;
  }

  for (int i = 0, iLen = search.length; i < iLen; i += 1) {
    if (exact) {
      if (str == search[i]) {
        return true;
      }
    } else if (str.indexOf(search[i]) != -1) {
      return true;
    }
  }

  return false;
}

/// Returns `true` if the given data is in the correct URL format.
/// If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist.
/// If strict is `true`, URLs without commas (`.`) return `false`.
bool isUrl(String url, {bool withProtocol = false, bool strict = false}) {
  if (strict && !url.contains('.')) {
    return false;
  }

  final formattedUrl =
      (withProtocol && !url.contains('://')) ? 'https://$url' : url;

  try {
    final uri = Uri.parse(formattedUrl);

    if (uri.scheme.isEmpty || uri.host.isEmpty) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

/// Returns `true` if the given array is a two-dimensional array.
bool is2dArray(List<dynamic> array) {
  return array.any((element) => element is List);
}

/// Checks if the given argument value is a valid email.
bool isEmail(String email) {
  return RegExp(
          r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
      .hasMatch(email);
}

/// Returns `true` if the first argument is in the range of the second argument (`[min, max]`).
/// To allow the minimum and maximum values to be in the range, pass `true` for the third argument.
bool between(List<num> range, num number, {bool inclusive = false}) {
  final minM = range.reduce((a, b) => a < b ? a : b);
  final maxM = range.reduce((a, b) => a > b ? a : b);

  return inclusive
      ? (number >= minM && number <= maxM)
      : (number > minM && number < maxM);
}

/// Returns the length of any type of data. If the argument value is `null` or `undefined`, `0` is returned.
int len(dynamic data) {
  if (data == null) {
    return 0;
  }

  if (data is List) {
    return data.length;
  } else if (data is Map) {
    return data.keys.length;
  } else if (data is num || data is BigInt) {
    return data.toString().length;
  } else if (data is bool) {
    return data ? 4 : 5;
  } else if (data is Function) {
    return data().toString().length;
  } else if (data is String) {
    return data.length;
  } else {
    return 0;
  }
}

/// Returns `true` if the values given in the `conditions` array are true at least `minimumCount` times.
bool isTrueMinimumNumberOfTimes(List<bool> conditions, {int? minimumCount}) {
  final int conditionLength = conditions.length;
  int trueCount = 0;

  for (int i = 0; i < conditionLength; i++) {
    if (conditions[i]) {
      trueCount += 1;
    }
  }

  return trueCount >= (minimumCount ?? 1);
}
