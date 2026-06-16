from qsu.format import (
	duration,
	fileSizeFormat,
	numberFormat,
	safeJSONParse,
	safeParseInt,
)


def test_numberFormat():
	assert numberFormat(0) == '0'
	assert numberFormat(1234) == '1,234'
	assert numberFormat(1234.5678) == '1,234.5678'
	assert numberFormat(1234.0) == '1,234'
	assert numberFormat(12345678) == '12,345,678'
	assert numberFormat(-123) == '-123'
	assert numberFormat(-12345678) == '-12,345,678'
	assert numberFormat(None) == ''
	assert numberFormat('123123') == '123,123'


def test_fileSizeFormat():
	assert fileSizeFormat(0) == '0 Bytes'
	assert fileSizeFormat(0.0, 0, True) == '0 Bytes'
	assert fileSizeFormat(1) == '1 Bytes'
	assert fileSizeFormat(1000000) == '976.56 KB'
	assert fileSizeFormat(100000000, 3) == '95.367 MB'
	assert fileSizeFormat(100000000, 3, True) == '96 MB'
	assert fileSizeFormat(123456789012, 0, True) == '115 GB'


def test_duration():
	assert duration(0) == ''
	assert duration(604800000) == '7 Days'
	assert (
		duration(604800000, {'withZeroValue': True})
		== '7 Days 0 Hour 0 Minute 0 Second 0 Millisecond'
	)
	assert duration(604800000, {'useSpace': False}) == '7Days'
	assert duration(604800000, {'useShortString': True}) == '7 D'
	assert duration(604800001, {'separator': '-'}) == '7 Days-1 Millisecond'
	assert (
		duration(1234567890, {'useSpace': True, 'useShortString': True})
		== '14 D 6 H 56 M 7 S 890 ms'
	)
	assert (
		duration(1234567890)
		== '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
	)


def test_safeJSONParse():
	assert safeJSONParse({}) == {}
	assert safeJSONParse('{}') == {}
	assert safeJSONParse('') == {}
	assert safeJSONParse(None) == {}
	assert safeJSONParse('{"a":1,"b":2}') == {'a': 1, 'b': 2}
	assert safeJSONParse('{"a":{"aa":1},"b":null}') == {'a': {'aa': 1}, 'b': None}


def test_safeParseInt():
	assert safeParseInt(None) == 0
	assert safeParseInt('', -1) == -1
	assert safeParseInt('0001234') == 1234
	assert safeParseInt('1.234.567') == 1
	assert safeParseInt('1234', 10) == 1234
	assert safeParseInt('1234', 0, 16) == 4660
