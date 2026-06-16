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

	debounceFunc = debounce(lambda: debounceResult.append(True), 30)

	for _ in range(4):
		for _ in range(25):
			debounceFunc()

		time.sleep(0.08)

	assert debounceResult == [True, True, True, True]
	assert all(x is True for x in debounceResult)


def test_debounce_uses_latest_arguments():
	debounceResult = []

	debounceFunc = debounce(lambda *args, **kwargs: debounceResult.append((args, kwargs)), 10)

	debounceFunc('first', value=1)
	debounceFunc('second', value=2)
	time.sleep(0.03)

	assert debounceResult == [(('second',), {'value': 2})]


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
