def isTrueAtLeast(conditions: list, count: int = 1) -> bool:
	trueCount = 0

	for condition in conditions:
		if type(condition) is bool and condition:
			trueCount += 1

	return trueCount >= count
