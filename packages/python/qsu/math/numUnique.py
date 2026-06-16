import random
import time


def numUnique() -> int:
	seed = [n + 10000 for n in range(89999)]

	return int(
		str(int(time.time() * 1000)) + str(seed[int(random.random() * len(seed))])
	)
