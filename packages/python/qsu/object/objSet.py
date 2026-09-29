import re

from ._parsePath import _parsePath

_DIGITS_ONLY_RE = re.compile(r'[0-9]+')


def _listIndex(container, segment: str) -> int:
	"""(Private) The index `segment` names in a list, from `0` up to its length, where the
	length appends. A list has no keys to add, and an index past the length would leave a
	hole, so anything else is an error.
	"""
	# `fullmatch` rather than `$`, which would also accept a trailing newline.
	if _DIGITS_ONLY_RE.fullmatch(segment) and int(segment) <= len(container):
		return int(segment)

	raise IndexError(f'`path` does not name an index of the list at `{segment}`.')


def _setIn(container, segments: list, position: int, value):
	"""(Private) A copy of `container` with `value` written at `segments[position:]`. Only
	the containers on the path are copied, and everything beside them is shared with the
	source.
	"""
	segment = segments[position]
	isLast = position == len(segments) - 1

	if isinstance(container, dict):
		copy = dict(container)

		if isLast:
			copy[segment] = value
			return copy

		child = container.get(segment)

		# A missing level, or a value that cannot hold a key, becomes a new dict. A new list
		# would need holes to reach an index, and the three languages represent those
		# differently.
		if not isinstance(child, (dict, list, tuple)):
			child = {}

		copy[segment] = _setIn(child, segments, position + 1, value)
		return copy

	index = _listIndex(container, segment)
	items = list(container)

	if isLast:
		entry = value
	else:
		child = container[index] if index < len(container) else None

		if not isinstance(child, (dict, list, tuple)):
			child = {}

		entry = _setIn(child, segments, position + 1, value)

	if index == len(items):
		items.append(entry)
	else:
		items[index] = entry

	# A tuple on the path stays a tuple, as it does in `objClone`.
	return tuple(items) if isinstance(container, tuple) else items


def objSet(obj, path, value):
	if not isinstance(obj, dict) or not isinstance(path, str):
		return None

	return _setIn(obj, _parsePath(path), 0, value)
