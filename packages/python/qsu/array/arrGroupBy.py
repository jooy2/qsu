from .._toKeyString import _toKeyString


def arrGroupBy(array, callback) -> dict:
	if not isinstance(array, (list, tuple)):
		return {}

	result: dict = {}

	# The key is written as JavaScript's `String()` writes it, so `1.0`, `True` and `None`
	# become `'1'`, `'true'` and `'null'`, as they do in the JavaScript and Dart packages. A
	# dict keeps insertion order, so the groups come out in the order their key was first seen.
	for item in array:
		result.setdefault(_toKeyString(callback(item)), []).append(item)

	return result
