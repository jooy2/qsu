from ..verify.contains import contains
from .capitalizeFirst import capitalizeFirst

_STOP_WORDS = [
	'in',
	'on',
	'the',
	'at',
	'and',
	'or',
	'of',
	'for',
	'to',
	'that',
	'a',
	'by',
	'it',
	'is',
	'as',
	'are',
	'were',
	'was',
	'nor',
	'an',
]


def capitalizeEachWords(str: str, natural: bool = False) -> str:
	if not str:
		return ''

	tempStr = str.strip()

	if natural:
		tempStr = tempStr.lower()

	splitStr = tempStr.split(' ')

	for i in range(len(splitStr)):
		if not natural or not contains(splitStr[i], _STOP_WORDS, True):
			splitStr[i] = capitalizeFirst(splitStr[i])

	return capitalizeFirst(' '.join(splitStr))
