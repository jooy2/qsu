import math
from typing import Optional

_DECIMAL_LONG_UNITS = [
	'Byte',
	'Kilobyte',
	'Megabyte',
	'Gigabyte',
	'Terabyte',
	'Petabyte',
	'Exabyte',
	'Zettabyte',
	'Yottabyte',
]

# 'jedec' divides by 1024 and labels the result 'KB', which is what this package has
# always done. 'iec' keeps the 1024 divisor and uses the prefixes that actually mean
# 1024, and 'si' is the decimal one. The exponent 0 label stays 'Bytes' everywhere,
# because no prefix is involved there.
_STANDARDS: dict = {
	'jedec': {
		'base': 1024,
		'short': ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		'long': _DECIMAL_LONG_UNITS,
	},
	'iec': {
		'base': 1024,
		'short': ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
		'long': [
			'Byte',
			'Kibibyte',
			'Mebibyte',
			'Gibibyte',
			'Tebibyte',
			'Pebibyte',
			'Exbibyte',
			'Zebibyte',
			'Yobibyte',
		],
	},
	'si': {
		'base': 1000,
		'short': ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		'long': _DECIMAL_LONG_UNITS,
	},
}


def _unitTable(standard: Optional[str]) -> dict:
	return _STANDARDS.get(standard or '', _STANDARDS['jedec'])


def _unitLabel(table: dict, exponent: int, unitDisplay: Optional[str], value: float) -> str:
	# The short label is a fixed string, so `1` reads as `1 Bytes` exactly as it always
	# has. The long label is new, so it takes the singular the way `duration` does.
	if unitDisplay != 'long':
		return table['short'][exponent]

	return f"{table['long'][exponent]}{'' if value == 1 else 's'}"


def _sizeExponent(bytes: float, base: int, unitCount: int) -> int:
	# Clamp instead of running off the end of the table: the exponent for a value past
	# the largest unit used to index past it, which raised `IndexError` here and read as
	# `undefined` in the JavaScript package.
	return min(math.floor(math.log(bytes) / math.log(base)), unitCount - 1)


def fileSizeParts(
	bytes: float,
	standard: Optional[str] = None,
	unitDisplay: Optional[str] = None,
) -> dict:
	table = _unitTable(standard)

	if bytes < 1:
		return {'value': 0, 'unit': _unitLabel(table, 0, unitDisplay, 0), 'exponent': 0}

	exponent = _sizeExponent(bytes, table['base'], len(table['short']))
	value = bytes / table['base'] ** exponent

	return {
		'value': value,
		'unit': _unitLabel(table, exponent, unitDisplay, value),
		'exponent': exponent,
	}
