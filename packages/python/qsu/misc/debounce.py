import threading


def debounce(func, timeout: int):
	state = {'timer': None, 'version': 0}
	lock = threading.Lock()

	def run(version, args, kwargs):
		with lock:
			if version != state['version']:
				return

		func(*args, **kwargs)

	def debounced(*args, **kwargs):
		with lock:
			if state['timer'] is not None:
				state['timer'].cancel()

			state['version'] += 1
			timer = threading.Timer(timeout / 1000, run, args=(state['version'], args, kwargs))
			timer.daemon = True
			state['timer'] = timer
			timer.start()

	return debounced
