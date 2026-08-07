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

    test('objMerge', () {
      expect(
          objMerge([
            {'a': 1},
            {'b': 2}
          ]),
          {'a': 1, 'b': 2});
      // The later source wins.
      expect(
          objMerge([
            {'a': 1},
            {'a': 2},
            {'a': 3}
          ]),
          {'a': 3});
      // Nested maps are merged rather than replaced.
      expect(
          objMerge([
            {
              'a': {'b': 1, 'c': 2}
            },
            {
              'a': {'c': 9, 'd': 3}
            }
          ]),
          {
            'a': {'b': 1, 'c': 9, 'd': 3}
          });
      // Lists are replaced whole, not merged index by index.
      expect(
          objMerge([
            {
              'a': [1, 2, 3]
            },
            {
              'a': [9]
            }
          ]),
          {
            'a': [9]
          });
      // A `null` replaces the map that was there.
      expect(
          objMerge([
            {
              'a': {'b': 1}
            },
            {'a': null}
          ]),
          {'a': null});
      expect(
          objMerge([
            {'a': 1}
          ]),
          {'a': 1});
      expect(objMerge([{}, {}]), {});
      expect(objMerge([]), isNull);
      expect(
          objMerge([
            {'a': 1},
            null
          ]),
          isNull);

      // Neither source is modified, and the merged branch is a new map.
      final first = {
        'a': {'b': 1}
      };
      final second = {
        'a': {'c': 2}
      };
      final merged = objMerge([first, second])!;

      (merged['a'] as Map)['b'] = 99;
      expect(first, {
        'a': {'b': 1}
      });
      expect(second, {
        'a': {'c': 2}
      });
    });

    test('objGet', () {
      final data = {
        'a': {
          'b': {'c': 42}
        },
        'list': [
          1,
          {'d': 'x'}
        ],
        'empty': null
      };

      expect(objGet(data, 'a.b.c'), 42);
      expect(objGet(data, 'list[0]'), 1);
      expect(objGet(data, 'list[1].d'), 'x');
      expect(objGet(data, 'list.1.d'), 'x');
      expect(objGet(data, 'a.b'), {'c': 42});
      // A stored `null` is a value, not a missing path.
      expect(objGet(data, 'empty'), isNull);
      // Missing paths fall back.
      expect(objGet(data, 'a.zzz'), isNull);
      expect(objGet(data, 'a.zzz', fallback: 'none'), 'none');
      expect(objGet(data, 'a.b.c.d', fallback: 0), 0);
      expect(objGet(data, 'list[9]', fallback: 'none'), 'none');
      expect(objGet(data, '', fallback: 'none'), 'none');
      expect(objGet(null, 'a', fallback: 'none'), 'none');
      // A quoted bracket key keeps the dot inside it.
      expect(objGet({'a.b': 1}, '["a.b"]'), 1);
      expect(objGet({'a.b': 1}, "['a.b']"), 1);
    });

    test('objPick', () {
      expect(objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c']), {'a': 1, 'c': 3});
      expect(objPick({'a': 1, 'b': 2}, 'a'), {'a': 1});
      expect(objPick({'a': 1, 'b': 2}, []), {});
      // A key that is not there is skipped rather than added as `null`.
      expect(objPick({'a': 1}, ['a', 'zzz']), {'a': 1});
      expect(objPick({'a': null}, 'a'), {'a': null});
      // The nested value is carried over as it is, and the source is not modified.
      final source = {
        'a': {'b': 1},
        'c': 2
      };
      expect(objPick(source, 'a'), {
        'a': {'b': 1}
      });
      expect(source, {
        'a': {'b': 1},
        'c': 2
      });
      expect(objPick(null, 'a'), isNull);
    });

    test('objPickBy', () {
      expect(objPickBy({'a': 1, 'b': 2, 'c': 3}, (value, key) => value > 1),
          {'b': 2, 'c': 3});
      expect(objPickBy({'a': 1, 'b': 2}, (value, key) => key == 'a'), {'a': 1});
      expect(objPickBy({'a': null, 'b': 1}, (value, key) => value != null),
          {'b': 1});
      expect(objPickBy({'a': 1}, (value, key) => false), {});
      expect(objPickBy({}, (value, key) => true), {});
      // Only the top level is inspected; a nested map is carried over as it is.
      expect(
          objPickBy({
            'a': {'b': 1},
            'c': 2
          }, (value, key) => value is Map),
          {
            'a': {'b': 1}
          });
      expect(objPickBy(null, (value, key) => true), null);

      // The original object is not modified.
      final Map<String, dynamic> original = {'a': 1, 'b': 2};

      objPickBy(original, (value, key) => value > 1);
      expect(original, {'a': 1, 'b': 2});
    });

    test('objMapKeys', () {
      expect(objMapKeys({'a': 1, 'b': 2}, (value, key) => key.toUpperCase()),
          {'A': 1, 'B': 2});
      expect(objMapKeys({'a': 1, 'b': 2}, (value, key) => '$key$value'),
          {'a1': 1, 'b2': 2});
      // When two keys map onto the same name, the later one wins.
      expect(objMapKeys({'a': 1, 'b': 2}, (value, key) => 'x'), {'x': 2});
      expect(objMapKeys({}, (value, key) => key), {});
      // The keys of a nested map are left alone.
      expect(
          objMapKeys({
            'a': {'b': 1}
          }, (value, key) => key.toUpperCase()),
          {
            'A': {'b': 1}
          });
      expect(objMapKeys(null, (value, key) => key), null);

      // The original object is not modified.
      final Map<String, dynamic> original = {'a': 1};

      objMapKeys(original, (value, key) => key.toUpperCase());
      expect(original, {'a': 1});
    });

    test('objInvert', () {
      expect(objInvert({'a': 1, 'b': 2}), {'1': 'a', '2': 'b'});
      expect(objInvert({'a': 'x', 'b': 'y'}), {'x': 'a', 'y': 'b'});
      // Two entries sharing a value land on the same key, so the later one wins.
      expect(objInvert({'a': 1, 'b': 1}), {'1': 'b'});
      expect(objInvert({'a': true, 'b': null}), {'true': 'a', 'null': 'b'});
      // A whole number is written without a fractional part in every language.
      expect(objInvert({'a': 1.0, 'b': 1.5}), {'1': 'a', '1.5': 'b'});
      expect(objInvert({}), {});
      expect(objInvert(null), null);

      // The original object is not modified.
      final Map<String, dynamic> original = {'a': 1};

      objInvert(original);
      expect(original, {'a': 1});
    });
  });
}
