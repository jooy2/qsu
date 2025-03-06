import 'dart:convert';
import 'dart:math';

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

  final dynamic item = array.removeAt(from);
  array.insert(to, item);

  return array;
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
