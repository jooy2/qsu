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
  });
}
