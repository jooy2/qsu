from ..verify.isPlainObject import isPlainObject


def arrRepeat(array, count: int) -> list:
	if not array or count < 1 or not isinstance(array, (list, tuple, dict)):
		return []

	isObj = isPlainObject(array)
	result = []

	for _ in range(count):
		if isObj:
			result.append(array)
		else:
			result.extend(array)

	return result
