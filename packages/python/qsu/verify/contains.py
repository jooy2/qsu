def contains(str, search, exact: bool = False) -> bool:
	if not isinstance(search, (list, tuple)):
		return False if len(str) < 1 else (search in str)

	for item in search:
		if exact:
			if str == item:
				return True
		elif item in str:
			return True

	return False
