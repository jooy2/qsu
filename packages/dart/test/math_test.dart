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

    test('clamp', () {
      expect(clamp(5, 1, 10), equals(5));
      expect(clamp(1, 1, 10), equals(1));
      expect(clamp(10, 1, 10), equals(10));
      expect(clamp(-7, 1, 10), equals(1));
      expect(clamp(42, 1, 10), equals(10));
      expect(clamp(1.5, 0, 1), equals(1));
      expect(clamp(-1.5, -1, 1), equals(-1));
      // An inverted range resolves to `min`, because the upper bound is applied first.
      expect(clamp(5, 10, 1), equals(10));
    });

    test('div', () {
      expect(div([0]), equals(0));
      expect(div([100, 2, 2, 5]), equals(5));
      expect(div([10, 2, 5]), equals(1));
      expect(div([1234]), equals(1234));
    });

    test('mul', () {
      expect(mul([0]), equals(0));
      expect(mul([1, 2, 3, 4]), equals(24));
      expect(mul([1, 2, 3]), equals(6));
      expect(mul([1, 5, 7, 0, 9]), equals(0));
      expect(mul([1234]), equals(1234));
    });

    test('round', () {
      expect(round(0.5), equals(1));
      expect(round(2.5), equals(3));
      expect(round(-0.5), equals(-1));
      expect(round(-1.5), equals(-2));
      expect(round(1.4), equals(1));
      expect(round(-1.4), equals(-1));
      expect(round(1.005, 2), equals(1.01));
      expect(round(2.675, 2), equals(2.68));
      expect(round(1234, -2), equals(1200));
      expect(round(4.006, 2), equals(4.01));
      expect(round(1.1, 1), equals(1.1));
      expect(round(0), equals(0));
      expect(round(-0.4), equals(0));
      expect(round(double.nan).isNaN, isTrue);
      expect(round(double.infinity), equals(double.infinity));
    });

    test('sub', () {
      expect(sub([0]), equals(0));
      expect(sub([100, 10, 20, 30]), equals(40));
      expect(sub([10, 20, 30]), equals(-40));
      expect(sub([1, 3, 5, -7, -9]), equals(9));
      expect(sub([1234]), equals(1234));
    });

    test('sum', () {
      expect(sum([0]), equals(0));
      expect(sum([1, 2, 3, 4]), equals(10));
      expect(sum([1, 2, 3]), equals(6));
      expect(sum([1234]), equals(1234));
    });
  });
}
