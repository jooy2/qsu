import re


def _escape_multi(spl: str) -> str:
	return (
		spl.replace('\\', '\\\\')
		.replace('[', '\\[')
		.replace(']', '\\]')
		.replace('?', '\\?')
		.replace('.', '\\.')
		.replace('{', '\\{')
		.replace('}', '\\}')
		.replace('+', '\\+')
	)


def split(str: str, *separators) -> list:
	if not str:
		return []

	if len(separators) > 0 and isinstance(separators[0], (list, tuple)):
		separatorList = separators[0]
	else:
		separatorList = separators

	charPattern = ''
	strPattern = ''

	for spl in separatorList:
		if len(spl) > 1:
			strPattern += ('' if len(strPattern) < 1 else '|') + _escape_multi(spl)
		elif spl in ('-', '[', ']'):
			charPattern += '\\' + spl
		else:
			charPattern += spl

	if len(charPattern) < 1 and len(strPattern) < 1:
		return [str]

	if len(charPattern) > 0:
		charPattern = '[' + charPattern + ']'
		if len(strPattern) > 0:
			strPattern = '|' + strPattern

	return re.split(charPattern + strPattern + '+', str, flags=re.IGNORECASE)
