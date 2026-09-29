def arrWithNumber(start: int, end: int, options=None, **kwargs) -> list:
	opts = {**(options or {}), **kwargs}
	# `None` means "not given", as `undefined` and `null` do for the JavaScript option.
	step = opts.get('step')

	if step is None:
		step = 1

	if start > end:
		raise ValueError('`start` is greater than `end`.')

	# JavaScript has no int/float distinction, so a float holding a whole number is taken as
	# that number.
	if isinstance(step, float) and step.is_integer():
		step = int(step)

	# A step of zero or less never reaches `end`, and a fractional one would make the values
	# drift away from whole numbers. `bool` is a subclass of `int`, so it has to be rejected
	# explicitly.
	if isinstance(step, bool) or not isinstance(step, int) or step < 1:
		raise ValueError('`step` must be a positive integer.')

	return list(range(start, end + 1, step))
