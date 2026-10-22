from qsu.math import (
	ceil,
	clamp,
	div,
	floor,
	mul,
	numMax,
	numMin,
	numRandom,
	numRound,
	numSum,
	numUniqueId,
	sub,
)


def test_ceil():
	assert ceil(4.006) == 5
	assert ceil(4) == 4
	assert ceil(-4.006) == -4
	assert ceil(6.004, 2) == 6.01
	assert ceil(6040, -2) == 6100
	assert ceil(1.1, 1) == 1.1
	assert ceil(-0.5) == 0
	assert ceil(0) == 0
	assert ceil(float('nan')) != ceil(float('nan'))
	assert ceil(float('inf')) == float('inf')


def test_clamp():
	assert clamp(5, 1, 10) == 5
	assert clamp(1, 1, 10) == 1
	assert clamp(10, 1, 10) == 10
	assert clamp(-7, 1, 10) == 1
	assert clamp(42, 1, 10) == 10
	assert clamp(1.5, 0, 1) == 1
	assert clamp(-1.5, -1, 1) == -1
	# An inverted range resolves to `min`, because the upper bound is applied first.
	assert clamp(5, 10, 1) == 10


def test_numRandom():
	assert isinstance(numRandom(1, 60), int) is True
	for _ in range(50):
		offset_test = numRandom(5, 10)
		assert offset_test >= 5 and offset_test <= 10


def test_numUniqueId():
	assert isinstance(numUniqueId(), int) is True

	uniq_sets = set()

	for _ in range(100):
		uniq = numUniqueId()

		if uniq in uniq_sets:
			raise Exception('Duplicate number generated')
		else:
			uniq_sets.add(uniq)


def test_numRound():
	assert numRound(0.5) == 1
	assert numRound(2.5) == 3
	assert numRound(-0.5) == -1
	assert numRound(-1.5) == -2
	assert numRound(1.4) == 1
	assert numRound(-1.4) == -1
	assert numRound(1.005, 2) == 1.01
	assert numRound(2.675, 2) == 2.68
	assert numRound(1234, -2) == 1200
	assert numRound(4.006, 2) == 4.01
	assert numRound(1.1, 1) == 1.1
	assert numRound(0) == 0
	assert numRound(-0.4) == 0
	assert numRound(float('nan')) != numRound(float('nan'))
	assert numRound(float('inf')) == float('inf')


def test_numSum():
	assert numSum(0) == 0
	assert numSum(1, 2, 3, 4) == 10
	assert numSum([1, 2, 3]) == 6
	assert numSum(1234) == 1234


def test_floor():
	assert floor(4.006) == 4
	assert floor(4) == 4
	assert floor(-4.006) == -5
	assert floor(0.046, 2) == 0.04
	assert floor(4060, -2) == 4000
	assert floor(1.1, 1) == 1.1
	assert floor(-0.5) == -1
	assert floor(0) == 0
	assert floor(float('nan')) != floor(float('nan'))
	assert floor(float('-inf')) == float('-inf')


def test_numMax():
	assert numMax(1, 2, 3) == 3
	assert numMax([4, 2, 8, 6]) == 8
	assert numMax(-4, -2, -8) == -2
	assert numMax(1.5, 1.25) == 1.5
	assert numMax(7) == 7
	assert numMax([]) is None
	assert numMax() is None
	assert numMax([float('nan'), 5]) == 5
	assert numMax(['a', 3, None]) == 3


def test_numMin():
	assert numMin(1, 2, 3) == 1
	assert numMin([4, 2, 8, 6]) == 2
	assert numMin(-4, -2, -8) == -8
	assert numMin(1.5, 1.25) == 1.25
	assert numMin(7) == 7
	assert numMin([]) is None
	assert numMin() is None
	assert numMin([float('nan'), 5]) == 5
	assert numMin(['a', 3, None]) == 3


def test_mul():
	assert mul(0) == 0
	assert mul(1, 2, 3, 4) == 24
	assert mul([1, 2, 3]) == 6
	assert mul(1, 5, 7, 0, 9) == 0
	assert mul(1234) == 1234


def test_sub():
	assert sub(0) == 0
	assert sub(100, 10, 20, 30) == 40
	assert sub([10, 20, 30]) == -40
	assert sub(1, 3, 5, -7, -9) == 9
	assert sub(1234) == 1234


def test_div():
	assert div(0) == 0
	assert div(100, 2, 2, 5) == 5
	assert div([10, 2, 5]) == 1
	assert div(1234) == 1234
