import 'package:qsu/qsu.dart';
import 'package:test/test.dart' hide contains, isEmpty;

void main() {
  group('Verify', () {
    test('isObject', () {
      expect(isObject('{}'), false);
      expect(isObject(true), false);
      expect(isObject(false), false);
      expect(isObject(null), false);
      expect(isObject(1), false);
      expect(isObject([]), false);
      expect(isObject(() => '123'), false);
      expect(isObject({}), true);
      expect(isObject([1, 2]), false);
      expect(
          isObject([
            {'a': 1, 'b': 2}
          ]),
          false);
      expect(isObject({'a': 1, 'b': 2}), true);
      expect(isObject({'a': {}, 'b': []}), true);
    });

    test('isEqual', () {
      const val1 = 'abc';
      const val2 = 'abc';
      const val3 = 'abc';

      expect(isEqual(1, [1, 2, 3]), false);
      expect(isEqual('abc', [val1, val2, val3]), true);
      expect(isEqual('123', ['123', 123]), true);
      expect(isEqual('123', ['123', 123, 123, 123]), true);
      expect(isEqual(123, '123'), true);
    });

    test('isEqualStrict', () {
      const val1 = 'abc';
      const val2 = 'abc';
      const val3 = 'abc';

      expect(isEqualStrict(1, [1, 2, 3, 4, 5]), false);
      expect(isEqualStrict('abc', [val1, val2, val3]), true);
      expect(isEqualStrict('123', ['123', 123]), false);
      expect(isEqualStrict('123', ['123', '123']), true);
      expect(isEqualStrict(123, '123'), false);
    });

    test('isEmpty', () {
      expect(isEmpty(''), true);
      expect(isEmpty('1234'), false);
      expect(isEmpty(1234), false);
      expect(isEmpty(1.234), false);
      expect(isEmpty(null), true);
      expect(isEmpty([]), true);
      expect(isEmpty([{}]), false);
      expect(isEmpty([[]]), false);
      expect(isEmpty(['1234']), false);
      expect(isEmpty({}), true);
      expect(isEmpty({'a': '1234'}), false);
    });

    test('contains', () {
      expect(contains('12345', '3'), true);
      expect(contains('12345', '10'), false);
      expect(contains('ABC', ['A', 'B', 'C']), true);
      expect(contains('ABC', ['D', 'E', 'F']), false);
      expect(contains('ABC', ['AB', 'C'], exact: true), false);
      expect(contains('AB', ['AB', 'C', 'D'], exact: true), true);
    });

    test('isUrl', () {
      expect(isUrl(''), false);
      expect(isUrl('https://'), false);
      expect(isUrl('www.google.com'), false);
      expect(isUrl('www.google.com', withProtocol: true), true);
      expect(isUrl('https://google.com'), true);
      expect(isUrl('https://google.com', withProtocol: true), true);
      expect(isUrl('https://google'), true);
      expect(isUrl('https://google', withProtocol: false, strict: true), false);
      expect(isUrl('https://google.com?query=qsu'), true);
    });

    test('is2dArray', () {
      expect(is2dArray([]), false);
      expect(is2dArray([[], []]), true);
      expect(
          is2dArray([
            {'a': 1},
            {'b': 2}
          ]),
          false);
      expect(
          is2dArray([
            [1],
            [2]
          ]),
          true);
    });

    test('isEmail', () {
      expect(isEmail('1@1.com'), true);
      expect(isEmail('abc@def.ghi'), true);
      expect(isEmail('abc@sub.domain.com'), true);
      expect(isEmail('a.bc@d.ef'), true);
      expect(isEmail('a-12_34@b-12-34.net'), true);
      expect(isEmail('@b1234.net'), false);
      expect(isEmail('a1234@b1234'), false);
      expect(isEmail('a_1234@b_1234.net'), false);
      expect(isEmail('abc@@def.com'), false);
      expect(isEmail('11.com'), false);
      expect(isEmail('sub.domain.com'), false);
      expect(isEmail('1@1@a.com'), false);
    });

    test('between', () {
      expect(between([1, 10], 1), false);
      expect(between([1, 10], 1, inclusive: true), true);
      expect(between([10, 100], 11), true);
    });

    test('len', () {
      expect(len('12345'), 5);
      expect(len(12345), 5);
      expect(len(() => '123'), 3);
      expect(len([1, 2, 3, 4]), 4);
      expect(len({'hello': 'world', 'lorem': 'ipsum'}), 2);
      expect(
          len([
            {'hello': 1, 'world': 2},
            {'lorem': 3}
          ]),
          2);
    });

    test('isTrueMinimumNumberOfTimes', () {
      final int left = 2;
      final int right1 = 1 + 1;
      final int right2 = 2 + 1;

      expect(isTrueMinimumNumberOfTimes([true, false, false]), true);
      expect(isTrueMinimumNumberOfTimes([true, true], minimumCount: 1), true);
      expect(isTrueMinimumNumberOfTimes([true, false, true], minimumCount: 2),
          true);
      expect(isTrueMinimumNumberOfTimes([true, false, true], minimumCount: 1),
          true);
      expect(
          isTrueMinimumNumberOfTimes([left == right1, false, true, true, false],
              minimumCount: 3),
          true);
      expect(
          isTrueMinimumNumberOfTimes([left == right2, false, true, true, false],
              minimumCount: 3),
          false);
    });
  });
}
