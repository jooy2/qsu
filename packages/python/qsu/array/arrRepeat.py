from ..verify.isObject import isObject


def arrRepeat(array, count: int) -> list:
	if not array or count < 1 or not isinstance(array, (list, tuple, dict)):
		return []

	isObj = isObject(array)
	result = []

	for _ in range(count):
		if isObj:
			result.append(array)
		else:
			result.extend(array)

	return result
