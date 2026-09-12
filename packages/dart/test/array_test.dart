import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Array', () {
    test('arrShuffle', () {
      expect(arrShuffle([1, 2, 3, 4, 5, 6, 7, 8]), hasLength(8));
      expect(
          arrShuffle([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8]
          ]),
          hasLength(4));
      expect(
          arrShuffle([
            {'A': 1},
            {'B': 2},
            {'C': 3},
            {'D': 4}
          ]),
          hasLength(4));
    });

    test('arrWithDefault', () {
      expect(arrWithDefault('test', 0), []);
      expect(arrWithDefault(123, 2), [123, 123]);
      expect(
          arrWithDefault('test', 5), ['test', 'test', 'test', 'test', 'test']);
      expect(arrWithDefault([null], 2), [
        [null],
        [null]
      ]);
    });

    test('arrWithNumber', () {
      expect(arrWithNumber(1, 2), [1, 2]);
      expect(arrWithNumber(0, 5), [0, 1, 2, 3, 4, 5]);
      expect(arrWithNumber(1, 1), [1]);
    });

    test('arrPick', () {
      expect(arrPick([1]), 1);

      final pickResult = arrPick([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

      expect(pickResult! < 10, true);
      expect(pickResult.runtimeType, int);

      expect(arrPick<int>([]), null);
    });

    test('arrUnique', () {
      List<List<int>> big2dArray = [
        [10, 20, 30, 40, 50],
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 0]
      ];

      funcTimes(150000, () => big2dArray.add([1, 1, 1, 1, 1]));
      funcTimes(150000, () => big2dArray.add([2, 2, 2, 2, 2]));
      funcTimes(150000, () => big2dArray.add([3, 3, 3, 3, 3]));

      expect(arrUnique(big2dArray), [
        [10, 20, 30, 40, 50],
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 0],
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3]
      ]);
      expect(arrUnique([1, 1, 2, 2, 2, 2, 3]), [1, 2, 3]);
      expect(arrUnique(['1', '2', '3', '3', '4']), ['1', '2', '3', '4']);
      expect(arrUnique([1, '1', 1, 'a', 2, 'b']), [1, '1', 'a', 2, 'b']);
      expect(
          arrUnique([
            [1, 2],
            [1, 2],
            [2, 3],
            [2, 3],
            [2, 3],
            [2, 4]
          ]),
          [
            [1, 2],
            [2, 3],
            [2, 4]
          ]);
    });

    test('average', () {
      expect(average([1, 3, 5, 7, 9]), 5);
      expect(average([1, 5, 15, 50]), 17.75);
      expect(average([5, -5]), 0);
    });

    test('arrMove', () {
      expect(arrMove([1, 3, 5, 7, 9], 0, 3), [3, 5, 7, 1, 9]);
      expect(arrMove([5, 10, 15], 1, 2), [5, 15, 10]);
      expect(arrMove([5, 10, 15], 1, 1), [5, 10, 15]);
    });

    test('arrTo1dArray', () {
      expect(
          arrTo1dArray([
            [1, 2, 3, 4],
            [5, 6, 7, 8]
          ]),
          [1, 2, 3, 4, 5, 6, 7, 8]);
      expect(
          arrTo1dArray([
            [1, 2, 3],
            4,
            5,
            [6, 7, 8]
          ]),
          [1, 2, 3, 4, 5, 6, 7, 8]);
      expect(
          arrTo1dArray([
            [1, 2],
            [
              [3, 4],
              [5, 6]
            ],
            7,
            [8]
          ]),
          [1, 2, 3, 4, 5, 6, 7, 8]);
      expect(
          arrTo1dArray([
            [
              [
                [1, 2, 3, 4, 5, 6]
              ]
            ],
            7,
            8
          ]),
          [1, 2, 3, 4, 5, 6, 7, 8]);
    });

    test('arrRepeat', () {
      expect(arrRepeat([1, 2, 3, 4], 3), [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
      expect(arrRepeat({'a': 1, 'b': 2}, 5), [
        {'a': 1, 'b': 2},
        {'a': 1, 'b': 2},
        {'a': 1, 'b': 2},
        {'a': 1, 'b': 2},
        {'a': 1, 'b': 2}
      ]);
    });

    test('arrCount', () {
      expect(arrCount([]), {});
      expect(arrCount([1, 2, 3, 3, 4, 5, 5, 5]),
          {'1': 1, '2': 1, '3': 2, '4': 1, '5': 3});
      expect(arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']),
          {'a': 4, 'b': 2, 'c': 1, 'd': 1});
    });

    test('arrGroupByMaxCount', () {
      expect(arrGroupByMaxCount([1, 2, 3], 1), [
        [1],
        [2],
        [3]
      ]);
      expect(
          arrGroupByMaxCount([
            1,
            2,
            [],
            4,
            [[]]
          ], 2),
          [
            [1, 2],
            [[], 4],
            [
              [[]]
            ]
          ]);
      expect(arrGroupByMaxCount([1, 2, 3, 4], 5), [
        [1, 2, 3, 4]
      ]);
      expect(arrGroupByMaxCount([1, 1, 1, 1, 1, 1], 2), [
        [1, 1],
        [1, 1],
        [1, 1]
      ]);
    });

    test('sortNumeric', () {
      expect(sortNumeric([]), []);
      expect(sortNumeric(['a', 'd', 'c', 'b']), ['a', 'b', 'c', 'd']);
      expect(
          sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']),
          ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']);
      expect(sortNumeric(['3', '1', '11', '100', '10', '2', '15']),
          ['1', '2', '3', '10', '11', '15', '100']);
    });

    // The ordering below has to be identical in the JavaScript and Python packages. It
    // used to come from `compareNatural`, which none of the three packages agreed on.
    test('sortNumeric (ordering is the same in every package)', () {
      // Case is a tie-break, not the first thing compared, so the numbers still decide.
      expect(sortNumeric(['item2', 'Item10', 'item1']),
          ['item1', 'item2', 'Item10']);
      expect(
          sortNumeric(
              ['file-1.txt', 'File-3.txt', 'file-10.txt', 'file-2.txt']),
          ['file-1.txt', 'file-2.txt', 'File-3.txt', 'file-10.txt']);
      // Lower case comes before upper case when nothing else separates them.
      expect(sortNumeric(['Apple', 'apple', 'Banana', 'banana']),
          ['apple', 'Apple', 'banana', 'Banana']);
      expect(sortNumeric(['a', 'A', 'b', 'B']), ['a', 'A', 'b', 'B']);
      // An accent is a tie-break too, so `äpple` sits next to `apple` and not after `z`.
      expect(sortNumeric(['zebra', 'äpple', 'apple', 'Zebra']),
          ['apple', 'äpple', 'zebra', 'Zebra']);
      expect(sortNumeric(['résumé', 'resume', 'Resume']),
          ['resume', 'Resume', 'résumé']);
      // Whitespace, then punctuation, then digits, then letters.
      expect(sortNumeric(['1file', '.gitignore', 'apple', '_private']),
          ['.gitignore', '_private', '1file', 'apple']);
      // A run of digits is compared by length first, so it stays exact past the range a
      // number could hold.
      expect(sortNumeric(['12345678901234567891', '12345678901234567890', '2']),
          ['2', '12345678901234567890', '12345678901234567891']);
      // Leading zeros do not change the value, so the raw string breaks the tie.
      expect(sortNumeric(['007', '7', '08', '8']), ['007', '7', '08', '8']);
      expect(sortNumeric(['b', 'a', 'c'], descending: true), ['c', 'b', 'a']);
    });

    test('sortNumeric (descending is the exact reverse)', () {
      final List<String> input = [
        'file-10.txt',
        'file-1.txt',
        'File-3.txt',
        'b',
        'b'
      ];
      final List<String> ascending = sortNumeric(input);

      expect(sortNumeric(input, descending: true), ascending.reversed.toList());
      // A repeated value survives rather than being collapsed.
      expect(ascending.where((String e) => e == 'b').length, 2);
    });

    test('arrCompact', () {
      expect(arrCompact([0, 1, false, 2, '', 3, null, double.nan]), [1, 2, 3]);
      expect(arrCompact([false, 0, '', null, double.nan]), []);
      expect(arrCompact([]), []);
      expect(arrCompact(['a', 'b']), ['a', 'b']);
      // Empty containers and whitespace are not falsy and must survive.
      expect(arrCompact([[], {}, ' ', '0']), [[], {}, ' ', '0']);
      expect(arrCompact([-0.0, 0.0, 0]), []);
      expect(arrCompact([true, -1, 0.5]), [true, -1, 0.5]);
      expect(arrCompact(null), []);
    });

    test('arrDifference', () {
      expect(
          arrDifference([
            2,
            1,
            3
          ], [
            [2, 3]
          ]),
          [1]);
      // Duplicates of a kept value stay, and the original order is preserved.
      expect(
          arrDifference([
            2,
            1,
            2,
            3
          ], [
            [1]
          ]),
          [2, 2, 3]);
      expect(
          arrDifference([
            1,
            2,
            3,
            4
          ], [
            [2],
            [4]
          ]),
          [1, 3]);
      expect(arrDifference([1, 2, 3]), [1, 2, 3]);
      expect(arrDifference([1, 2, 3], []), [1, 2, 3]);
      expect(
          arrDifference([], [
            [1]
          ]),
          []);
      expect(
          arrDifference([
            'a',
            'b'
          ], [
            ['b']
          ]),
          ['a']);
      // Values are compared by value, so nested lists and maps are matched too.
      expect(
          arrDifference([
            [1],
            [2]
          ], [
            [
              [1]
            ]
          ]),
          [
            [2]
          ]);
      expect(
          arrDifference([
            {'a': 1},
            {'b': 2}
          ], [
            [
              {'a': 1}
            ]
          ]),
          [
            {'b': 2}
          ]);
      // `1` and `'1'` are different values.
      expect(
          arrDifference([
            1,
            '1'
          ], [
            [1]
          ]),
          ['1']);
      expect(
          arrDifference([
            null,
            0,
            1
          ], [
            [null]
          ]),
          [0, 1]);
      expect(
          arrDifference([
            double.nan,
            1
          ], [
            [double.nan]
          ]),
          [1]);
      expect(
          arrDifference(null, [
            [1]
          ]),
          []);
    });

    test('arrIntersection', () {
      expect(
          arrIntersection([
            [2, 1],
            [2, 3]
          ]),
          [2]);
      expect(
          arrIntersection([
            [1, 2, 3],
            [2, 3, 4],
            [3, 2]
          ]),
          [2, 3]);
      // The result is unique and keeps the order of the first array.
      expect(
          arrIntersection([
            [2, 1, 2],
            [2]
          ]),
          [2]);
      expect(
          arrIntersection([
            [3, 1, 2],
            [1, 2, 3]
          ]),
          [3, 1, 2]);
      expect(
          arrIntersection([
            [1, 2],
            [3]
          ]),
          []);
      expect(
          arrIntersection([
            [1, 1, 2]
          ]),
          [1, 2]);
      expect(arrIntersection([]), []);
      expect(arrIntersection(null), []);
      expect(
          arrIntersection([
            [],
            [1]
          ]),
          []);
      // Values are compared by value, so nested lists and maps are matched too.
      expect(
          arrIntersection([
            [
              [1],
              [2]
            ],
            [
              [2],
              [3]
            ]
          ]),
          [
            [2]
          ]);
      expect(
          arrIntersection([
            [
              {'a': 1},
              {'b': 2}
            ],
            [
              {'b': 2}
            ]
          ]),
          [
            {'b': 2}
          ]);
      // `1` and `'1'` are different values.
      expect(
          arrIntersection([
            [1, '1'],
            ['1']
          ]),
          ['1']);

      // `NaN` never equals itself, so the value cannot be matched with `expect` directly.
      final List<dynamic> nanResult = arrIntersection([
        [double.nan, 1],
        [double.nan]
      ]);

      expect(nanResult, hasLength(1));
      expect((nanResult[0] as double).isNaN, true);
    });
  });
}
