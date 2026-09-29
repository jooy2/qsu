def average(array: list) -> float:
	# An empty list has no average. `nan` is what JavaScript's `0 / 0` gives, where dividing
	# by zero here would raise instead.
	if len(array) == 0:
		return float('nan')

	return sum(array) / len(array)
