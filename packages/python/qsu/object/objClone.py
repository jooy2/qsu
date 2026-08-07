def _cloneValue(value, seen):
	"""(Private) Copy a value, remembering every container already copied so a structure
	that points back at itself is rebuilt with the same shape instead of recursing until
	the recursion limit is hit.

	Containers are keyed by `id`, because two equal but distinct dicts must still be copied
	separately. The originals stay reachable from the argument, so their ids cannot be
	reused while the copy is running.
	"""
	if isinstance(value, dict):
		if id(value) in seen:
			return seen[id(value)]

		copy = {}
		seen[id(value)] = copy

		for key, entry in value.items():
			copy[key] = _cloneValue(entry, seen)

		return copy

	if isinstance(value, list):
		if id(value) in seen:
			return seen[id(value)]

		copy = []
		seen[id(value)] = copy

		for entry in value:
			copy.append(_cloneValue(entry, seen))

		return copy

	if isinstance(value, tuple):
		# A tuple cannot be filled in after the fact, so it cannot take part in a cycle
		# either: whatever it holds already existed when it was built.
		return tuple(_cloneValue(entry, seen) for entry in value)

	if isinstance(value, set):
		# Every member of a set is hashable and therefore immutable, so the members
		# themselves do not need copying.
		return set(value)

	# A `datetime` is immutable, and a class instance cannot be rebuilt without knowing how
	# it was made, so both are handed back as they are.
	return value


def objClone(obj, options=None, **kwargs):
	opts = {**(options or {}), **kwargs}

	if not opts.get('deep', True):
		if isinstance(obj, dict):
			return dict(obj)

		if isinstance(obj, list):
			return list(obj)

		if isinstance(obj, tuple):
			return tuple(obj)

		if isinstance(obj, set):
			return set(obj)

		return obj

	return _cloneValue(obj, {})
