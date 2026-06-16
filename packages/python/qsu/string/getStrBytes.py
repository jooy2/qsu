def getStrBytes(str: str) -> int:
	if not str:
		return 0

	return len(str.encode('utf-8'))
