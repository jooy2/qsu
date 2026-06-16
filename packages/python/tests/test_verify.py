from qsu.verify import (
	between,
	contains,
	is2dArray,
	isEmail,
	isEmpty,
	isEqual,
	isEqualStrict,
	isObject,
	isTrueMinimumNumberOfTimes,
	isUrl,
	len,
)


def test_isObject():
	assert isObject('{}') is False
	assert isObject(True) is False
	assert isObject(False) is False
	assert isObject(None) is False
	assert isObject(1) is False
	assert isObject([]) is False
	assert isObject(lambda: '123') is False
	assert isObject({}) is True
	assert isObject([1, 2]) is False
	assert isObject([{'a': 1, 'b': 2}]) is False
	assert isObject({'a': 1, 'b': 2}) is True
	assert isObject({'a': {}, 'b': []}) is True


def test_isEqual():
	val1 = 'abc'
	val2 = 'abc'
	val3 = 'abc'

	assert isEqual(1, [1, 2, 3]) is False
	assert isEqual('abc', [val1, val2, val3]) is True
	assert isEqual('123', ['123', 123]) is True
	assert isEqual(123, '123', 123) is True


def test_isEqualStrict():
	val1 = 'abc'
	val2 = 'abc'
	val3 = 'abc'

	assert isEqualStrict(1, [1, 2, 3, 4, 5]) is False
	assert isEqualStrict('abc', [val1, val2, val3]) is True
	assert isEqualStrict('123', ['123', 123]) is False
	assert isEqualStrict('123', ['123', '123']) is True
	assert isEqualStrict(123, '123', 123) is False


def test_isEmpty():
	assert isEmpty('') is True
	assert isEmpty('1234') is False
	assert isEmpty(1234) is False
	assert isEmpty(1.234) is False
	assert isEmpty(None) is True
	assert isEmpty([]) is True
	assert isEmpty([{}]) is False
	assert isEmpty([[]]) is False
	assert isEmpty(['1234']) is False
	assert isEmpty({}) is True
	assert isEmpty({'a': '1234'}) is False


def test_isUrl():
	assert isUrl('') is False
	assert isUrl('https://') is False
	assert isUrl('www.google.com') is False
	assert isUrl('www.google.com', True) is True
	assert isUrl('https://google.com') is True
	assert isUrl('https://google.com', True) is True
	assert isUrl('https://google') is True
	assert isUrl('https://google', False, True) is False
	assert isUrl('https://google.com?query=qsu') is True


def test_contains():
	assert contains('12345', '3') is True
	assert contains('12345', '10') is False
	assert contains('ABC', ['A', 'B', 'C']) is True
	assert contains('ABC', ['D', 'E', 'F']) is False
	assert contains('ABC', ['AB', 'C'], True) is False
	assert contains('AB', ['AB', 'C', 'D'], True) is True


def test_is2dArray():
	assert is2dArray([]) is False
	assert is2dArray([[], []]) is True
	assert is2dArray([{'a': 1}, {'b': 2}]) is False
	assert is2dArray([[1], [2]]) is True


def test_between():
	assert between([1, 10], 1) is False
	assert between([1, 10], 1, True) is True
	assert between([10, 100], 11) is True


def test_len():
	assert len('12345') == 5
	assert len(12345) == 5
	assert len(lambda: '123') == 3
	assert len([1, 2, 3, 4]) == 4
	assert len({'hello': 'world', 'lorem': 'ipsum'}) == 2
	assert len([{'hello': 1, 'world': 2}, {'lorem': 3}]) == 2


def test_isEmail():
	assert isEmail('1@1.com') is True
	assert isEmail('abc@def.ghi') is True
	assert isEmail('Abc@def.ghi', True) is False  # Case-sensitive
	assert isEmail('Abc@def.ghi') is True
	assert isEmail('abc@Def.ghi') is True
	assert isEmail('abc@def.Ghi') is True
	assert isEmail('ABC@DEF.GHI') is True
	assert isEmail('abc@sub.domain.com') is True
	assert isEmail('a.bc@d.ef') is True
	assert isEmail('a-12_34@b-12-34.net') is True
	assert isEmail('@b1234.net') is False
	assert isEmail('a1234@b1234') is False
	assert isEmail('a_1234@b_1234.net') is False
	assert isEmail('abc@@def.com') is False
	assert isEmail('11.com') is False
	assert isEmail('sub.domain.com') is False
	assert isEmail('1@1@a.com') is False
	assert isEmail('a.com@a') is False


def test_isTrueMinimumNumberOfTimes():
	left = 2
	right1 = 1 + 1
	right2 = 2 + 1

	assert isTrueMinimumNumberOfTimes([True, False, False]) is True
	assert isTrueMinimumNumberOfTimes([True, True], 1) is True
	assert isTrueMinimumNumberOfTimes([True, False, True], 2) is True
	assert isTrueMinimumNumberOfTimes([True, False, True], 1) is True
	assert (
		isTrueMinimumNumberOfTimes([left == right1, False, True, True, False], 3)
		is True
	)
	assert (
		isTrueMinimumNumberOfTimes([left == right2, False, True, True, False], 3)
		is False
	)
