def times(count: int, iteratee) -> list:
	results = []

	for _i in range(count):
		if callable(iteratee):
			results.append(iteratee())
		else:
			results.append(iteratee)

	return results
