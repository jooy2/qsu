import time


def retry(func, options=None, **kwargs):
	opts = {**(options or {}), **kwargs}
	attempts = opts.get('attempts', 3)
	delay = opts.get('delay', 0)
	backoff = opts.get('backoff', 1)

	if attempts < 1:
		raise ValueError('`attempts` must be at least 1.')

	currentDelay = delay
	lastError = None

	for attempt in range(1, attempts + 1):
		try:
			return func()
		# `BaseException` is deliberately not caught, so `KeyboardInterrupt` and
		# `SystemExit` still stop the loop.
		except Exception as error:
			lastError = error

			# The delay sits *between* attempts, so the final failure is reported without
			# waiting one more time for nothing.
			if attempt < attempts:
				if currentDelay > 0:
					time.sleep(currentDelay / 1000)

				currentDelay *= backoff

	raise lastError
