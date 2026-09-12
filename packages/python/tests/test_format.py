from qsu.format import (
	duration,
	durationParts,
	fileSizeFormat,
	fileSizeParts,
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


# Pins the output produced before `standard` and `unitDisplay` existed. Every case here
# has to keep reading exactly the same once an option is left out.
def test_fileSizeFormat_default_output_is_unchanged():
	assert fileSizeFormat(0) == '0 Bytes'
	assert fileSizeFormat(-1) == '0 Bytes'
	assert fileSizeFormat(0.5) == '0 Bytes'
	assert fileSizeFormat(1) == '1 Bytes'
	assert fileSizeFormat(1023) == '1023 Bytes'
	assert fileSizeFormat(1024) == '1 KB'
	assert fileSizeFormat(1025) == '1 KB'
	assert fileSizeFormat(1536) == '1.5 KB'
	assert fileSizeFormat(1048576) == '1 MB'
	assert fileSizeFormat(1073741824) == '1 GB'
	# A negative `decimals` is treated as zero, and trailing zeros are dropped.
	assert fileSizeFormat(1536, -1) == '2 KB'
	assert fileSizeFormat(1536, 0) == '2 KB'
	assert fileSizeFormat(1048576, 4) == '1 MB'
	# `ceil` ignores `decimals` entirely.
	assert fileSizeFormat(1025, 3, True) == '2 KB'
	# Naming a default explicitly changes nothing either.
	assert fileSizeFormat(1000000, standard='jedec') == '976.56 KB'
	assert fileSizeFormat(1000000, unitDisplay='short') == '976.56 KB'


def test_fileSizeFormat_standard():
	# 'jedec' is the default: a 1024 divisor labelled 'KB'.
	assert fileSizeFormat(1000000, standard='jedec') == '976.56 KB'
	# 'iec' keeps the 1024 divisor and uses the prefix that means 1024.
	assert fileSizeFormat(1000000, standard='iec') == '976.56 KiB'
	assert fileSizeFormat(1048576, standard='iec') == '1 MiB'
	# 'si' divides by 1000.
	assert fileSizeFormat(1000000, standard='si') == '1 MB'
	assert fileSizeFormat(1000, standard='si') == '1 kB'
	assert fileSizeFormat(1024, standard='si') == '1.02 kB'
	# The exponent 0 label carries no prefix, so it is the same in all three.
	assert fileSizeFormat(500, standard='si') == '500 Bytes'
	assert fileSizeFormat(500, standard='iec') == '500 Bytes'


def test_fileSizeFormat_unitDisplay():
	assert fileSizeFormat(1048576, unitDisplay='long') == '1 Megabyte'
	assert fileSizeFormat(1234567, unitDisplay='long') == '1.18 Megabytes'
	# The singular is decided by the rounded number, not the raw one.
	assert fileSizeFormat(1234567, 0, unitDisplay='long') == '1 Megabyte'
	assert fileSizeFormat(1, unitDisplay='long') == '1 Byte'
	assert fileSizeFormat(0, unitDisplay='long') == '0 Bytes'
	assert fileSizeFormat(1048576, standard='iec', unitDisplay='long') == '1 Mebibyte'


# The exponent used to run past the end of the unit table, which raised `IndexError`
# here and read as `1 undefined` in the JavaScript package.
def test_fileSizeFormat_beyond_the_largest_unit():
	assert fileSizeFormat(1024**8) == '1 YB'
	assert fileSizeFormat(1024**9) == '1024 YB'
	assert fileSizeFormat(1024**10) == '1048576 YB'


def test_fileSizeParts():
	assert fileSizeParts(0) == {'value': 0, 'unit': 'Bytes', 'exponent': 0}
	assert fileSizeParts(-1) == {'value': 0, 'unit': 'Bytes', 'exponent': 0}
	assert fileSizeParts(1) == {'value': 1, 'unit': 'Bytes', 'exponent': 0}
	assert fileSizeParts(1024) == {'value': 1, 'unit': 'KB', 'exponent': 1}
	assert fileSizeParts(1048576) == {'value': 1, 'unit': 'MB', 'exponent': 2}
	# The value is not rounded, so the caller's own formatter rounds it once.
	assert fileSizeParts(1234567) == {
		'value': 1234567 / 1024**2,
		'unit': 'MB',
		'exponent': 2,
	}
	assert fileSizeParts(1000000, standard='si') == {
		'value': 1,
		'unit': 'MB',
		'exponent': 2,
	}
	assert fileSizeParts(1048576, standard='iec') == {
		'value': 1,
		'unit': 'MiB',
		'exponent': 2,
	}
	assert fileSizeParts(1048576, unitDisplay='long') == {
		'value': 1,
		'unit': 'Megabyte',
		'exponent': 2,
	}
	assert fileSizeParts(1024**10) == {
		'value': 1024**2,
		'unit': 'YB',
		'exponent': 8,
	}


# `fileSizeFormat` is `fileSizeParts` with the number rounded and the unit appended, so
# the two must never disagree about the unit or the magnitude.
def test_fileSizeParts_agrees_with_fileSizeFormat():
	for standard in ['jedec', 'iec', 'si']:
		for size in [0, 1, 999, 1024, 1048576, 1234567, 10**12, 10**18, 1024**9]:
			parts = fileSizeParts(size, standard=standard)
			rounded = float(f"{parts['value']:.2f}")
			shown = int(rounded) if rounded.is_integer() else rounded

			assert fileSizeFormat(size, standard=standard) == f"{shown} {parts['unit']}"


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


def test_durationParts():
	assert durationParts(0) == []
	assert durationParts(604800000) == [{'value': 7, 'unit': 'Day'}]
	assert durationParts(1234567890) == [
		{'value': 14, 'unit': 'Day'},
		{'value': 6, 'unit': 'Hour'},
		{'value': 56, 'unit': 'Minute'},
		{'value': 7, 'unit': 'Second'},
	]
	assert durationParts(604800000, {'withZeroValue': True}) == [
		{'value': 7, 'unit': 'Day'},
		{'value': 0, 'unit': 'Hour'},
		{'value': 0, 'unit': 'Minute'},
		{'value': 0, 'unit': 'Second'},
	]
	assert durationParts(1234567890, {'maxUnitCount': 2}) == [
		{'value': 14, 'unit': 'Day'},
		{'value': 6, 'unit': 'Hour'},
	]
	# Single-unit mode keeps the fraction.
	assert durationParts(1500, {'unit': 'Second'}) == [{'value': 1.5, 'unit': 'Second'}]
	assert [p['unit'] for p in durationParts(90061001, {'withMilliSeconds': True})] == [
		'Day',
		'Hour',
		'Minute',
		'Second',
		'Millisecond',
	]
	# Options arrive as a dict or as keyword arguments, like the rest of the package.
	assert durationParts(1234567890, maxUnitCount=2) == durationParts(
		1234567890, {'maxUnitCount': 2}
	)


# `duration` is `durationParts` with each piece labelled and joined, so the two must never
# disagree about which units a duration is made of.
def test_durationParts_agrees_with_duration():
	for milliseconds in [0, 1000, 604800000, 1234567890, 90061001]:
		joined = ' '.join(
			f"{p['value']} {p['unit']}{'' if p['value'] == 1 else 's'}"
			for p in durationParts(milliseconds)
		)

		assert duration(milliseconds) == joined


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
