import math


def _toKeyString(value) -> str:
	"""(Private) The text form a value takes when it becomes a key in `objInvert`.

	Python writes `None`, `True` and `False` differently from JavaScript and Dart, and has an
	int/float distinction that JavaScript does not, so those cases are spelled out to keep
	the three implementations in step.
	"""
	if value is None:
		return 'null'

	if isinstance(value, bool):
		return 'true' if value else 'false'

	if isinstance(value, float):
		if math.isnan(value):
			return 'NaN'
		if math.isinf(value):
			return 'Infinity' if value > 0 else '-Infinity'
		if value == int(value) and abs(value) < 1e18:
			return f'{int(value)}'

	return f'{value}'


def objInvert(obj):
	if not isinstance(obj, dict):
		return None

	# Top level only, like Lodash's `invert`. When two entries share a value, the later one
	# wins, because both land on the same key.
	return {_toKeyString(value): key for key, value in obj.items()}
