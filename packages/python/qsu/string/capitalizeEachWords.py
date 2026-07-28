from .capitalizeFirst import capitalizeFirst

# A set, so the lookup below is O(1) instead of a linear scan through `contains`.
_STOP_WORDS = frozenset([
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
])


def capitalizeEachWords(str: str, natural: bool = False) -> str:
	if not str:
		return ''

	tempStr = str.strip()

	if natural:
		tempStr = tempStr.lower()

	splitStr = tempStr.split(' ')

	for i in range(len(splitStr)):
		if not natural or splitStr[i] not in _STOP_WORDS:
			splitStr[i] = capitalizeFirst(splitStr[i])

	return capitalizeFirst(' '.join(splitStr))
