from ..verify.isObject import isObject


def objDeleteKeyByValue(obj, searchValue, recursive=False):
	if not isinstance(obj, dict):
		return None

	# Work on a copy. `newObj = obj` modified the caller's dict in place.
	newObj = dict(obj)

	# Start at the last index. Starting at `len(keys)` read one index past the end, which
	# is why the guard below existed at all.
	keys = list(newObj.keys())

	for i in range(len(keys) - 1, -1, -1):
		key = keys[i]

		if recursive and newObj.get(key) is not None and isObject(newObj[key]):
			newObj[key] = objDeleteKeyByValue(newObj[key], searchValue, recursive)
		elif _strictEqual(newObj.get(key), searchValue):
			del newObj[key]

	return newObj


def _strictEqual(a, b) -> bool:
	if isinstance(a, bool) != isinstance(b, bool):
		return False
	return a == b
