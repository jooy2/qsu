import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Object', () {
    test('objToQueryString', () {
      expect(objDeleteKeyByValue({}, 1), {});
      expect(
          objDeleteKeyByValue(
              {'a': 1, 'b': 2, 'c': 2, 'd': 3, 'e': 2, 'f': '2'}, 2),
          {'a': 1, 'd': 3, 'f': '2'});
      expect(
          objDeleteKeyByValue({
            'a': 1,
            'b': 2,
            'c': {
              'aa': 2,
              'bb': {'aaa': 1, 'bbb': 2, 'ccc': 2}
            },
            'd': 3,
            'e': {'aa': 2}
          }, 2, recursive: true),
          {
            'a': 1,
            'c': {
              'bb': {'aaa': 1}
            },
            'd': 3,
            'e': {}
          });
      expect(
          objDeleteKeyByValue({
            'a': 1,
            'b': 2,
            'c': {
              'aa': 2,
              'bb': {'aaa': 1, 'bbb': 2, 'ccc': 2}
            },
            'd': 2,
            'e': {'aa': 2}
          }, 2),
          {
            'a': 1,
            'c': {
              'aa': 2,
              'bb': {'aaa': 1, 'bbb': 2, 'ccc': 2}
            },
            'e': {'aa': 2}
          });
    });

    test('objToQueryString', () {
      expect(objToQueryString({}), '');
      expect(
          objToQueryString({
            'hello': 'world',
            'test': 1234,
            'arr': [1, 2, 3]
          }),
          'hello=world&test=1234&arr=%5B1%2C2%2C3%5D');
      expect(objToQueryString({'a': '=', 'b': '&', 'c': '%'}),
          'a=%3D&b=%26&c=%25');
      expect(objToQueryString({'a': '가나다'}), 'a=%EA%B0%80%EB%82%98%EB%8B%A4');
    });

    test('objToArray', () {
      expect(objToArray({}), []);
      expect(objToArray({'a': 1, 'b': 2, 'c': 3}), [
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
      expect(
          objToArray({
            'a': 1,
            'b': {
              'aa': 1,
              'bb': 2,
              'cc': {'aaa': 1}
            },
            'c': 3
          }, recursive: true),
          [
            ['a', 1],
            [
              'b',
              [
                ['aa', 1],
                ['bb', 2],
                [
                  'cc',
                  [
                    ['aaa', 1]
                  ]
                ]
              ]
            ],
            ['c', 3]
          ]);
      expect(
          objToArray({
            'a': 1.234,
            'b': 'str',
            'c': [1, 2, 3],
            'd': {'a': 1}
          }),
          [
            ['a', 1.234],
            ['b', 'str'],
            [
              'c',
              [1, 2, 3]
            ],
            [
              'd',
              {'a': 1}
            ]
          ]);
    });

    test('objTo1d', () {
      expect(objTo1d({}), {});
      expect(objTo1d({'a': 1, 'b': 2, 'c': 3}), {'a': 1, 'b': 2, 'c': 3});
      expect(
          objTo1d({
            'a': 1,
            'b': {'aa': 1, 'bb': 2},
            'c': 3
          }),
          {'a': 1, 'b.aa': 1, 'b.bb': 2, 'c': 3});
      expect(
          objTo1d({
            'a': 1,
            'b': {'aa': 1, 'bb': 2},
            'c': 3
          }, separator: '='),
          {'a': 1, 'b=aa': 1, 'b=bb': 2, 'c': 3});
      expect(
          objTo1d({
            'a': 1,
            'b': {
              'aa': {
                'aaa': {'aaaa': 1, 'bbbb': null}
              },
              'bb': 2
            },
            'c': 3
          }),
          {
            'a': 1,
            'b.aa.aaa.aaaa': 1,
            'b.aa.aaa.bbbb': null,
            'b.bb': 2,
            'c': 3
          });
    });
  });
}
