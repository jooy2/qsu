def strCount(str: str, search: str) -> int:
	if not str or not search:
		return 0

	count = 0
	pos = str.find(search)

	while pos > -1:
		count += 1
		pos = str.find(search, pos + len(search))

	return count
