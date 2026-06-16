import math
from typing import Optional


def _numStr(value: float) -> str:
	if isinstance(value, float) and value.is_integer():
		return str(int(value))
	return str(value)


def duration(milliseconds: float, options: Optional[dict] = None) -> str:
	opts = {**(options or {})}
	useShortString = opts.get('useShortString', False)
	useSpace = opts.get('useSpace', True)
	withZeroValue = opts.get('withZeroValue', False)
	separator = opts.get('separator', ' ')

	units = [
		{'name': 'Millisecond', 'short': 'ms', 'divider': 1000},
		{'name': 'Second', 'short': 'S', 'divider': 60},
		{'name': 'Minute', 'short': 'M', 'divider': 60},
		{'name': 'Hour', 'short': 'H', 'divider': 24},
		{'name': 'Day', 'short': 'D', 'divider': 31},
	]
	result = []
	currentMilliseconds = milliseconds

	for i in range(len(units)):
		unit = units[i]
		divideValue = currentMilliseconds % unit['divider']

		if i == len(units) - 1:
			divideValue = math.trunc(currentMilliseconds)
		else:
			currentMilliseconds = (currentMilliseconds - divideValue) / unit['divider']

		if withZeroValue or (not withZeroValue and divideValue != 0):
			if useShortString:
				suffix = unit['short']
			else:
				suffix = f"{unit['name']}{'' if divideValue < 2 else 's'}"
			result.append(f"{_numStr(divideValue)}{' ' if useSpace else ''}{suffix}")

	result.reverse()
	return separator.join(result)
