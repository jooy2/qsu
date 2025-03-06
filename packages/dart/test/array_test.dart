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
  });
}
