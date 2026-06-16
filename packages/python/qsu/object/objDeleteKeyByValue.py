from ..verify.isObject import isObject


def objDeleteKeyByValue(obj, searchValue, recursive=False):
	if not isinstance(obj, dict):
		return None

	newObj = obj

	keys = list(newObj.keys())

	for i in range(len(keys), -1, -1):
		key = keys[i] if 0 <= i < len(keys) else None

		if key is None:
			continue

		if recursive and newObj.get(key) is not None and isObject(newObj[key]):
			objDeleteKeyByValue(newObj[key], searchValue, recursive)
		elif _strictEqual(newObj.get(key), searchValue):
			del newObj[key]

	return newObj


def _strictEqual(a, b) -> bool:
	if isinstance(a, bool) != isinstance(b, bool):
		return False
	return a == b
