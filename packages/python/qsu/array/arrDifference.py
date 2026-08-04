from ._comparableKey import _comparableKey


def arrDifference(array, *others) -> list:
	if not isinstance(array, (list, tuple)):
		return []

	excluded = set()

	for other in others:
		if not isinstance(other, (list, tuple)):
			continue

		for value in other:
			excluded.add(_comparableKey(value))

	# Duplicates of a kept value stay, and the original order is preserved.
	return [value for value in array if _comparableKey(value) not in excluded]
