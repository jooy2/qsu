import 'dart:async';

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
