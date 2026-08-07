from qsu.object import (
	objClone,
	objDeleteKeyByValue,
	objFindItemRecursiveByKey,
	objGet,
	objInvert,
	objMapKeys,
	objMerge,
	objMergeNewKey,
	objPick,
	objPickBy,
	objTo1d,
	objToArray,
	objToPrettyStr,
	objToQueryString,
	objUpdate,
)


def test_objToQueryString():
	assert objToQueryString({}) == ''
	assert (
		objToQueryString({'hello': 'world', 'test': 1234, 'arr': [1, 2, 3]})
		== 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
	)
	assert objToQueryString({'a': '=', 'b': '&', 'c': '%'}) == 'a=%3D&b=%26&c=%25'
	assert objToQueryString({'a': '가나다'}) == 'a=%EA%B0%80%EB%82%98%EB%8B%A4'


def test_objToPrettyStr():
	assert objToPrettyStr({}) == '{}'
	assert (
		objToPrettyStr({'a': 1, 'b': {'c': 1, 'd': 2}})
		== '{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
	)


def test_objFindItemRecursiveByKey():
	assert objFindItemRecursiveByKey({'a': 1, 'b': 2, 'c': 3}, 'a', 123, 'child') is None
	assert objFindItemRecursiveByKey(
		[
			{'a': 1, 'b': 2, 'c': 3},
			{'a': 2, 'b': 3, 'c': 4},
			{'a': 3, 'b': 4, 'c': 5},
			{'a': 4, 'b': 5, 'c': 6},
		],
		'a',
		3,
		'a',
	) == {'a': 3, 'b': 4, 'c': 5}
	assert objFindItemRecursiveByKey(
		{
			'a': {'a': {'a': 123}},
			'b': {'a': {}},
			'c': 3,
		},
		'a',
		123,
		'a',
	) == {'a': 123}
	assert objFindItemRecursiveByKey(
		{
			'id': 123,
			'child': [{'id': 456}, {'id': 789}],
		},
		'id',
		456,
		'child',
	) == {'id': 456}


def test_objToArray():
	assert objToArray({}) == []
	assert objToArray({'a': 1, 'b': 2, 'c': 3}) == [['a', 1], ['b', 2], ['c', 3]]
	assert objToArray(
		{
			'a': 1,
			'b': {'aa': 1, 'bb': 2, 'cc': {'aaa': 1}},
			'c': 3,
		},
		True,
	) == [
		['a', 1],
		['b', [['aa', 1], ['bb', 2], ['cc', [['aaa', 1]]]]],
		['c', 3],
	]
	assert objToArray(
		{
			'a': 1.234,
			'b': 'str',
			'c': [1, 2, 3],
			'd': {'a': 1},
		}
	) == [
		['a', 1.234],
		['b', 'str'],
		['c', [1, 2, 3]],
		['d', {'a': 1}],
	]


def test_objTo1d():
	assert objTo1d({}) == {}
	assert objTo1d({'a': 1, 'b': 2, 'c': 3}) == {'a': 1, 'b': 2, 'c': 3}
	assert objTo1d({'a': 1, 'b': {'aa': 1, 'bb': 2}, 'c': 3}) == {
		'a': 1,
		'b.aa': 1,
		'b.bb': 2,
		'c': 3,
	}
	assert objTo1d({'a': 1, 'b': {'aa': 1, 'bb': 2}, 'c': 3}, '=') == {
		'a': 1,
		'b=aa': 1,
		'b=bb': 2,
		'c': 3,
	}
	assert objTo1d(
		{
			'a': 1,
			'b': {'aa': {'aaa': {'aaaa': 1, 'bbbb': None}}, 'bb': 2},
			'c': 3,
		}
	) == {
		'a': 1,
		'b.aa.aaa.aaaa': 1,
		'b.aa.aaa.bbbb': None,
		'b.bb': 2,
		'c': 3,
	}


def test_objDeleteKeyByValue():
	assert objDeleteKeyByValue({}, 1) == {}
	assert objDeleteKeyByValue(
		{'a': 1, 'b': 2, 'c': 2, 'd': 3, 'e': 2, 'f': '2'}, 2
	) == {'a': 1, 'd': 3, 'f': '2'}
	assert objDeleteKeyByValue(
		{
			'a': 1,
			'b': 2,
			'c': {'aa': 2, 'bb': {'aaa': 1, 'bbb': 2, 'ccc': 2}},
			'd': 3,
			'e': {'aa': 2},
		},
		2,
		True,
	) == {
		'a': 1,
		'c': {'bb': {'aaa': 1}},
		'd': 3,
		'e': {},
	}
	assert objDeleteKeyByValue(
		{
			'a': 1,
			'b': 2,
			'c': {'aa': 2, 'bb': {'aaa': 1, 'bbb': 2, 'ccc': 2}},
			'd': 2,
			'e': {'aa': 2},
		},
		2,
	) == {
		'a': 1,
		'c': {'aa': 2, 'bb': {'aaa': 1, 'bbb': 2, 'ccc': 2}},
		'e': {'aa': 2},
	}


def test_objUpdate():
	assert objUpdate({}, 'a', 'test') == {}
	assert objUpdate({}, 'a', 'test', False, True) == {'a': 'test'}
	assert objUpdate({'a': 1, 'b': 2, 'c': 3}, 'c', 5) == {'a': 1, 'b': 2, 'c': 5}
	assert objUpdate(
		{
			'a': {'a': 1, 'b': 1, 'c': 1},
			'b': 2,
			'c': 3,
			'd': {'a': {'a': 0, 'b': 0, 'c': 1}, 'b': 4, 'c': 6},
		},
		'c',
		0,
		True,
		True,
	) == {
		'a': {'a': 1, 'b': 1, 'c': 0},
		'b': 2,
		'c': 0,
		'd': {'a': {'a': 0, 'b': 0, 'c': 0}, 'b': 4, 'c': 0},
	}
	assert objUpdate(
		{'a': 1, 'b': {'aa': 1, 'bb': {'aaa': 1, 'bbb': 2}}, 'c': 1}, 'bbb', 3, True
	) == {'a': 1, 'b': {'aa': 1, 'bb': {'aaa': 1, 'bbb': 3}}, 'c': 1}
	assert objUpdate(
		{'a': 1, 'b': {'a': 1, 'b': 2}, 'c': 3}, 'd', '1', True, True
	) == {'a': 1, 'b': {'a': 1, 'b': 2}, 'c': 3, 'd': '1'}


def test_objMergeNewKey():
	assert objMergeNewKey({'a': 1}, {}) == {'a': 1}
	assert objMergeNewKey({'a': 1}, {'a': 2}) == {'a': 2}
	assert objMergeNewKey({'a': 1}, {'b': 2}) == {'a': 1, 'b': 2}
	assert objMergeNewKey({'a': 1, 'c': 3}, {'b': 2, 'd': '4'}) == {
		'a': 1,
		'b': 2,
		'c': 3,
		'd': '4',
	}
	assert objMergeNewKey({'a': 1, 'c': 3}, {'b': [1, 2], 'd': None}) == {
		'a': 1,
		'b': [1, 2],
		'c': 3,
		'd': None,
	}
	assert objMergeNewKey(
		{'a': {'aa': 1}, 'b': 2}, {'a': {'bb': 2, 'cc': 3}, 'c': {'dd': 1}}
	) == {
		'a': {'aa': 1, 'bb': 2, 'cc': 3},
		'b': 2,
		'c': {'dd': 1},
	}
	assert objMergeNewKey(
		{'a': 1, 'b': {'ba': 1, 'bb': [1, 2]}},
		{'b': {'bb': [3], 'bc': 3}, 'c': 1},
	) == {
		'a': 1,
		'b': {'ba': 1, 'bb': [1, 2], 'bc': 3},
		'c': 1,
	}
	assert objMergeNewKey(
		{'a': 1, 'b': {'ba': 1, 'bb': [1, 2, 3, 4]}},
		{'b': {'bb': [5, 6, 7], 'bc': 3}, 'c': 1},
		{'arrayAction': 'append'},
	) == {
		'a': 1,
		'b': {'ba': 1, 'bb': [1, 2, 3, 4, 5, 6, 7], 'bc': 3},
		'c': 1,
	}
	assert objMergeNewKey(
		{'a': 1, 'b': {'ba': 1, 'bb': [1, 2, 3, 4]}},
		{'b': {'bb': [5, 6, 7], 'bc': 3}, 'c': 1},
		{'arrayAction': 'replace'},
	) == {
		'a': 1,
		'b': {'ba': 1, 'bb': [5, 6, 7], 'bc': 3},
		'c': 1,
	}
	assert objMergeNewKey(
		{'a': 1, 'b': {'ba': 1, 'bb': [1, 2, 3, 4]}},
		{'b': {'bb': [5, 6, 7], 'bc': 3}, 'c': 1},
		{'arrayAction': 'original'},
	) == {
		'a': 1,
		'b': {'ba': 1, 'bb': [1, 2, 3, 4], 'bc': 3},
		'c': 1,
	}
	assert objMergeNewKey(
		{'a': 1, 'b': {'ba': 1, 'bb': [[1, 2], [3, 4]]}},
		{'b': {'bb': [[5, 6], [7, 8]], 'bc': 3}, 'c': 1},
	) == {
		'a': 1,
		'b': {'ba': 1, 'bb': [[1, 2], [3, 4]], 'bc': 3},
		'c': 1,
	}
	assert objMergeNewKey(
		{'a': [{'aa': 1, 'bb': 2, 'cc': None}, {'aa': 4, 'bb': 5, 'cc': None}]},
		{'a': [{'cc': 3}, {'cc': 6}]},
	) == {
		'a': [{'aa': 1, 'bb': 2, 'cc': 3}, {'aa': 4, 'bb': 5, 'cc': 6}],
	}
	assert objMergeNewKey(
		{'a': [{'aa': 1, 'bb': 2}, {'aa': 4, 'bb': 5}]},
		{'a': [{'cc': 3}, {'cc': 6}]},
	) == {
		'a': [{'aa': 1, 'bb': 2, 'cc': 3}, {'aa': 4, 'bb': 5, 'cc': 6}],
	}


def test_objClone():
	source = {'a': 1, 'b': {'c': [1, 2, {'d': 3}]}}
	deep = objClone(source)

	assert deep == source
	assert deep['b'] is not source['b']
	assert deep['b']['c'] is not source['b']['c']
	deep['b']['c'][2]['d'] = 99
	assert source['b']['c'][2]['d'] == 3

	# `deep: False` copies the top level only, so the nested value is shared.
	shallow = objClone(source, {'deep': False})

	assert shallow is not source
	assert shallow['b'] is source['b']

	# Lists are cloned as lists.
	cloned = objClone([1, [2, 3]])

	assert cloned == [1, [2, 3]]
	assert isinstance(cloned, list)

	# A structure that points back at itself is rebuilt with the same shape.
	cyclic = {'name': 'root'}
	cyclic['self'] = cyclic

	clonedCyclic = objClone(cyclic)

	assert clonedCyclic['self'] is clonedCyclic
	assert clonedCyclic is not cyclic

	# Values that are not containers are handed back as they are.
	assert objClone(5) == 5
	assert objClone(None) is None
	assert objClone('abc') == 'abc'


def test_objMerge():
	assert objMerge({'a': 1}, {'b': 2}) == {'a': 1, 'b': 2}
	# The later source wins.
	assert objMerge({'a': 1}, {'a': 2}, {'a': 3}) == {'a': 3}
	# Nested dicts are merged rather than replaced.
	assert objMerge({'a': {'b': 1, 'c': 2}}, {'a': {'c': 9, 'd': 3}}) == {
		'a': {'b': 1, 'c': 9, 'd': 3}
	}
	# Lists are replaced whole, not merged index by index.
	assert objMerge({'a': [1, 2, 3]}, {'a': [9]}) == {'a': [9]}
	# A `None` replaces the dict that was there.
	assert objMerge({'a': {'b': 1}}, {'a': None}) == {'a': None}
	assert objMerge({'a': 1}) == {'a': 1}
	assert objMerge({}, {}) == {}
	assert objMerge() is None
	assert objMerge({'a': 1}, None) is None
	assert objMerge([1, 2]) is None

	# Neither source is modified, and the merged branch is a new dict.
	first = {'a': {'b': 1}}
	second = {'a': {'c': 2}}
	merged = objMerge(first, second)

	merged['a']['b'] = 99
	assert first == {'a': {'b': 1}}
	assert second == {'a': {'c': 2}}


def test_objGet():
	data = {'a': {'b': {'c': 42}}, 'list': [1, {'d': 'x'}], 'empty': None}

	assert objGet(data, 'a.b.c') == 42
	assert objGet(data, 'list[0]') == 1
	assert objGet(data, 'list[1].d') == 'x'
	assert objGet(data, 'list.1.d') == 'x'
	assert objGet(data, 'a.b') == {'c': 42}
	# A stored `None` is a value, not a missing path.
	assert objGet(data, 'empty') is None
	# Missing paths fall back.
	assert objGet(data, 'a.zzz') is None
	assert objGet(data, 'a.zzz', {'fallback': 'none'}) == 'none'
	assert objGet(data, 'a.b.c.d', fallback=0) == 0
	assert objGet(data, 'list[9]', {'fallback': 'none'}) == 'none'
	assert objGet(data, '', {'fallback': 'none'}) == 'none'
	assert objGet(None, 'a', {'fallback': 'none'}) == 'none'
	# A quoted bracket key keeps the dot inside it.
	assert objGet({'a.b': 1}, '["a.b"]') == 1
	assert objGet({'a.b': 1}, "['a.b']") == 1


def test_objPick():
	assert objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c']) == {'a': 1, 'c': 3}
	assert objPick({'a': 1, 'b': 2}, 'a') == {'a': 1}
	assert objPick({'a': 1, 'b': 2}, []) == {}
	# A key that is not there is skipped rather than added as `None`.
	assert objPick({'a': 1}, ['a', 'zzz']) == {'a': 1}
	assert objPick({'a': None}, 'a') == {'a': None}
	# The nested value is carried over as it is, and the source is not modified.
	source = {'a': {'b': 1}, 'c': 2}
	assert objPick(source, 'a') == {'a': {'b': 1}}
	assert source == {'a': {'b': 1}, 'c': 2}
	assert objPick(None, 'a') is None
	assert objPick('abc', 'a') is None


def test_objPickBy():
	assert objPickBy({'a': 1, 'b': 2, 'c': 3}, lambda value, key: value > 1) == {
		'b': 2,
		'c': 3,
	}
	assert objPickBy({'a': 1, 'b': 2}, lambda value, key: key == 'a') == {'a': 1}
	assert objPickBy({'a': None, 'b': 1}, lambda value, key: value is not None) == {'b': 1}
	assert objPickBy({'a': 1}, lambda value, key: False) == {}
	assert objPickBy({}, lambda value, key: True) == {}
	# Only the top level is inspected; a nested dict is carried over as it is.
	assert objPickBy(
		{'a': {'b': 1}, 'c': 2}, lambda value, key: isinstance(value, dict)
	) == {'a': {'b': 1}}
	assert objPickBy(None, lambda value, key: True) is None

	# The original object is not modified.
	original = {'a': 1, 'b': 2}

	objPickBy(original, lambda value, key: value > 1)
	assert original == {'a': 1, 'b': 2}


def test_objMapKeys():
	assert objMapKeys({'a': 1, 'b': 2}, lambda value, key: key.upper()) == {
		'A': 1,
		'B': 2,
	}
	assert objMapKeys({'a': 1, 'b': 2}, lambda value, key: f'{key}{value}') == {
		'a1': 1,
		'b2': 2,
	}
	# When two keys map onto the same name, the later one wins.
	assert objMapKeys({'a': 1, 'b': 2}, lambda value, key: 'x') == {'x': 2}
	assert objMapKeys({}, lambda value, key: key) == {}
	# The keys of a nested dict are left alone.
	assert objMapKeys({'a': {'b': 1}}, lambda value, key: key.upper()) == {'A': {'b': 1}}
	assert objMapKeys(None, lambda value, key: key) is None

	# The original object is not modified.
	original = {'a': 1}

	objMapKeys(original, lambda value, key: key.upper())
	assert original == {'a': 1}


def test_objInvert():
	assert objInvert({'a': 1, 'b': 2}) == {'1': 'a', '2': 'b'}
	assert objInvert({'a': 'x', 'b': 'y'}) == {'x': 'a', 'y': 'b'}
	# Two entries sharing a value land on the same key, so the later one wins.
	assert objInvert({'a': 1, 'b': 1}) == {'1': 'b'}
	assert objInvert({'a': True, 'b': None}) == {'true': 'a', 'null': 'b'}
	# A whole number is written without a fractional part in every language.
	assert objInvert({'a': 1.0, 'b': 1.5}) == {'1': 'a', '1.5': 'b'}
	assert objInvert({}) == {}
	assert objInvert(None) is None

	# The original object is not modified.
	original = {'a': 1}

	objInvert(original)
	assert original == {'a': 1}
