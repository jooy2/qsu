from .words import words


def strToSnakeCase(str: str) -> str:
	if not str:
		return ''

	return '_'.join(word.lower() for word in words(str))
