import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Math', () {
    test('numPick', () {
      for (int i = 0; i < 50; i += 1) {
        int offsetTest = numPick(5, 10);
        assert(offsetTest >= 5 && offsetTest <= 10);
      }
    });

    test('numUnique', () {
      final uniqSet = <int>{};

      for (int i = 0; i < 100; i++) {
        final uniq = numUnique();

        if (uniqSet.contains(uniq)) {
          fail('Duplicate number generated');
        } else {
          uniqSet.add(uniq);
        }
      }
    });

    test('div', () {
      expect(div([0]), equals(0));
      expect(div([100, 2, 2, 5]), equals(5));
      expect(div([10, 2, 5]), equals(1));
      expect(div([1234]), equals(1234));
    });
  });
}
