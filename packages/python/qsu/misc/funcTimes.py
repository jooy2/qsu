def funcTimes(times: int, iteratee) -> list:
	results = []

	for _i in range(times):
		if callable(iteratee):
			results.append(iteratee())
		else:
			results.append(iteratee)

	return results
