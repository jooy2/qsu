import 'dart:convert';

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
List<dynamic> objToArray(Map<String, dynamic> obj, [bool recursive = false]) {
  List<dynamic> convertToArray(Map<String, dynamic> o) {
    List<dynamic> r = [];
    for (var key in o.keys) {
      var value = o[key];

      if (recursive && value is Map<String, dynamic>) {
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
  if (separator != null && separator.isEmpty) {
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
