from ._capitalizeWord import _capitalizeWord
from .words import words


def strToPascalCase(str: str) -> str:
	if not str:
		return ''

	return ''.join(_capitalizeWord(word) for word in words(str))
