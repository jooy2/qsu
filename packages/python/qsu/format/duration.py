import math
from typing import Optional

# Descending order. 'ms' is the absolute number of milliseconds in one unit.
# A month is treated as 30 days and a year as 365 days.
_UNITS = [
	{'name': 'Year', 'short': 'Y', 'ms': 31536000000},
	{'name': 'Month', 'short': 'Mo', 'ms': 2592000000},
	{'name': 'Day', 'short': 'D', 'ms': 86400000},
	{'name': 'Hour', 'short': 'H', 'ms': 3600000},
	{'name': 'Minute', 'short': 'M', 'ms': 60000},
	{'name': 'Second', 'short': 'S', 'ms': 1000},
	{'name': 'Millisecond', 'short': 'ms', 'ms': 1},
]


def _numStr(value) -> str:
	if isinstance(value, float) and value.is_integer():
		return str(int(value))
	return str(value)


def _cleanNumber(value: float) -> float:
	# Drop floating point noise while keeping up to 6 decimals.
	return round(value, 6)


def _label(value, unit: dict, useShortString: bool, useSpace: bool) -> str:
	space = ' ' if useSpace else ''
	if useShortString:
		suffix = unit['short']
	else:
		suffix = f"{unit['name']}{'' if value == 1 else 's'}"
	return f"{_numStr(value)}{space}{suffix}"


def duration(milliseconds: float, options: Optional[dict] = None) -> str:
	opts = {**(options or {})}
	useShortString = opts.get('useShortString', False)
	useSpace = opts.get('useSpace', True)
	withZeroValue = opts.get('withZeroValue', False)
	separator = opts.get('separator', ' ')
	withMilliSeconds = opts.get('withMilliSeconds', False)
	maxUnitCount = opts.get('maxUnitCount', None)
	unit = opts.get('unit', None)

	# Single-unit mode: express the whole duration with one unit (fractions allowed).
	if unit:
		name = unit.lower()
		if name.endswith('s'):
			name = name[:-1]
		target = next((u for u in _UNITS if u['name'].lower() == name), None)
		if target:
			return _label(
				_cleanNumber(milliseconds / target['ms']),
				target,
				useShortString,
				useSpace,
			)

	activeUnits = _UNITS if withMilliSeconds else [u for u in _UNITS if u['name'] != 'Millisecond']
	values = []
	remaining = milliseconds

	for u in activeUnits:
		value = math.floor(remaining / u['ms'])
		remaining -= value * u['ms']
		values.append({'value': value, 'unit': u})

	# Skip leading units that are zero; keep interior/trailing zeros only when requested.
	firstNonZero = next((i for i, v in enumerate(values) if v['value'] != 0), -1)
	if firstNonZero == -1:
		return ''

	selected = values[firstNonZero:]
	if not withZeroValue:
		selected = [v for v in selected if v['value'] != 0]

	result = [_label(v['value'], v['unit'], useShortString, useSpace) for v in selected]

	if isinstance(maxUnitCount, int) and not isinstance(maxUnitCount, bool) and maxUnitCount >= 0:
		result = result[:maxUnitCount]

	return separator.join(result)
