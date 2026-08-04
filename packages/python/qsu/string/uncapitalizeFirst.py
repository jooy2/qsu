def uncapitalizeFirst(str: str) -> str:
	if not str:
		return ''

	return str[0].lower() + str[1:]
