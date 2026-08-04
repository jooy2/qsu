import 'dart:async';

import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Misc', () {
    test('sleep', () {
      expect(sleep(100), completes);
    });

    test('funcTimes', () {
      String sayHello([String? str]) {
        return 'Hello${str ?? ''}';
      }

      expect(funcTimes(2, sayHello), ['Hello', 'Hello']);
      expect(funcTimes(3, sayHello()), ['Hello', 'Hello', 'Hello']);
      expect(funcTimes(4, () => sayHello('!')),
          ['Hello!', 'Hello!', 'Hello!', 'Hello!']);
    });

    test('debounce', () async {
      final List<bool> debounceResult = [];
      final debounceFunc = debounce(() {
        debounceResult.add(true);
      }, 5);

      final List<Future<bool>> runningFunctions = [];

      for (int i = 0; i < 100; i++) {
        int waitDelay;
        if (i == 25 || i == 50 || i == 75) {
          waitDelay = 10;
        } else {
          waitDelay = 1;
        }

        runningFunctions.add(
          Future.delayed(Duration(milliseconds: waitDelay * i), () {
            debounceFunc();
            return true;
          }),
        );
      }

      await Future.wait(runningFunctions);
      await Future.delayed(Duration(milliseconds: 10));

      expect(debounceResult, equals(List.filled(4, true)));
    });

    test('throttle', () async {
      final List<int> calls = [];
      final throttled = throttle((int value) => calls.add(value), 30);

      // The leading edge fires straight away; the rest collapse into one trailing call
      // carrying the most recent arguments.
      throttled([1]);
      throttled([2]);
      throttled([3]);
      expect(calls, [1]);

      await Future.delayed(Duration(milliseconds: 80));
      expect(calls, [1, 3]);
    });

    test('throttle (leading: false)', () async {
      final List<int> calls = [];
      final throttled =
          throttle((int value) => calls.add(value), 30, leading: false);

      throttled([1]);
      throttled([2]);
      expect(calls, []);

      await Future.delayed(Duration(milliseconds: 80));
      expect(calls, [2]);
    });

    test('throttle (trailing: false)', () async {
      final List<int> calls = [];
      final throttled =
          throttle((int value) => calls.add(value), 30, trailing: false);

      throttled([1]);
      throttled([2]);

      await Future.delayed(Duration(milliseconds: 80));
      expect(calls, [1]);
    });

    test('console', () {
      runZoned(
        () {
          console('text');
          console('123' * 100000);
        },
        zoneSpecification: ZoneSpecification(
          print: (self, parent, zone, message) {
            // Ignore
          },
        ),
      );
    });
  });
}
