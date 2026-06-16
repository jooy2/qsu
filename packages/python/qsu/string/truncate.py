def truncate(str: str, length: int, ellipsis: str = '') -> str:
	if not str:
		return ''

	convStr = str

	if len(str) > length:
		convStr = str[:length] + ellipsis

	return convStr
