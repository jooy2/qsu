def contains(haystack, search, exact: bool = False) -> bool:
	if not isinstance(search, (list, tuple)):
		return False if len(haystack) < 1 else (search in haystack)

	for item in search:
		if exact:
			if haystack == item:
				return True
		elif item in haystack:
			return True

	return False
