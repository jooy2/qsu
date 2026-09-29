def _parsePath(path: str) -> list:
	"""(Private) Turn `a.b[0].c` into `['a', 'b', '0', 'c']`. A bracket may carry a quoted
	key, so `a["b.c"]` reads one key `b.c` instead of two. `objGet` and `objSet` share it,
	so a path reads the same way in both.
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
