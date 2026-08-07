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

/// (Private) The text form a value takes when it becomes a key in [objInvert].
/// JavaScript has no int/double distinction, so a whole `double` is written without a
/// fractional part to keep the three implementations in step.
String _toKeyString(dynamic value) {
  if (value == null) {
    return 'null';
  }

  if (value is double &&
      value.isFinite &&
      value == value.truncateToDouble() &&
      value.abs() < 1e18) {
    return value.toInt().toString();
  }

  return value.toString();
}

/// Returns a new object with the keys and values swapped: every value becomes a key, and the key it came from becomes its value.
/// Keys are always strings, so the value is converted to text first (`null` becomes `'null'`, `1.0` becomes `'1'`).
/// Only the top level is inspected, and when two entries share a value the later one wins, because both land on the same key.
Map<String, String>? objInvert(Map<String, dynamic>? obj) {
  if (obj == null) {
    return null;
  }

  final Map<String, String> result = {};

  obj.forEach((String key, dynamic value) {
    result[_toKeyString(value)] = key;
  });

  return result;
}

/// Returns a new object containing only the listed keys. A single key or a list of keys is accepted.
/// Only the top level is inspected, and a key the map does not have is skipped rather than carried over as `null`, so the result never claims a key the source never had.
/// Values are carried over as they are, so a nested map is shared with the source rather than copied.
/// The original map is not modified. If the first argument is `null`, `null` is returned.
Map<String, dynamic>? objPick(Map<String, dynamic>? obj, dynamic keys) {
  if (obj == null) {
    return null;
  }

  final List<String> keyList = keys is String
      ? <String>[keys]
      : (keys as Iterable).map((dynamic key) => key.toString()).toList();
  final Map<String, dynamic> result = {};

  for (final String key in keyList) {
    if (obj.containsKey(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

/// (Private) Turns `a.b[0].c` into `['a', 'b', '0', 'c']`. A bracket may carry a quoted
/// key, so `a["b.c"]` reads one key `b.c` instead of two.
List<String> _parsePath(String path) {
  final List<String> segments = [];
  final int pathLength = path.length;
  String current = '';
  int i = 0;

  while (i < pathLength) {
    final String char = path[i];

    if (char == '[') {
      final int end = path.indexOf(']', i);

      if (end == -1) {
        current += char;
        i++;
        continue;
      }

      if (current != '') {
        segments.add(current);
        current = '';
      }

      String inner = path.substring(i + 1, end);
      final String quote = inner.isEmpty ? '' : inner[0];

      if (inner.length >= 2 &&
          (quote == "'" || quote == '"') &&
          inner.endsWith(quote)) {
        inner = inner.substring(1, inner.length - 1);
      }

      segments.add(inner);
      i = end + 1;

      // `a[0].b` puts a dot right after the bracket, which would otherwise close an empty
      // segment and make the lookup miss.
      if (i < pathLength && path[i] == '.') {
        i++;
      }

      continue;
    }

    if (char == '.') {
      segments.add(current);
      current = '';
      i++;
      continue;
    }

    current += char;
    i++;
  }

  if (current != '' || segments.isEmpty) {
    segments.add(current);
  }

  return segments;
}

/// Reads a nested value out of an object by path, returning [fallback] when the path is not there.
/// The path takes both dot and bracket notation, and the two can be mixed: `a.b.c`, `list[0]`, `list[1].d` and `list.1.d` all work. A bracket may carry a quoted key, so `["a.b"]` reads one key named `a.b` instead of walking two levels.
/// Whether a step exists is decided by the presence of the key, not by the value behind it, so a stored `null` is returned as it is rather than replaced by the fallback.
/// Lists are walked with their numeric index.
dynamic objGet(Map<String, dynamic>? obj, String path, {dynamic fallback}) {
  if (obj == null) {
    return fallback;
  }

  final List<String> segments = _parsePath(path);
  dynamic current = obj;

  for (final String segment in segments) {
    if (current is Map) {
      if (!current.containsKey(segment)) {
        return fallback;
      }

      current = current[segment];
      continue;
    }

    if (current is List) {
      final int? index = int.tryParse(segment);

      if (index == null || index < 0 || index >= current.length) {
        return fallback;
      }

      current = current[index];
      continue;
    }

    return fallback;
  }

  return current;
}

/// Merges any number of objects into one new object, going down through nested objects. When two sources carry the same key, the later one wins.
/// Two maps under the same key are merged into a *new* map, so neither source ends up shared with the result and neither is modified. Everything else, lists included, is replaced whole by the later value, where Lodash merges lists index by index.
/// A key that only one source carries is copied over as it is, so a nested map under such a key is shared with that source. Use [objClone] when a fully independent copy is needed.
/// `null` is returned when the list is empty, or when any of its entries is not a map.
Map<String, dynamic>? objMerge(List<Map<String, dynamic>?> objects) {
  if (objects.isEmpty) {
    return null;
  }

  final Map<String, dynamic> result = {};

  for (final Map<String, dynamic>? source in objects) {
    if (source == null) {
      return null;
    }

    source.forEach((String key, dynamic value) {
      final dynamic previous = result[key];

      if (isObject(previous) && isObject(value)) {
        result[key] = objMerge([
          Map<String, dynamic>.from(previous as Map),
          Map<String, dynamic>.from(value as Map),
        ]);
      } else {
        result[key] = value;
      }
    });
  }

  return result;
}

/// (Private) Copies a value, remembering every container already copied so a structure that
/// points back at itself is rebuilt with the same shape instead of recursing until the
/// stack runs out. The map compares by identity, because two equal but distinct maps must
/// still be copied separately.
dynamic _cloneValue(dynamic value, Map<Object, dynamic> seen) {
  if (value == null) {
    return null;
  }

  if (seen.containsKey(value)) {
    return seen[value];
  }

  if (value is Map) {
    final Map<String, dynamic> copy = {};

    seen[value] = copy;
    value.forEach((dynamic key, dynamic entry) {
      copy[key.toString()] = _cloneValue(entry, seen);
    });

    return copy;
  }

  if (value is List) {
    final List<dynamic> copy = [];

    seen[value] = copy;

    for (final dynamic entry in value) {
      copy.add(_cloneValue(entry, seen));
    }

    return copy;
  }

  if (value is Set) {
    final Set<dynamic> copy = {};

    seen[value] = copy;

    for (final dynamic entry in value) {
      copy.add(_cloneValue(entry, seen));
    }

    return copy;
  }

  // A `DateTime` is immutable, and a class instance cannot be rebuilt without knowing how
  // it was made, so both are handed back as they are.
  return value;
}

/// Copies an object. The copy is deep by default, so nothing inside it is shared with the original; pass `deep: false` to copy the top level only.
/// A `Map`, `List` and `Set` are rebuilt with their contents copied. A `DateTime` is immutable and a class instance cannot be rebuilt without knowing how it was made, so both are handed back as they are.
/// A structure that points back at itself is rebuilt with the same shape instead of recursing until the stack runs out.
/// A value that is not a container is returned as it is, so `objClone(5)` is `5`.
dynamic objClone(dynamic obj, {bool deep = true}) {
  if (obj == null) {
    return obj;
  }

  if (!deep) {
    if (obj is Map) {
      return Map<String, dynamic>.from(obj);
    }

    if (obj is List) {
      return List<dynamic>.from(obj);
    }

    if (obj is Set) {
      return Set<dynamic>.from(obj);
    }

    return obj;
  }

  return _cloneValue(obj, Map<Object, dynamic>.identity());
}
