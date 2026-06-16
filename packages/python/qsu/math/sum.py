def sum(*args):
	val = args[0] if len(args) > 0 and isinstance(args[0], (list, tuple)) else args
	total = 0

	for i in range(len(val)):
		if isinstance(val[i], (int, float)) and not isinstance(val[i], bool):
			total += val[i]

	return total
