import re
from .toValidFilePath import toValidFilePath


def _nodeJoin(sep: str, paths) -> str:
	# Mirrors Node.js path.join: concatenate all non-empty segments with the
	# platform separator (it does NOT reset on absolute segments the way
	# Python's os.path.join does). Normalization is delegated to toValidFilePath.
	joined = ''

	for segment in paths:
		if not segment:
			continue
		if not joined:
			joined = segment
		else:
			joined += sep + segment

	if not joined:
		return '.'

	return joined


def joinFilePath(isWindows: bool, *paths: str) -> str:
	sep = '\\' if isWindows else '/'
	joined = _nodeJoin(sep, paths)

	if isWindows and joined:
		# Collapse interior duplicate separators (Node's normalize does this even
		# inside UNC tails, but Python's ntpath.normpath preserves them). The
		# leading UNC '\\\\' marker is preserved.
		prefix = ''
		rest = joined
		if rest.startswith('\\\\'):
			prefix = '\\\\'
			rest = rest[2:]
		rest = re.sub(r'\\{2,}', '\\\\', rest)
		joined = prefix + rest

	return toValidFilePath(joined, isWindows)
