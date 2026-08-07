def max(*args):
	val = args[0] if len(args) > 0 and isinstance(args[0], (list, tuple)) else args
	result = None

	for i in range(len(val)):
		value = val[i]

		# `bool` is a subclass of `int`, so it has to be rejected explicitly, as `sum` does.
		if not isinstance(value, (int, float)) or isinstance(value, bool):
			continue

		# `nan` loses every comparison, so it would win by being seen first and then never
		# being replaced.
		if value != value:
			continue

		if result is None or value > result:
			result = value

	return result
