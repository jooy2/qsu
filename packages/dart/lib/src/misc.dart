import 'dart:async';
import 'dart:io';
import 'dart:math';

/// Sleep function using Promise.
Future<void> sleep(int delay) async {
  await Future.delayed(Duration(milliseconds: delay));
}

/// Repeat iteratee n (times argument value) times. After the return result of each function is stored in the array in order, the final array is returned.
List<dynamic> funcTimes(int times, dynamic iteratee) {
  // Return an empty list for a non-positive count, like JavaScript and Python.
  if (times < 1) {
    return [];
  }

  return List<dynamic>.generate(times, (int index) {
    if (iteratee is Function) {
      return iteratee();
    } else {
      return iteratee;
    }
  }, growable: false);
}

/// When the given function is executed repeatedly, the function is called if it has not been called again within the specified timeout.
/// This function is used when a small number of function calls are needed for repetitive input events.
Function debounce(Function func, int timeout) {
  Timer? timer;

  return ([List<dynamic> args = const []]) {
    timer?.cancel();

    timer = Timer(Duration(milliseconds: timeout), () {
      Function.apply(func, args);
    });
  };
}

/// Ensure that text is displayed in full without being truncated in Dart's `print`.
void console(String? text) {
  if (text == null) {
    print('');
    return;
  }

  RegExp('.{1,800}').allMatches(text).forEach((match) => print(match.group(0)));
}

/// Limits how often a function may run: however many times the returned wrapper is called, the function itself runs at most once per [wait] window.
/// This is the counterpart of [debounce]. `debounce` waits for the calls to stop and then runs once; `throttle` keeps running at a steady rate while the calls continue.
/// By default a call fires immediately (the leading edge) and one more fires at the end of the window with the most recent arguments (the trailing edge).
/// With `leading: false` nothing fires immediately, with `trailing: false` only the leading call fires, and with both `false` the function never runs.
Function throttle(Function func, int wait,
    {bool? leading = true, bool? trailing = true}) {
  final bool useLeading = leading ?? true;
  final bool useTrailing = trailing ?? true;

  // `null` means no window is open yet, so the next call opens one.
  int? previous;
  Timer? timer;
  List<dynamic>? lastArgs;

  void later() {
    // With `leading: false` the next call has to open a fresh window rather than fire
    // straight away.
    previous = useLeading ? DateTime.now().millisecondsSinceEpoch : null;
    timer = null;

    final List<dynamic>? pending = lastArgs;

    lastArgs = null;

    if (pending != null) {
      Function.apply(func, pending);
    }
  }

  return ([List<dynamic> args = const []]) {
    final int now = DateTime.now().millisecondsSinceEpoch;

    if (previous == null && !useLeading) {
      previous = now;
    }

    // `remaining > wait` catches a clock that stepped backwards.
    final int remaining = previous == null ? 0 : wait - (now - previous!);

    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      timer?.cancel();
      timer = null;
      previous = now;
      lastArgs = null;
      Function.apply(func, args);
      return;
    }

    if (timer == null && useTrailing) {
      timer = Timer(Duration(milliseconds: remaining), later);
    }
  };
}

/// Runs the given function and, if it fails, runs it again until it succeeds or the attempts run out.
/// The value of the first successful attempt is returned; if every attempt fails, the error of the last one is rethrown with its original stack trace.
/// [times] counts total attempts, not extra ones, so the default of `3` means one call plus at most two retries and `times: 1` disables retrying.
/// [delay] is the wait between two attempts in milliseconds, and [backoff] multiplies it after every failure. The wait sits strictly between attempts.
Future<T> retry<T>(
  FutureOr<T> Function() func, {
  int? times = 3,
  int? delay = 0,
  num? backoff = 1,
}) async {
  final int maxAttempts = times ?? 3;
  final num backoffFactor = backoff ?? 1;

  if (maxAttempts < 1) {
    throw ArgumentError('`times` must be at least 1.');
  }

  num currentDelay = delay ?? 0;
  Object? lastError;
  StackTrace lastStackTrace = StackTrace.empty;

  for (int attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await func();
    } catch (error, stackTrace) {
      lastError = error;
      lastStackTrace = stackTrace;

      // The delay sits *between* attempts, so the final failure is reported without
      // waiting one more time for nothing.
      if (attempt < maxAttempts) {
        if (currentDelay > 0) {
          await sleep(currentDelay.round());
        }

        currentDelay *= backoffFactor;
      }
    }
  }

  Error.throwWithStackTrace(lastError!, lastStackTrace);
}

/// (Private) The box drawing characters [logBox] frames its table with.
const Map<String, String> _border = <String, String>{
  'tl': '┌',
  'tr': '┐',
  'bl': '└',
  'br': '┘',
  'h': '─',
  'v': '│',
  'lt': '├',
  'rt': '┤',
  'tt': '┬',
  'bt': '┴',
  'x': '┼',
};

/// (Private) How many columns a character takes in a terminal. The ranges are
/// the wide ones: the CJK blocks, Hangul, the full-width forms and the emoji.
int _charWidth(int codePoint) {
  if (codePoint == 0 ||
      codePoint < 32 ||
      (codePoint >= 0x7f && codePoint < 0xa0)) {
    return 0;
  }

  const List<List<int>> wide = <List<int>>[
    <int>[0x1100, 0x115f],
    <int>[0x2e80, 0x303e],
    <int>[0x3041, 0x33ff],
    <int>[0x3400, 0x4dbf],
    <int>[0x4e00, 0x9fff],
    <int>[0xa000, 0xa4cf],
    <int>[0xac00, 0xd7a3],
    <int>[0xf900, 0xfaff],
    <int>[0xfe30, 0xfe4f],
    <int>[0xff00, 0xff60],
    <int>[0xffe0, 0xffe6],
    <int>[0x1f300, 0x1faff],
    <int>[0x20000, 0x3fffd],
  ];

  for (final List<int> range in wide) {
    if (codePoint >= range[0] && codePoint <= range[1]) {
      return 2;
    }
  }

  return 1;
}

/// (Private) How many columns a string takes, counting by code point so a wide
/// character is not mistaken for one column.
int _stringWidth(String str) {
  int width = 0;

  for (final int codePoint in str.runes) {
    width += _charWidth(codePoint);
  }

  return width;
}

String _padEndVisual(String str, int width) {
  final int pad = width - _stringWidth(str);

  return pad > 0 ? str + ' ' * pad : str;
}

String _centerVisual(String str, int width) {
  final int total = width - _stringWidth(str);

  if (total <= 0) {
    return str;
  }

  final int left = total ~/ 2;

  return ' ' * left + str + ' ' * (total - left);
}

List<String> _wrapVisual(String text, int width) {
  final List<String> lines = <String>[];
  final int limit = max(1, width);

  for (final String rawLine in text.split('\n')) {
    if (rawLine.isEmpty) {
      lines.add('');
      continue;
    }

    StringBuffer current = StringBuffer();
    int currentWidth = 0;

    for (final int codePoint in rawLine.runes) {
      final String character = String.fromCharCode(codePoint);
      final int characterWidth = _charWidth(codePoint);

      if (currentWidth + characterWidth > limit) {
        lines.add(current.toString());
        current = StringBuffer(character);
        currentWidth = characterWidth;
      } else {
        current.write(character);
        currentWidth += characterWidth;
      }
    }

    lines.add(current.toString());
  }

  return lines;
}

/// (Private) The width to draw the box at. Anything that cannot answer, which
/// includes the web, leaves the conventional 80 columns.
int _terminalWidth() {
  try {
    if (stdout.hasTerminal && stdout.terminalColumns > 0) {
      return stdout.terminalColumns;
    }
  } on Object {
    // No terminal is attached, or there is no such thing on this platform.
  }

  try {
    final int? columns = int.tryParse(Platform.environment['COLUMNS'] ?? '');

    if (columns != null && columns > 0) {
      return columns;
    }
  } on Object {
    // The environment is not readable either.
  }

  return 80;
}

/// Print the given values as a table, one row each, framed in a box that fits
/// the terminal. Wide characters are counted as two columns, so a row holding
/// Korean or an emoji still lines up.
///
/// A value that is not a string is written with Dart's own `toString()`, which
/// is not the same shape the other packages' inspectors produce.
void logBox(List<dynamic> args) {
  final int terminal = max(_terminalWidth(), 10);

  const String headerIndex = '#';
  const String headerValue = 'value';

  final List<String> indexes =
      List<String>.generate(args.length, (int index) => '$index');
  final int indexContentWidth = <int>[
    _stringWidth(headerIndex),
    ...indexes.map(_stringWidth),
    1,
  ].reduce(max);
  final int indexCellWidth = indexContentWidth + 2;

  int valueCellWidth = terminal - indexCellWidth - 3;

  if (valueCellWidth < 3) {
    valueCellWidth = 3;
  }

  final int valueContentWidth = valueCellWidth - 2;

  String line(String left, String middle, String right) =>
      left +
      _border['h']! * indexCellWidth +
      middle +
      _border['h']! * valueCellWidth +
      right;

  final String top = line(_border['tl']!, _border['tt']!, _border['tr']!);
  final String separator = line(_border['lt']!, _border['x']!, _border['rt']!);
  final String bottom = line(_border['bl']!, _border['bt']!, _border['br']!);

  String row(String indexCell, String valueCell) =>
      '${_border['v']} $indexCell ${_border['v']} $valueCell ${_border['v']}';

  final List<String> out = <String>[
    top,
    row(_centerVisual(headerIndex, indexContentWidth),
        _padEndVisual(headerValue, valueContentWidth)),
    separator,
  ];

  if (args.isEmpty) {
    out.add(row(_centerVisual('-', indexContentWidth),
        _padEndVisual('(no arguments)', valueContentWidth)));
    out.add(bottom);
    out.forEach(print);

    return;
  }

  for (int index = 0; index < args.length; index += 1) {
    final dynamic value = args[index];
    final String text = value is String ? value : '$value';
    final List<String> wrapped = _wrapVisual(text, valueContentWidth);

    for (int line = 0; line < wrapped.length; line += 1) {
      final String indexCell = line == 0
          ? _centerVisual(indexes[index], indexContentWidth)
          : ' ' * indexContentWidth;

      out.add(row(indexCell, _padEndVisual(wrapped[line], valueContentWidth)));
    }

    if (index < args.length - 1) {
      out.add(separator);
    }
  }

  out.add(bottom);
  out.forEach(print);
}
