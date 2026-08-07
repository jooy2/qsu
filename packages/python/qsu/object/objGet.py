def _parsePath(path: str) -> list:
	"""(Private) Turn `a.b[0].c` into `['a', 'b', '0', 'c']`. A bracket may carry a quoted
	key, so `a["b.c"]` reads one key `b.c` instead of two.
	"""
	segments = []
	pathLength = len(path)
	current = ''
	i = 0

	while i < pathLength:
		char = path[i]

		if char == '[':
			end = path.find(']', i)

			if end == -1:
				current += char
				i += 1
				continue

			if current != '':
				segments.append(current)
				current = ''

			inner = path[i + 1 : end]
			quote = inner[0] if inner else ''

			if len(inner) >= 2 and quote in ("'", '"') and inner.endswith(quote):
				inner = inner[1:-1]

			segments.append(inner)
			i = end + 1

			# `a[0].b` puts a dot right after the bracket, which would otherwise close an
			# empty segment and make the lookup miss.
			if i < pathLength and path[i] == '.':
				i += 1

			continue

		if char == '.':
			segments.append(current)
			current = ''
			i += 1
			continue

		current += char
		i += 1

	if current != '' or not segments:
		segments.append(current)

	return segments


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
