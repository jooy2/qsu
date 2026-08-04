import threading
import time


def _now() -> float:
	# A monotonic clock, so a system clock adjustment cannot open or close a window early.
	return time.monotonic() * 1000


def throttle(func, wait: int, options=None, **kwargs):
	opts = {**(options or {}), **kwargs}
	leading = opts.get('leading', True)
	trailing = opts.get('trailing', True)

	# `previous` is `None` while no window is open, so the next call opens one.
	state = {'previous': None, 'timer': None, 'args': None, 'kwargs': None}
	lock = threading.Lock()

	def later():
		with lock:
			# With `leading: False` the next call has to open a fresh window rather than run
			# straight away.
			state['previous'] = _now() if leading else None
			state['timer'] = None
			pendingArgs = state['args']
			pendingKwargs = state['kwargs']
			state['args'] = None
			state['kwargs'] = None

		if pendingArgs is not None:
			func(*pendingArgs, **pendingKwargs)

	def throttled(*args, **callKwargs):
		shouldRun = False

		with lock:
			now = _now()

			if state['previous'] is None and not leading:
				state['previous'] = now

			# `remaining > wait` catches a clock that stepped backwards.
			remaining = 0 if state['previous'] is None else wait - (now - state['previous'])

			state['args'] = args
			state['kwargs'] = callKwargs

			if remaining <= 0 or remaining > wait:
				if state['timer'] is not None:
					state['timer'].cancel()
					state['timer'] = None

				state['previous'] = now
				state['args'] = None
				state['kwargs'] = None
				shouldRun = True
			elif state['timer'] is None and trailing:
				timer = threading.Timer(remaining / 1000, later)
				timer.daemon = True
				state['timer'] = timer
				timer.start()

		# Called outside the lock, so the function is free to call the wrapper again.
		if shouldRun:
			func(*args, **callKwargs)

	return throttled
