from datetime import date


def _kind(value) -> str:
	"""(Private) Which of the comparison rules in `isEqualDeep` a value falls under. Two
	values of different kinds are never equal, which is what keeps `True` from equaling `1`
	and a list from equaling a dict.
	"""
	if value is None:
		return 'null'

	# `bool` is a subclass of `int`, so it has to be answered before the numeric branch.
	if isinstance(value, bool):
		return 'boolean'

	if isinstance(value, (int, float)):
		return 'number'

	if isinstance(value, str):
		return 'string'

	# A list and a tuple are both what JavaScript calls an array.
	if isinstance(value, (list, tuple)):
		return 'array'

	if isinstance(value, dict):
		return 'object'

	# `datetime` is a subclass of `date`, so both land here and `==` decides between them.
	if isinstance(value, date):
		return 'date'

	return 'other'


def _compare(left, right, comparing: set) -> bool:
	"""(Private) `comparing` holds the ids of the container pairs being compared further up.
	Meeting one of them again means the structure points back at itself, and counting it as
	equal keeps a cycle from recursing until the recursion limit is hit.
	"""
	kind = _kind(left)

	if kind != _kind(right):
		return False

	if kind == 'number':
		# `nan` never equals itself, but two of them are the same value here.
		if left != left and right != right:
			return True

		return left == right

	if kind != 'array' and kind != 'object':
		return bool(left == right)

	pair = (id(left), id(right))

	if pair in comparing:
		return True

	if len(left) != len(right):
		return False

	comparing.add(pair)

	if kind == 'array':
		result = all(
			_compare(leftItem, rightItem, comparing)
			for leftItem, rightItem in zip(left, right)
		)
	else:
		# The lengths match, so when every key of `left` is in `right` the key sets match.
		result = all(
			key in right and _compare(value, right[key], comparing)
			for key, value in left.items()
		)

	comparing.discard(pair)

	return result


def isEqualDeep(left, right) -> bool:
	return _compare(left, right, set())
