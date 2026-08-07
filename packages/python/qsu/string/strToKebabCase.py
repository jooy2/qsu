from .words import words


def strToKebabCase(str: str) -> str:
	if not str:
		return ''

	return '-'.join(word.lower() for word in words(str))
