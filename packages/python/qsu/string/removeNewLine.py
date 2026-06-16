import re


def removeNewLine(str: str, replaceTo: str = '') -> str:
	if not str:
		return ''

	return re.sub(r'(\r\n|\n|\r)', replaceTo, str).strip()
