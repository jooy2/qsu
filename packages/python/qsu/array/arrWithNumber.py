def arrWithNumber(start: int, end: int) -> list:
	if start > end:
		raise Exception('`end` is greater than `start`.')

	return list(range(start, end + 1))
