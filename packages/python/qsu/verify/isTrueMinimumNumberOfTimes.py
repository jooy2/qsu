def isTrueMinimumNumberOfTimes(conditions: list, minimumCount: int = 1) -> bool:
	trueCount = 0

	for condition in conditions:
		if type(condition) is bool and condition:
			trueCount += 1

	return trueCount >= minimumCount
