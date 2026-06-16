import pytest

from qsu.array import (
	arrCount,
	arrGroupByMaxCount,
	arrMove,
	arrPick,
	arrRepeat,
	arrShuffle,
	arrTo1dArray,
	arrUnique,
	arrWithDefault,
	arrWithNumber,
	average,
	sortByObjectKey,
	sortNumeric,
)


def test_arrShuffle():
	assert arrShuffle([1, 2, 3, 4, 5, 6, 7, 8])
	assert arrShuffle([[1, 2], [3, 4], [5, 6], [7, 8]])
	assert arrShuffle([{'A': 1}, {'B': 2}, {'C': 3}, {'D': 4}])


def test_arrWithDefault():
	assert arrWithDefault('test') == []
	assert arrWithDefault('test', 10) == ['test'] * 10
	assert arrWithDefault(100, 5) == [100, 100, 100, 100, 100]


def test_arrUnique():
	big2dArray = [
		[10, 20, 30, 40, 50],
		[1, 2, 3, 4, 5],
		[6, 7, 8, 9, 0],
	]

	for _ in range(150000):
		big2dArray.append([1, 1, 1, 1, 1])
	for _ in range(150000):
		big2dArray.append([2, 2, 2, 2, 2])
	for _ in range(150000):
		big2dArray.append([3, 3, 3, 3, 3])

	assert arrUnique(big2dArray) == [
		[10, 20, 30, 40, 50],
		[1, 2, 3, 4, 5],
		[6, 7, 8, 9, 0],
		[1, 1, 1, 1, 1],
		[2, 2, 2, 2, 2],
		[3, 3, 3, 3, 3],
	]
	assert arrUnique([1, 1, 2, 2, 2, 2, 3]) == [1, 2, 3]
	assert arrUnique(['1', '2', '3', '3', '4']) == ['1', '2', '3', '4']
	assert arrUnique([1, '1', 1, 'a', 2, 'b']) == [1, '1', 'a', 2, 'b']
	assert arrUnique([[1, 2], [1, 2], [2, 3], [2, 3], [2, 3], [2, 4]]) == [
		[1, 2],
		[2, 3],
		[2, 4],
	]


def test_arrWithNumber():
	assert arrWithNumber(1, 2) == [1, 2]
	with pytest.raises(Exception):
		arrWithNumber(2, 1)
	assert arrWithNumber(0, 5) == [0, 1, 2, 3, 4, 5]
	assert arrWithNumber(1, 1) == [1]


def test_average():
	assert average([1, 3, 5, 7, 9]) == 5
	assert average([1, 5, 15, 50]) == 17.75
	assert average([5, -5]) == 0


def test_arrMove():
	assert arrMove([1, 3, 5, 7, 9], 0, 3) == [3, 5, 7, 1, 9]
	assert arrMove([5, 10, 15], 1, 2) == [5, 15, 10]
	assert arrMove([5, 10, 15], 1, 1) == [5, 10, 15]


def test_arrPick():
	assert arrPick([1]) == 1

	pickResult = arrPick([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])

	assert pickResult < 10
	assert isinstance(pickResult, int)
	assert arrPick([]) is None


def test_arrTo1dArray():
	assert arrTo1dArray([[1, 2, 3, 4], [5, 6, 7, 8]]) == [1, 2, 3, 4, 5, 6, 7, 8]
	assert arrTo1dArray([[1, 2, 3], 4, 5, [6, 7, 8]]) == [1, 2, 3, 4, 5, 6, 7, 8]
	assert arrTo1dArray([[1, 2], [[3, 4], [5, 6]], 7, [8]]) == [1, 2, 3, 4, 5, 6, 7, 8]
	assert arrTo1dArray([[[[1, 2, 3, 4, 5, 6]]], 7, 8]) == [1, 2, 3, 4, 5, 6, 7, 8]


def test_arrRepeat():
	assert arrRepeat([1, 2, 3, 4], 3) == [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
	assert arrRepeat({'a': 1, 'b': 2}, 5) == [
		{'a': 1, 'b': 2},
		{'a': 1, 'b': 2},
		{'a': 1, 'b': 2},
		{'a': 1, 'b': 2},
		{'a': 1, 'b': 2},
	]


def test_arrCount():
	assert arrCount([]) == {}
	assert arrCount([1, 2, 3, 3, 4, 5, 5, 5]) == {
		'1': 1,
		'2': 1,
		'3': 2,
		'4': 1,
		'5': 3,
	}
	assert arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']) == {
		'a': 4,
		'b': 2,
		'c': 1,
		'd': 1,
	}


def test_sortByObjectKey():
	obj = [
		{'aa': 1, 'bb': 'aaa', 'cc': 'hi1'},
		{'aa': 4, 'bb': 'ccc', 'cc': 'hi10'},
		{'aa': 2, 'bb': 'ddd', 'cc': 'hi2'},
		{'aa': 3, 'bb': 'bbb', 'cc': 'hi11'},
	]

	assert sortByObjectKey(obj, 'aa') == [
		{'aa': 1, 'bb': 'aaa', 'cc': 'hi1'},
		{'aa': 2, 'bb': 'ddd', 'cc': 'hi2'},
		{'aa': 3, 'bb': 'bbb', 'cc': 'hi11'},
		{'aa': 4, 'bb': 'ccc', 'cc': 'hi10'},
	]
	assert sortByObjectKey(obj, 'bb', True) == [
		{'aa': 2, 'bb': 'ddd', 'cc': 'hi2'},
		{'aa': 4, 'bb': 'ccc', 'cc': 'hi10'},
		{'aa': 3, 'bb': 'bbb', 'cc': 'hi11'},
		{'aa': 1, 'bb': 'aaa', 'cc': 'hi1'},
	]
	assert sortByObjectKey(obj, 'cc', False, True) == [
		{'aa': 1, 'bb': 'aaa', 'cc': 'hi1'},
		{'aa': 2, 'bb': 'ddd', 'cc': 'hi2'},
		{'aa': 4, 'bb': 'ccc', 'cc': 'hi10'},
		{'aa': 3, 'bb': 'bbb', 'cc': 'hi11'},
	]


def test_sortNumeric():
	assert sortNumeric([]) == []
	assert sortNumeric(['a', 'd', 'c', 'b']) == ['a', 'b', 'c', 'd']
	assert sortNumeric(
		['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']
	) == [
		'1',
		'1a',
		'a1a',
		'a2a',
		'a3a',
		'a11a',
		'aa1a',
		'b2a',
	]
	assert sortNumeric(['3', '1', '11', '100', '10', '2', '15']) == [
		'1',
		'2',
		'3',
		'10',
		'11',
		'15',
		'100',
	]


def test_arrGroupByMaxCount():
	assert arrGroupByMaxCount([1, 2, 3], 1) == [[1], [2], [3]]
	assert arrGroupByMaxCount([1, 2, [], 4, [[]]], 2) == [[1, 2], [[], 4], [[[]]]]
	assert arrGroupByMaxCount([1, 2, 3, 4], 5) == [[1, 2, 3, 4]]
	assert arrGroupByMaxCount([1, 1, 1, 1, 1, 1], 2) == [[1, 1], [1, 1], [1, 1]]
