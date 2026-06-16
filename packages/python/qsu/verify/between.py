def between(range: list, number, inclusive: bool = False) -> bool:
	minM = min(range[0], range[1])
	maxM = max(range[0], range[1])

	if inclusive:
		return number >= minM and number <= maxM
	return number > minM and number < maxM
