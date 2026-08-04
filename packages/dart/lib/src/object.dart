import 'dart:convert';

import 'package:qsu/src/verify.dart';

/// Deletes keys equal to the given value from the object data.
Map<String, dynamic>? objDeleteKeyByValue(
  Map<String, dynamic>? obj,
  dynamic searchValue, {
  bool recursive = false,
}) {
  if (obj == null) {
    return null;
  }

  final newObj = Map<String, dynamic>.from(obj);
  final keys = newObj.keys.toList();

  for (int i = keys.length - 1; i >= 0; i--) {
    final key = keys[i];
    final value = newObj[key];

    if (recursive && value != null && isObject(value)) {
      final updated = objDeleteKeyByValue(
        value as Map<String, dynamic>,
        searchValue,
        recursive: recursive,
      );

      newObj[key] = updated!;
    } else if (value == searchValue) {
      newObj.remove(key);
    }
  }

  return newObj;
}

/// Converts the given object data to a URL query string.
String objToQueryString(Map<String, dynamic> obj) {
  return obj.keys.map((key) {
    var value = obj[key];

    if (value is Map || value is List) {
      value = json.encode(value);
    }

    return '${Uri.encodeComponent(key)}=${Uri.encodeComponent(value.toString())}';
  }).join('&');
}

/// Converts the given object to array format. The resulting array is a two-dimensional array with one key value stored as follows: `[key, value]`.
/// If the `recursive` option is `true`, it will convert to a two-dimensional array again when the value is of type `object`.
List<dynamic> objToArray(Map<String, dynamic> obj, {bool? recursive = false}) {
  List<dynamic> convertToArray(Map<String, dynamic> o) {
    List<dynamic> r = [];
    for (var key in o.keys) {
      var value = o[key];

      if (recursive == true && value is Map<String, dynamic>) {
        r.add([key, convertToArray(value)]);
      } else {
        r.add([key, value]);
      }
    }
    return r;
  }

  return convertToArray(obj);
}

/// Merges objects from the given object to the top level of the child items and displays the key names in steps, using a delimiter (`.` by default) instead of the existing keys.
/// For example, if an object `a` has keys `b`, `c`, and `d`, the `a` key is not displayed, and the keys and values `a.b`, `a.c`, and `a.d` are displayed in the parent step.
Map<String, dynamic> objTo1d(Map<String, dynamic> obj,
    {String? separator = '.'}) {
  // Reject a null separator too. It used to slip past this check and then be
  // interpolated as the literal text 'null' into every nested key.
  if (separator == null || separator.isEmpty) {
    throw ArgumentError('`separator` must have value at least 1 character.');
  }

  Map<String, dynamic> convertObjectTo1d(Map<String, dynamic> o,
      [String objPath = '']) {
    Map<String, dynamic> result = {};
    bool isFirstDepth = objPath.isEmpty;

    o.forEach((key, value) {
      String newObjPath = isFirstDepth ? key : '$objPath$separator$key';

      if (value is Map<String, dynamic>) {
        result.addAll(convertObjectTo1d(value, newObjPath));
      } else {
        result[newObjPath] = value;
      }
    });

    return result;
  }

  return convertObjectTo1d(obj);
}

/// Returns a new object containing only the entries for which the callback returns `true`.
/// The callback receives `(value, key)`, in that order, matching the rest of the ecosystem.
/// Only the top level is inspected: a nested map is carried over as it is, never filtered.
Map<String, dynamic>? objPickBy(
  Map<String, dynamic>? obj,
  bool Function(dynamic value, String key) predicate,
) {
  if (obj == null) {
    return null;
  }

  final Map<String, dynamic> result = {};

  obj.forEach((String key, dynamic value) {
    if (predicate(value, key)) {
      result[key] = value;
    }
  });

  return result;
}

/// Returns a new object whose keys are the values returned by the callback. The values are carried over untouched.
/// The callback receives `(value, key)`, in that order, matching the rest of the ecosystem.
/// Only the top level is inspected: the keys of a nested map are left alone.
/// When two keys map onto the same name, the later one wins.
Map<String, dynamic>? objMapKeys(
  Map<String, dynamic>? obj,
  String Function(dynamic value, String key) iteratee,
) {
  if (obj == null) {
    return null;
  }

  final Map<String, dynamic> result = {};

  obj.forEach((String key, dynamic value) {
    result[iteratee(value, key)] = value;
  });

  return result;
}
