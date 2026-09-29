from ._parsePath import _parsePath


def objGet(obj, path, options=None, **kwargs):
	opts = {**(options or {}), **kwargs}
	fallback = opts.get('fallback', None)

	if not isinstance(obj, dict) or not isinstance(path, str):
		return fallback

	current = obj

	for segment in _parsePath(path):
		# The presence of the key decides, not the value behind it, so a stored `None` is
		# returned as it is instead of being replaced by the fallback.
		if isinstance(current, dict):
			if segment not in current:
				return fallback

			current = current[segment]
			continue

		if isinstance(current, (list, tuple)):
			try:
				index = int(segment)
			except ValueError:
				return fallback

			if index < 0 or index >= len(current):
				return fallback

			current = current[index]
			continue

		return fallback

	return current
