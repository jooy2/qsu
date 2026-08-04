import time


def retry(func, options=None, **kwargs):
	opts = {**(options or {}), **kwargs}
	times = opts.get('times', 3)
	delay = opts.get('delay', 0)
	backoff = opts.get('backoff', 1)

	if times < 1:
		raise ValueError('`times` must be at least 1.')

	currentDelay = delay
	lastError = None

	for attempt in range(1, times + 1):
		try:
			return func()
		# `BaseException` is deliberately not caught, so `KeyboardInterrupt` and
		# `SystemExit` still stop the loop.
		except Exception as error:
			lastError = error

			# The delay sits *between* attempts, so the final failure is reported without
			# waiting one more time for nothing.
			if attempt < times:
				if currentDelay > 0:
					time.sleep(currentDelay / 1000)

				currentDelay *= backoff

	raise lastError
