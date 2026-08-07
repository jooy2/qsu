from .words import words


def strToConstantCase(str: str) -> str:
	if not str:
		return ''

	# `upper()` applies the full Unicode case mapping here and in JavaScript, where Dart
	# applies the simple one, so `ß` becomes `SS` in two of the three languages. The
	# difference is documented rather than papered over.
	return '_'.join(word.upper() for word in words(str))
