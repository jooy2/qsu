import math


def _isFalsy(value) -> bool:
	# The rejected set is spelled out rather than left to Python's own truthiness, so all
	# three languages agree on exactly which values are dropped. Empty containers are
	# truthy in JavaScript and are therefore kept here as well.
	if value is None or value is False:
		return True

	if isinstance(value, str):
		return value == ''

	if isinstance(value, bool):
		return False

	if isinstance(value, (int, float)):
		if isinstance(value, float) and math.isnan(value):
			return True
		return value == 0

	return False


def arrCompact(array) -> list:
	if not isinstance(array, (list, tuple)):
		return []

	return [value for value in array if not _isFalsy(value)]
