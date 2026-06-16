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


def split(str: str, *splitter) -> list:
	if not str:
		return []

	if len(splitter) > 0 and isinstance(splitter[0], (list, tuple)):
		splitters = splitter[0]
	else:
		splitters = splitter

	charPattern = ''
	strPattern = ''

	for spl in splitters:
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
