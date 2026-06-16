def capitalizeFirst(str: str) -> str:
	if not str:
		return ''

	return str[0].upper() + str[1:]
