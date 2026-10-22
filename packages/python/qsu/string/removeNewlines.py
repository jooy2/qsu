import re


def removeNewlines(str: str, replaceWith: str = '') -> str:
	if not str:
		return ''

	return re.sub(r'(\r\n|\n|\r)', replaceWith, str).strip()
