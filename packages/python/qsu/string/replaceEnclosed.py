import re

_SPECIAL_CHARACTERS = r'[.*+?^${}()|[\]\\]'


def replaceEnclosed(str: str, start: str, end: str, replaceWith: str = '') -> str:
	if not str:
		return ''

	startRegExp = '\\' + start if re.search(_SPECIAL_CHARACTERS, start) else start
	endRegExp = '\\' + end if re.search(_SPECIAL_CHARACTERS, end) else end

	return re.sub(startRegExp + '.*?' + endRegExp, replaceWith, str)
