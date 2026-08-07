from ._capitalizeWord import _capitalizeWord
from .words import words


def strToCamelCase(str: str) -> str:
	if not str:
		return ''

	return ''.join(
		word.lower() if index == 0 else _capitalizeWord(word)
		for index, word in enumerate(words(str))
	)
