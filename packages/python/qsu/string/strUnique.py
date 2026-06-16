def strUnique(str: str) -> str:
	if not str:
		return ''

	return ''.join(dict.fromkeys(str))
