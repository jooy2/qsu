import re

_SPECIAL_CHARACTERS = r'[.*+?^${}()|[\]\\]'


def replaceBetween(str: str, startChar: str, endChar: str, replaceWith: str = '') -> str:
	if not str:
		return ''

	startCharRegExp = (
		'\\' + startChar if re.search(_SPECIAL_CHARACTERS, startChar) else startChar
	)
	endCharRegExp = '\\' + endChar if re.search(_SPECIAL_CHARACTERS, endChar) else endChar

	return re.sub(startCharRegExp + '.*?' + endCharRegExp, replaceWith, str)
