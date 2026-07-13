import 'dart:convert';
import 'dart:math';

/// Return number format including comma symbol.
String numberFormat(dynamic number) {
  final List<String> parts = number.toString().split('.');
  final String decimalPart =
      (parts.length > 1 && parts[1] != '0') ? '.${parts[1]}' : '';

  final String formattedIntegerPart = parts[0].replaceAllMapped(
      RegExp(r'(\d)(?=(\d{3})+(?!\d))'), (Match match) => '${match[1]},');

  return formattedIntegerPart + decimalPart;
}

/// Converts the file size in bytes to human-readable and returns it.
/// The return value is a String and includes the file units (Bytes, MB, GB...).
/// If the second optional argument value is included, you can display as many decimal places as you like.
String fileSizeFormat(int bytes, {int? decimals, bool? ceil}) {
  if (bytes <= 0) {
    return '0 Bytes';
  }

  final int byteCalc = (log(bytes) / log(1024)).floor();
  final String sizeStr;
  double size = bytes / pow(1024, byteCalc);

  if (ceil == true) {
    size = size.ceil().toDouble();
  }

  if (size % 1 == 0) {
    sizeStr = size.toInt().toString();
  } else {
    sizeStr = size.toStringAsFixed(decimals ?? 2);
  }

  final List<String> units = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB'
  ];

  return '$sizeStr ${units[byteCalc]}';
}

// Descending order. 'ms' is the absolute number of milliseconds in one unit.
// A month is treated as 30 days and a year as 365 days.
const List<Map<String, dynamic>> _durationUnits = [
  {'name': 'Year', 'short': 'Y', 'ms': 31536000000},
  {'name': 'Month', 'short': 'Mo', 'ms': 2592000000},
  {'name': 'Day', 'short': 'D', 'ms': 86400000},
  {'name': 'Hour', 'short': 'H', 'ms': 3600000},
  {'name': 'Minute', 'short': 'M', 'ms': 60000},
  {'name': 'Second', 'short': 'S', 'ms': 1000},
  {'name': 'Millisecond', 'short': 'ms', 'ms': 1},
];

String _durationNumStr(num value) {
  if (value == value.roundToDouble()) {
    return value.toInt().toString();
  }
  String str = value.toStringAsFixed(6);
  str = str.replaceAll(RegExp(r'0+$'), '');
  str = str.replaceAll(RegExp(r'\.$'), '');
  return str;
}

String _durationLabel(
    num value, Map<String, dynamic> unit, bool useShortString, bool useSpace) {
  final String space = useSpace ? ' ' : '';
  final String suffix = useShortString
      ? unit['short'] as String
      : "${unit['name']}${value == 1 ? '' : 's'}";
  return "${_durationNumStr(value)}$space$suffix";
}

/// Displays the given millisecond value in human-readable time.
/// For example, the value of `604800000` (7 days) is displayed as `7 Days`.
/// A month is treated as 30 days and a year as 365 days.
/// - `useShortString`: `Days` -> `D`, `Hours` -> `H`, `Minutes` -> `M`, `Seconds` -> `S`, `Months` -> `Mo`, `Years` -> `Y`, `Milliseconds` -> `ms`.
/// - `useSpace`: Insert a space between value and unit (e.g. `1Days` -> `1 Days`).
/// - `withZeroValue`: Include units with a value of 0 below the largest unit.
/// - `separator`: Joins each unit (e.g. `-` -> `1 Hour-10 Minutes`).
/// - `withMilliSeconds`: Include the millisecond unit (default `false`).
/// - `maxUnitCount`: Maximum number of units to display, counted from the largest.
/// - `unit`: Show the whole duration with a single unit (e.g. `Hour` -> `48 Hours`, `0.5 Hours`).
String duration(
  num milliseconds, {
  bool useShortString = false,
  bool useSpace = true,
  bool withZeroValue = false,
  String separator = ' ',
  bool withMilliSeconds = false,
  int? maxUnitCount,
  String? unit,
}) {
  // Single-unit mode: express the whole duration with one unit (fractions allowed).
  if (unit != null) {
    String name = unit.toLowerCase();
    if (name.endsWith('s')) {
      name = name.substring(0, name.length - 1);
    }
    Map<String, dynamic>? target;
    for (final u in _durationUnits) {
      if ((u['name'] as String).toLowerCase() == name) {
        target = u;
        break;
      }
    }
    if (target != null) {
      final num value =
          double.parse((milliseconds / (target['ms'] as int)).toStringAsFixed(6));
      return _durationLabel(value, target, useShortString, useSpace);
    }
  }

  final List<Map<String, dynamic>> activeUnits = withMilliSeconds
      ? _durationUnits
      : _durationUnits.where((u) => u['name'] != 'Millisecond').toList();

  final List<Map<String, dynamic>> values = [];
  num remaining = milliseconds;
  for (final u in activeUnits) {
    final int value = (remaining / (u['ms'] as int)).floor();
    remaining -= value * (u['ms'] as int);
    values.add({'value': value, 'unit': u});
  }

  // Skip leading units that are zero; keep interior/trailing zeros only when requested.
  int firstNonZero = -1;
  for (int i = 0; i < values.length; i++) {
    if (values[i]['value'] != 0) {
      firstNonZero = i;
      break;
    }
  }
  if (firstNonZero == -1) {
    return '';
  }

  List<Map<String, dynamic>> selected = values.sublist(firstNonZero);
  if (!withZeroValue) {
    selected = selected.where((v) => v['value'] != 0).toList();
  }

  List<String> result = selected
      .map((v) => _durationLabel(v['value'] as num,
          v['unit'] as Map<String, dynamic>, useShortString, useSpace))
      .toList();

  if (maxUnitCount != null && maxUnitCount >= 0) {
    result = result.take(maxUnitCount).toList();
  }

  return result.join(separator);
}

/// Any argument value will be attempted to be parsed as a Number type without returning an error.
/// If parsing fails, it is replaced by the number set in `fallback`.
/// The default value for `fallback` is `0`. You can specify `radix` (default is decimal: `10`) in the third argument.
int safeParseInt(dynamic value, {int? fallback, int? radix}) {
  if (value == null) {
    return fallback ?? 0;
  }

  try {
    return int.parse(value.toString().split('.').first, radix: radix ?? 10);
  } catch (e) {
    return fallback ?? 0;
  }
}

/// Attempts to parse without returning an error, even if the argument value is of the wrong type or in `JSON` format.
/// If parsing fails, it will be replaced with the object set in `fallback`.
/// The default value for `fallback` is an empty object.
dynamic safeJSONParse(dynamic jsonString, {dynamic fallback = const {}}) {
  if (jsonString == null) {
    return fallback;
  }

  if (jsonString is List || jsonString is Map) {
    try {
      return jsonDecode(jsonEncode(jsonString));
    } catch (e) {
      return fallback;
    }
  }

  try {
    return jsonDecode(jsonString);
  } catch (e) {
    return fallback;
  }
}
