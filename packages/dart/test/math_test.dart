import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Math', () {
    test('numRandom', () {
      for (int i = 0; i < 50; i += 1) {
        int offsetTest = numRandom(5, 10);
        assert(offsetTest >= 5 && offsetTest <= 10);
      }
    });

    test('numUniqueId', () {
      final uniqSet = <int>{};

      for (int i = 0; i < 100; i++) {
        final uniq = numUniqueId();

        if (uniqSet.contains(uniq)) {
          fail('Duplicate number generated');
        } else {
          uniqSet.add(uniq);
        }
      }
    });

    test('ceil', () {
      expect(ceil(4.006), equals(5));
      expect(ceil(4), equals(4));
      expect(ceil(-4.006), equals(-4));
      expect(ceil(6.004, 2), equals(6.01));
      expect(ceil(6040, -2), equals(6100));
      expect(ceil(1.1, 1), equals(1.1));
      expect(ceil(-0.5), equals(0));
      expect(ceil(0), equals(0));
      expect(ceil(double.nan).isNaN, isTrue);
      expect(ceil(double.infinity), equals(double.infinity));
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

    test('floor', () {
      expect(floor(4.006), equals(4));
      expect(floor(4), equals(4));
      expect(floor(-4.006), equals(-5));
      expect(floor(0.046, 2), equals(0.04));
      expect(floor(4060, -2), equals(4000));
      expect(floor(1.1, 1), equals(1.1));
      expect(floor(-0.5), equals(-1));
      expect(floor(0), equals(0));
      expect(floor(double.nan).isNaN, isTrue);
      expect(floor(double.negativeInfinity), equals(double.negativeInfinity));
    });

    test('numMax', () {
      expect(numMax([1, 2, 3]), equals(3));
      expect(numMax([4, 2, 8, 6]), equals(8));
      expect(numMax([-4, -2, -8]), equals(-2));
      expect(numMax([1.5, 1.25]), equals(1.5));
      expect(numMax([7]), equals(7));
      expect(numMax([]), isNull);
      expect(numMax([double.nan, 5]), equals(5));
    });

    test('numMin', () {
      expect(numMin([1, 2, 3]), equals(1));
      expect(numMin([4, 2, 8, 6]), equals(2));
      expect(numMin([-4, -2, -8]), equals(-8));
      expect(numMin([1.5, 1.25]), equals(1.25));
      expect(numMin([7]), equals(7));
      expect(numMin([]), isNull);
      expect(numMin([double.nan, 5]), equals(5));
    });

    test('mul', () {
      expect(mul([0]), equals(0));
      expect(mul([1, 2, 3, 4]), equals(24));
      expect(mul([1, 2, 3]), equals(6));
      expect(mul([1, 5, 7, 0, 9]), equals(0));
      expect(mul([1234]), equals(1234));
    });

    test('numRound', () {
      expect(numRound(0.5), equals(1));
      expect(numRound(2.5), equals(3));
      expect(numRound(-0.5), equals(-1));
      expect(numRound(-1.5), equals(-2));
      expect(numRound(1.4), equals(1));
      expect(numRound(-1.4), equals(-1));
      expect(numRound(1.005, 2), equals(1.01));
      expect(numRound(2.675, 2), equals(2.68));
      expect(numRound(1234, -2), equals(1200));
      expect(numRound(4.006, 2), equals(4.01));
      expect(numRound(1.1, 1), equals(1.1));
      expect(numRound(0), equals(0));
      expect(numRound(-0.4), equals(0));
      expect(numRound(double.nan).isNaN, isTrue);
      expect(numRound(double.infinity), equals(double.infinity));
    });

    test('sub', () {
      expect(sub([0]), equals(0));
      expect(sub([100, 10, 20, 30]), equals(40));
      expect(sub([10, 20, 30]), equals(-40));
      expect(sub([1, 3, 5, -7, -9]), equals(9));
      expect(sub([1234]), equals(1234));
    });

    test('numSum', () {
      expect(numSum([0]), equals(0));
      expect(numSum([1, 2, 3, 4]), equals(10));
      expect(numSum([1, 2, 3]), equals(6));
      expect(numSum([1234]), equals(1234));
    });
  });
}
