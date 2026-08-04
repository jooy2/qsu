import 'dart:convert';
import 'dart:math';

import 'package:collection/collection.dart';
import 'package:qsu/src/verify.dart';

/// Shuffle the order of the given array and return.
List<T> arrShuffle<T>(List<T> array) {
  if (array.length == 1) {
    return array;
  }

  final List<T> newArray = List.from(array);

  for (int i = newArray.length - 1; i > 0; i--) {
    int j = Random().nextInt(i + 1);
    T temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray;
}

/// Initialize an array with a default value of a specific length.
List<dynamic> arrWithDefault(dynamic defaultValue, int length) {
  if (length < 1) {
    return [];
  }

  return List.filled(length, defaultValue);
}

/// Creates and returns an Array in the order of start...end values.
List<int> arrWithNumber(int start, int end) {
  if (start > end) {
    throw ArgumentError('`end` is greater than `start`.');
  }

  return List<int>.generate(end - start + 1, (index) => start + index);
}

/// Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed.
List<dynamic> arrUnique(List<dynamic> array) {
  if (is2dArray(array)) {
    final Set<String> jsonSet = <String>{};
    final List<dynamic> result = <dynamic>[];

    for (dynamic item in array) {
      final String jsonString = jsonEncode(item);

      if (jsonSet.add(jsonString)) {
        result.add(jsonDecode(jsonString));
      }
    }

    return result;
  } else {
    return array.toSet().toList();
  }
}

/// Returns the average of all numeric values in an array.
double average(List<double> array) {
  return array.reduce((p, c) => p + c) / array.length;
}

/// Moves the position of a specific element in an array to the specified position. (Position starts from 0.)
List<dynamic> arrMove(List<dynamic> array, int from, int to) {
  final int arrayLength = array.length;

  if (arrayLength <= from || arrayLength <= to) {
    throw Exception('Invalid move params');
  }

  // Move within a copy so the caller's list is left untouched.
  final List<dynamic> newArray = List<dynamic>.from(array);
  final dynamic item = newArray.removeAt(from);

  newArray.insert(to, item);

  return newArray;
}

/// Merges all elements of a multidimensional array into a one-dimensional array.
List<dynamic> arrTo1dArray(List<dynamic> array) {
  List<dynamic> convert1dArray(List<dynamic> arr) {
    final List<dynamic> tempArr = [];
    final int arrayLength = arr.length;

    for (int i = 0; i < arrayLength; i++) {
      if (arr[i] is! List) {
        tempArr.add(arr[i]);
      } else if (is2dArray(arr[i])) {
        tempArr.addAll(convert1dArray(arr[i]));
      } else {
        tempArr.addAll(arr[i]);
      }
    }

    return tempArr;
  }

  return convert1dArray(array);
}

/// Repeats the data of an `Array` or `Map` a specific number of times and returns it as a 1d array.
List<dynamic> arrRepeat(dynamic array, int count) {
  if (array.isEmpty || count < 1) {
    return [];
  }

  List<dynamic> result = [];

  for (int i = 0; i < count; i++) {
    if (array is Map) {
      result.add(array);
    } else {
      result.addAll(array);
    }
  }

  return result;
}

/// Returns a random item from the given array. If the array is empty or is not an array, it returns `null`.
T? arrPick<T>(List<T>? array) {
  if (array == null || array.isEmpty) {
    return null;
  }

  return array[Random().nextInt(array.length)];
}

/// Returns the number of duplicates for each unique value in the given array.
/// The array values can only be of type `String` or `Number`.
Map<String, int> arrCount(List<dynamic> array) {
  final Map<String, int> result = {};

  for (var i = 0; i < array.length; i++) {
    String x = array[i].toString();

    result[x] = (result[x] ?? 0) + 1;
  }

  return result;
}

/// Separates the data in the given array into a two-dimensional array containing only the maximum number of elements.
/// For example, if you have an array of 6 data in 2 groups, this function will create a 2-dimensional array with 3 lengths.
List<List<T>> arrGroupByMaxCount<T>(List<T> array, int maxLengthPerGroup) {
  List<List<T>> result = [];
  List<T> tempArray = [];

  for (int i = 0; i < array.length; i++) {
    if (tempArray.length == maxLengthPerGroup) {
      result.add(tempArray);
      tempArray = [];
    }
    tempArray.add(array[i]);
  }

  if (tempArray.isNotEmpty) {
    result.add(tempArray);
  }

  return result;
}

/// When sorting an array consisting of strings, it sorts first by the numbers contained in the strings, not by their names. For example, given the array `['1-a', '100-a', '10-a', '2-a']`, it returns `['1-a', '2-a', '10-a', '100-a']` with the smaller numbers at the front.
List<String> sortNumeric(List<String> array, {bool descending = false}) {
  final List<String> result = List<String>.from(array)..sort(compareNatural);

  return descending ? result.reversed.toList() : result;
}

/// Returns a new array with every falsy value removed.
/// Dart has no truthiness of its own, so the rejected set is fixed rather than left to the language: `null`, `false`, `0` (including `-0.0` and `0.0`), the empty string and `NaN`.
/// Everything else is kept, so an empty list, an empty map and a string of spaces all survive.
List<dynamic> arrCompact(List<dynamic>? array) {
  if (array == null) {
    return [];
  }

  final List<dynamic> result = [];

  for (final dynamic value in array) {
    if (value == null || value == false || value == '') {
      continue;
    }

    if (value is num && (value == 0 || (value is double && value.isNaN))) {
      continue;
    }

    result.add(value);
  }

  return result;
}

/// (Private) A stable string key for a value, so that array membership can be decided by
/// value instead of by identity. Python cannot hash a list or a map at all, so an identity
/// comparison could not have been ported to all three languages.
String _comparableKey(dynamic value) {
  if (value == null) {
    return 'null';
  }

  if (value is num) {
    if (value is double) {
      if (value.isNaN) {
        return 'number:NaN';
      }

      // JavaScript has no int/double distinction, so `1` and `1.0` are one value there.
      if (value.isFinite &&
          value == value.truncateToDouble() &&
          value.abs() < 1e18) {
        return 'number:${value.toInt()}';
      }
    }

    return 'number:$value';
  }

  if (value is String) {
    return 'string:$value';
  }

  if (value is bool) {
    return 'boolean:$value';
  }

  try {
    return 'json:${jsonEncode(value, toEncodable: (Object? o) => o.toString())}';
  } catch (_) {
    // A cyclic structure has no JSON form.
    return 'json:$value';
  }
}

/// Returns the values of the first array that are not contained in any of the other arrays.
/// The original order is preserved and duplicates of a kept value are not removed.
/// Values are compared by value rather than by identity, so nested lists and maps are matched as well.
List<dynamic> arrDifference(List<dynamic>? array,
    [List<List<dynamic>>? others]) {
  if (array == null) {
    return [];
  }

  final Set<String> excluded = {};

  for (final List<dynamic> other in others ?? const []) {
    for (final dynamic value in other) {
      excluded.add(_comparableKey(value));
    }
  }

  return array
      .where((dynamic value) => !excluded.contains(_comparableKey(value)))
      .toList();
}

/// Returns the values that are present in every one of the given arrays.
/// The result is unique and keeps the order of the first array, so a single array simply has its duplicates removed.
/// Values are compared by value rather than by identity, so nested lists and maps are matched as well.
List<dynamic> arrIntersection(List<List<dynamic>>? arrays) {
  if (arrays == null || arrays.isEmpty) {
    return [];
  }

  final List<Set<String>> otherKeys = [];

  for (int i = 1; i < arrays.length; i++) {
    otherKeys.add(arrays[i].map(_comparableKey).toSet());
  }

  final Set<String> seen = {};
  final List<dynamic> result = [];

  for (final dynamic value in arrays[0]) {
    final String key = _comparableKey(value);

    if (seen.contains(key)) {
      continue;
    }

    seen.add(key);

    if (otherKeys.every((Set<String> keys) => keys.contains(key))) {
      result.add(value);
    }
  }

  return result;
}
