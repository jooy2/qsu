def clamp(value, min, max):
	# The upper bound is applied first and the lower bound second, so `min` wins when the
	# two are passed the wrong way round. Lodash resolves an inverted range the same way,
	# where Dart's built-in `num.clamp` throws instead.
	upper = max if value > max else value

	return min if upper < min else upper
