import math
from typing import Optional

# Descending order. 'ms' is the absolute number of milliseconds in one unit.
# A month is treated as 30 days and a year as 365 days.
_UNITS: list = [
	{'name': 'Year', 'short': 'Y', 'ms': 31536000000},
	{'name': 'Month', 'short': 'Mo', 'ms': 2592000000},
	{'name': 'Day', 'short': 'D', 'ms': 86400000},
	{'name': 'Hour', 'short': 'H', 'ms': 3600000},
	{'name': 'Minute', 'short': 'M', 'ms': 60000},
	{'name': 'Second', 'short': 'S', 'ms': 1000},
	{'name': 'Millisecond', 'short': 'ms', 'ms': 1},
]


def _cleanNumber(value: float) -> float:
	# Drop floating point noise while keeping up to 6 decimals.
	return round(value, 6)


def _findUnit(name: str) -> Optional[dict]:
	wanted = name.lower()

	if wanted.endswith('s'):
		wanted = wanted[:-1]

	return next((u for u in _UNITS if u['name'].lower() == wanted), None)


def durationParts(milliseconds: float, options: Optional[dict] = None, **kwargs) -> list:
	opts = {**(options or {}), **kwargs}
	withZeroValue = opts.get('withZeroValue', False)
	withMilliSeconds = opts.get('withMilliSeconds', False)
	maxUnitCount = opts.get('maxUnitCount', None)
	unit = opts.get('unit', None)

	# Single-unit mode: express the whole duration with one unit (fractions allowed).
	if unit:
		target = _findUnit(unit)

		if target:
			return [
				{'value': _cleanNumber(milliseconds / target['ms']), 'unit': target['name']}
			]

	activeUnits = _UNITS if withMilliSeconds else [u for u in _UNITS if u['name'] != 'Millisecond']
	values = []
	remaining = milliseconds

	for u in activeUnits:
		value = math.floor(remaining / u['ms'])
		remaining -= value * u['ms']
		values.append({'value': value, 'unit': u['name']})

	# Skip leading units that are zero; keep interior/trailing zeros only when requested.
	firstNonZero = next((i for i, v in enumerate(values) if v['value'] != 0), -1)

	if firstNonZero == -1:
		return []

	selected = values[firstNonZero:]

	if not withZeroValue:
		selected = [v for v in selected if v['value'] != 0]

	if isinstance(maxUnitCount, int) and not isinstance(maxUnitCount, bool) and maxUnitCount >= 0:
		return selected[:maxUnitCount]

	return selected
