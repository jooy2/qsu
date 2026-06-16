import json

from ..verify.is2dArray import is2dArray


def arrUnique(array: list) -> list:
	if is2dArray(array):
		seen = set()
		result = []

		for item in array:
			key = json.dumps(item, separators=(',', ':'))

			if key not in seen:
				seen.add(key)
				result.append(json.loads(key))

		return result

	seen = []
	result = []

	for item in array:
		if not any(existing is item or (type(existing) is type(item) and existing == item) for existing in seen):
			seen.append(item)
			result.append(item)

	return result
