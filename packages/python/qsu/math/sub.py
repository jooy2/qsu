def sub(*args):
	val = args[0] if len(args) > 0 and isinstance(args[0], (list, tuple)) else args
	total = val[0]

	for i in range(1, len(val)):
		if isinstance(val[i], (int, float)) and not isinstance(val[i], bool):
			total -= val[i]

	return total
