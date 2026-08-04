import time

import pytest

from qsu.misc import (
	debounce,
	funcTimes,
	logBox,
	retry,
	sleep,
	throttle,
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

	# Each burst of rapid calls must collapse into a single deferred call. The
	# gap after a burst is kept well above the 30ms debounce window so a loaded
	# CI runner still schedules the timer before the next burst (a tight margin
	# made this flaky on slow macOS runners).
	for _ in range(4):
		for _ in range(25):
			debounceFunc()

		time.sleep(0.2)

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


def test_throttle():
	calls = []
	throttled = throttle(lambda value: calls.append(value), 30)

	# The leading edge runs straight away; the rest collapse into one trailing call
	# carrying the most recent arguments.
	throttled(1)
	throttled(2)
	throttled(3)
	assert calls == [1]

	time.sleep(0.08)
	assert calls == [1, 3]


def test_throttle_leading_false():
	calls = []
	throttled = throttle(lambda value: calls.append(value), 30, leading=False)

	throttled(1)
	throttled(2)
	assert calls == []

	time.sleep(0.08)
	assert calls == [2]


def test_throttle_trailing_false():
	calls = []
	throttled = throttle(lambda value: calls.append(value), 30, {'trailing': False})

	throttled(1)
	throttled(2)

	time.sleep(0.08)
	assert calls == [1]


def test_retry():
	attempts = {'count': 0}

	def flaky():
		attempts['count'] += 1

		if attempts['count'] < 3:
			raise ValueError('nope')

		return 'ok'

	assert retry(flaky) == 'ok'
	assert attempts['count'] == 3


def test_retry_gives_up_and_raises_the_last_error():
	failures = {'count': 0}

	def always():
		failures['count'] += 1
		raise ValueError('always')

	with pytest.raises(ValueError, match='always'):
		retry(always, times=2)

	assert failures['count'] == 2

	# `times=1` disables retrying.
	once = {'count': 0}

	def onlyOnce():
		once['count'] += 1
		raise ValueError('x')

	with pytest.raises(ValueError):
		retry(onlyOnce, {'times': 1})

	assert once['count'] == 1

	with pytest.raises(ValueError, match='at least 1'):
		retry(lambda: 1, times=0)


def test_retry_backoff():
	# `backoff` multiplies the delay after every failure: 20ms, then 40ms.
	delayed = {'count': 0}

	def always():
		delayed['count'] += 1
		raise ValueError('x')

	started = time.monotonic()

	with pytest.raises(ValueError):
		retry(always, times=3, delay=20, backoff=2)

	assert delayed['count'] == 3
	assert (time.monotonic() - started) * 1000 >= 50
