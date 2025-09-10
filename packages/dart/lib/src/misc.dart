import 'dart:async';

/// Sleep function using Promise.
Future<void> sleep(int delay) async {
  await Future.delayed(Duration(milliseconds: delay));
}

/// Repeat iteratee n (times argument value) times. After the return result of each function is stored in the array in order, the final array is returned.
List<dynamic> funcTimes(int times, dynamic iteratee) {
  if (times < 1) {
    throw ArgumentError('`times` must be a positive integer.');
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
