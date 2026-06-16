import random


def numPick(min: int, max: int) -> int:
	if not min and not max:
		return 1 if random.random() > 0.5 else 0

	limit = min if not max else max
	offset = None if (not max or min >= max) else min

	return int(random.random() * ((limit - offset + 1) if offset else (limit + 1))) + (
		offset or 0
	)
