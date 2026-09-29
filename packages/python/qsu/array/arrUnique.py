from ._comparableKey import _comparableKey


def arrUnique(array: list) -> list:
	seenKeys = set()
	result = []

	# Compared by value, as `arrDifference` and `arrIntersection` compare, so a dict or a nested
	# list with the same contents is a duplicate, and `1` and `1.0` are one value as they are in
	# JavaScript. The first of each is kept as it is rather than rebuilt from its JSON form.
	for item in array:
		key = _comparableKey(item)

		if key not in seenKeys:
			seenKeys.add(key)
			result.append(item)

	return result
