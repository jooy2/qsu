from ._comparableKey import _comparableKey


def arrIntersection(*arrays) -> list:
	if len(arrays) < 1 or not isinstance(arrays[0], (list, tuple)):
		return []

	otherKeys = []

	for other in arrays[1:]:
		# A non-array argument shares no value with anything, so the result is empty.
		if not isinstance(other, (list, tuple)):
			return []

		otherKeys.append({_comparableKey(value) for value in other})

	seen = set()
	result = []

	for value in arrays[0]:
		key = _comparableKey(value)

		if key in seen:
			continue

		seen.add(key)

		if all(key in keys for keys in otherKeys):
			result.append(value)

	return result
