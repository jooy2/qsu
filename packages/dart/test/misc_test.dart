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

    test('retry', () async {
      int attempts = 0;
      final String result = await retry(() {
        attempts++;

        if (attempts < 3) {
          throw Exception('nope');
        }

        return 'ok';
      });

      expect(result, 'ok');
      expect(attempts, 3);

      // An asynchronous function is awaited.
      expect(await retry(() async => 'async ok'), 'async ok');

      // After `times` attempts the error of the last one is thrown.
      int failures = 0;

      await expectLater(
        retry(() {
          failures++;
          throw Exception('always');
        }, times: 2),
        throwsA(isA<Exception>()),
      );
      expect(failures, 2);

      // `times: 1` disables retrying.
      int once = 0;

      await expectLater(
        retry(() {
          once++;
          throw Exception('x');
        }, times: 1),
        throwsA(isA<Exception>()),
      );
      expect(once, 1);

      await expectLater(
        retry(() => 1, times: 0),
        throwsA(isA<ArgumentError>()),
      );

      // `backoff` multiplies the delay after every failure: 20ms, then 40ms.
      final int started = DateTime.now().millisecondsSinceEpoch;
      int delayed = 0;

      await expectLater(
        retry(() {
          delayed++;
          throw Exception('x');
        }, times: 3, delay: 20, backoff: 2),
        throwsA(isA<Exception>()),
      );
      expect(delayed, 3);
      expect(DateTime.now().millisecondsSinceEpoch - started >= 50, true);
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
