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

/// A unit table for one of the [fileSizeParts] standards.
class _FileSizeUnits {
  final int base;
  final List<String> short;
  final List<String> long;

  const _FileSizeUnits({
    required this.base,
    required this.short,
    required this.long,
  });
}

const List<String> _decimalLongUnits = [
  'Byte',
  'Kilobyte',
  'Megabyte',
  'Gigabyte',
  'Terabyte',
  'Petabyte',
  'Exabyte',
  'Zettabyte',
  'Yottabyte'
];

// `jedec` divides by 1024 and labels the result `KB`, which is what this package has
// always done. `iec` keeps the 1024 divisor and uses the prefixes that actually mean
// 1024, and `si` is the decimal one. The exponent 0 label stays `Bytes` everywhere,
// because no prefix is involved there.
const Map<String, _FileSizeUnits> _fileSizeStandards = {
  'jedec': _FileSizeUnits(
    base: 1024,
    short: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    long: _decimalLongUnits,
  ),
  'iec': _FileSizeUnits(
    base: 1024,
    short: ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
    long: [
      'Byte',
      'Kibibyte',
      'Mebibyte',
      'Gibibyte',
      'Tebibyte',
      'Pebibyte',
      'Exbibyte',
      'Zebibyte',
      'Yobibyte'
    ],
  ),
  'si': _FileSizeUnits(
    base: 1000,
    short: ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    long: _decimalLongUnits,
  ),
};

_FileSizeUnits _fileSizeUnits(String? standard) {
  return _fileSizeStandards[standard] ?? _fileSizeStandards['jedec']!;
}

// The short label is a fixed string, so `1` reads as `1 Bytes` exactly as it always has.
// The long label is new, so it takes the singular the way `duration` does.
String _fileSizeUnitLabel(
    _FileSizeUnits units, int exponent, String? unitDisplay, num value) {
  if (unitDisplay != 'long') {
    return units.short[exponent];
  }

  return '${units.long[exponent]}${value == 1 ? '' : 's'}';
}

int _fileSizeExponent(num bytes, int base, int unitCount) {
  // Clamp instead of running off the end of the table: the exponent for a value past
  // the largest unit used to index past it, which threw here and read as `undefined`
  // in the JavaScript package.
  final int exponent = (log(bytes) / log(base)).floor();

  return exponent > unitCount - 1 ? unitCount - 1 : exponent;
}

/// The result of [fileSizeParts].
class FileSizeParts {
  /// The size expressed in [unit]. It is not rounded, so the caller's own formatter
  /// rounds it once.
  final num value;

  /// The unit [value] is expressed in, spelled for the chosen standard and display.
  final String unit;

  /// How many times the size was divided by the standard's base.
  final int exponent;

  const FileSizeParts({
    required this.value,
    required this.unit,
    required this.exponent,
  });
}

/// Splits a file size in bytes into the scaled number and the unit it belongs to,
/// leaving the caller to decide how to write them. Use it to render a size in a
/// locale the package does not know about, by handing [value] to a number formatter
/// of your own and taking the unit name from [exponent].
///
/// [standard] picks the divisor and the unit names: `jedec` (the default) divides by
/// 1024 and writes `KB`, `iec` divides by 1024 and writes `KiB`, and `si` divides by
/// 1000 and writes `kB`. [unitDisplay] is `short` (`MB`) or `long` (`Megabytes`).
FileSizeParts fileSizeParts(int bytes,
    {String? standard, String? unitDisplay}) {
  final _FileSizeUnits units = _fileSizeUnits(standard);

  if (bytes <= 0) {
    return FileSizeParts(
      value: 0,
      unit: _fileSizeUnitLabel(units, 0, unitDisplay, 0),
      exponent: 0,
    );
  }

  final int exponent = _fileSizeExponent(bytes, units.base, units.short.length);
  final num value = bytes / pow(units.base, exponent);

  return FileSizeParts(
    value: value,
    unit: _fileSizeUnitLabel(units, exponent, unitDisplay, value),
    exponent: exponent,
  );
}

/// Converts the file size in bytes to human-readable and returns it.
/// The return value is a String and includes the file units (Bytes, MB, GB...).
/// If the second optional argument value is included, you can display as many decimal places as you like.
///
/// [standard] and [unitDisplay] are passed straight to [fileSizeParts]. Leaving both
/// out gives the same string this function has always returned.
String fileSizeFormat(int bytes,
    {int? decimals, bool? ceil, String? standard, String? unitDisplay}) {
  final _FileSizeUnits units = _fileSizeUnits(standard);
  final FileSizeParts parts =
      fileSizeParts(bytes, standard: standard, unitDisplay: unitDisplay);

  final String sizeStr;
  num size = parts.value;

  if (ceil == true) {
    size = size.ceil().toDouble();
  }

  if (size % 1 == 0) {
    sizeStr = size.toInt().toString();
  } else {
    sizeStr = size.toStringAsFixed(decimals ?? 2);
  }

  // The label is taken from the rounded number, so a value that rounds to one is not
  // written as `1 Megabytes`.
  final num rounded = num.parse(sizeStr);

  return '$sizeStr ${_fileSizeUnitLabel(units, parts.exponent, unitDisplay, rounded)}';
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

Map<String, dynamic>? _findDurationUnit(String name) {
  String wanted = name.toLowerCase();

  if (wanted.endsWith('s')) {
    wanted = wanted.substring(0, wanted.length - 1);
  }

  for (final Map<String, dynamic> u in _durationUnits) {
    if ((u['name'] as String).toLowerCase() == wanted) {
      return u;
    }
  }

  return null;
}

String _durationLabel(
    num value, String name, bool useShortString, bool useSpace) {
  final Map<String, dynamic>? unit = _findDurationUnit(name);
  final String space = useSpace ? ' ' : '';
  final String suffix = useShortString
      ? (unit?['short'] as String? ?? name)
      : "$name${value == 1 ? '' : 's'}";

  return "${_durationNumStr(value)}$space$suffix";
}

/// One unit of a duration, as returned by [durationParts].
class DurationPart {
  /// How many of [unit] the duration holds. Whole in the normal case, and possibly
  /// fractional when a single `unit` was asked for.
  final num value;

  /// The unit name, one of `Year`, `Month`, `Day`, `Hour`, `Minute`, `Second` and
  /// `Millisecond`.
  final String unit;

  const DurationPart({required this.value, required this.unit});
}

/// Breaks a duration in milliseconds into its units and returns them, leaving the caller
/// to decide how to write them. Use it to render a duration in a language this package
/// does not know: the unit names below are English, and [duration] adds an `s` for the
/// plural, which is a rule only English follows.
///
/// [withZeroValue], [withMilliSeconds], [maxUnitCount] and [unit] mean what they mean in
/// [duration]. The options that only decide how the pieces are written are left out.
List<DurationPart> durationParts(
  num milliseconds, {
  bool withZeroValue = false,
  bool withMilliSeconds = false,
  int? maxUnitCount,
  String? unit,
}) {
  // Single-unit mode: express the whole duration with one unit (fractions allowed).
  if (unit != null) {
    final Map<String, dynamic>? target = _findDurationUnit(unit);

    if (target != null) {
      final num value = double.parse(
          (milliseconds / (target['ms'] as int)).toStringAsFixed(6));

      return [DurationPart(value: value, unit: target['name'] as String)];
    }
  }

  final List<Map<String, dynamic>> activeUnits = withMilliSeconds
      ? _durationUnits
      : _durationUnits.where((u) => u['name'] != 'Millisecond').toList();

  final List<DurationPart> values = [];
  num remaining = milliseconds;

  for (final Map<String, dynamic> u in activeUnits) {
    final int value = (remaining / (u['ms'] as int)).floor();

    remaining -= value * (u['ms'] as int);
    values.add(DurationPart(value: value, unit: u['name'] as String));
  }

  // Skip leading units that are zero; keep interior/trailing zeros only when requested.
  int firstNonZero = -1;

  for (int i = 0; i < values.length; i++) {
    if (values[i].value != 0) {
      firstNonZero = i;
      break;
    }
  }

  if (firstNonZero == -1) {
    return [];
  }

  List<DurationPart> selected = values.sublist(firstNonZero);

  if (!withZeroValue) {
    selected = selected.where((DurationPart v) => v.value != 0).toList();
  }

  if (maxUnitCount != null && maxUnitCount >= 0) {
    return selected.take(maxUnitCount).toList();
  }

  return selected;
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
  return durationParts(
    milliseconds,
    withZeroValue: withZeroValue,
    withMilliSeconds: withMilliSeconds,
    maxUnitCount: maxUnitCount,
    unit: unit,
  )
      .map((DurationPart part) =>
          _durationLabel(part.value, part.unit, useShortString, useSpace))
      .join(separator);
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
