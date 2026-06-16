import threading


def debounce(func, timeout: int):
	state = {'timer': None}

	def debounced(*args):
		if state['timer'] is not None:
			state['timer'].cancel()

		state['timer'] = threading.Timer(timeout / 1000, func)
		state['timer'].start()

	return debounced
