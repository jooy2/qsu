import time

from qsu.misc import (
	debounce,
	funcTimes,
	logBox,
	sleep,
)


def test_sleep():
	start = time.monotonic()
	result = sleep(100)
	elapsed = (time.monotonic() - start) * 1000

	assert result is None
	assert elapsed >= 90


def test_funcTimes():
	def sayHello(str=None):
		return f"Hello{str or ''}"

	assert funcTimes(2, sayHello) == ['Hello', 'Hello']
	assert funcTimes(3, sayHello()) == ['Hello', 'Hello', 'Hello']
	assert funcTimes(4, lambda: sayHello('!')) == ['Hello!', 'Hello!', 'Hello!', 'Hello!']


def test_debounce():
	debounceResult = []

	debounceFunc = debounce(lambda: debounceResult.append(True), 5)

	# Repeatedly call within the wait window; only the final call after each
	# quiet period should fire. Three 10ms gaps create separate fire windows.
	for i in range(100):
		if i in (25, 50, 75):
			waitDelay = 10
		else:
			waitDelay = 1

		debounceFunc()
		time.sleep((waitDelay / 1000))

	# Wait for the last pending timer to fire.
	time.sleep(0.05)

	# Within the burst we get one fire per quiet gap that exceeds the timeout
	# plus the final trailing call. The exact count is timing-dependent, but it
	# must be far fewer than the 100 invocations and at least one.
	assert 1 <= len(debounceResult) <= 10
	assert all(x is True for x in debounceResult)


def test_logBox(capsys):
	logBox(1, 2, 3, 4, 5)
	captured = capsys.readouterr()
	out = captured.out

	assert out != ''
	assert '┌' in out
	assert '┘' in out
	assert '#' in out
	assert 'value' in out
	# Each numbered index should be present.
	for i in range(5):
		assert str(i) in out


def test_logBox_no_arguments(capsys):
	logBox()
	captured = capsys.readouterr()

	assert '(no arguments)' in captured.out
