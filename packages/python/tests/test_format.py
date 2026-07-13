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
	# Milliseconds are hidden by default (withMilliSeconds defaults to False).
	assert duration(1234567890) == '14 Days 6 Hours 56 Minutes 7 Seconds'
	# Grammatically correct plurals: 0 -> plural, 1 -> singular.
	assert (
		duration(604800000, {'withZeroValue': True})
		== '7 Days 0 Hours 0 Minutes 0 Seconds'
	)
	assert duration(90000000) == '1 Day 1 Hour'
	# Interior zero units are dropped unless withZeroValue is set.
	assert duration(86700000) == '1 Day 5 Minutes'
	assert duration(604800000, {'useSpace': False}) == '7Days'
	assert duration(604800000, {'useShortString': True}) == '7 D'


def test_duration_months_and_years():
	# A month is 30 days, a year is 365 days.
	assert duration(2592000000) == '1 Month'
	assert duration(3456000000) == '1 Month 10 Days'
	assert duration(31536000000) == '1 Year'
	assert duration(34560000000) == '1 Year 1 Month 5 Days'
	# Month short is `Mo` to avoid clashing with Minute (`M`).
	assert duration(34560000000, {'useShortString': True}) == '1 Y 1 Mo 5 D'


def test_duration_with_milliseconds():
	assert (
		duration(1234567890, {'withMilliSeconds': True})
		== '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
	)
	assert (
		duration(
			1234567890,
			{'withMilliSeconds': True, 'useSpace': True, 'useShortString': True},
		)
		== '14 D 6 H 56 M 7 S 890 ms'
	)
	assert (
		duration(604800001, {'withMilliSeconds': True, 'separator': '-'})
		== '7 Days-1 Millisecond'
	)


def test_duration_max_unit_count():
	assert duration(34560000000, {'maxUnitCount': 2}) == '1 Year 1 Month'
	assert duration(1234567890, {'maxUnitCount': 1}) == '14 Days'
	assert (
		duration(1234567890, {'withMilliSeconds': True, 'maxUnitCount': 3})
		== '14 Days 6 Hours 56 Minutes'
	)


def test_duration_single_unit():
	assert duration(172800000, {'unit': 'Hour'}) == '48 Hours'
	assert duration(1800000, {'unit': 'Hour'}) == '0.5 Hours'
	assert duration(3600000, {'unit': 'Hour'}) == '1 Hour'
	assert duration(86400000, {'unit': 'Minute'}) == '1440 Minutes'
	assert duration(86400000, {'unit': 'Day'}) == '1 Day'
	# Plural forms and casing are accepted.
	assert duration(172800000, {'unit': 'hours'}) == '48 Hours'
	assert duration(172800000, {'unit': 'Hour', 'useShortString': True}) == '48 H'


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
