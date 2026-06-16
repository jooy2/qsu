from qsu.math import (
	div,
	mul,
	numPick,
	numUnique,
	sub,
	sum,
)


def test_numPick():
	assert isinstance(numPick(1, 60), int) is True
	for _ in range(50):
		offset_test = numPick(5, 10)
		assert offset_test >= 5 and offset_test <= 10


def test_numUnique():
	assert isinstance(numUnique(), int) is True

	uniq_sets = set()

	for _ in range(100):
		uniq = numUnique()

		if uniq in uniq_sets:
			raise Exception('Duplicate number generated')
		else:
			uniq_sets.add(uniq)


def test_sum():
	assert sum(0) == 0
	assert sum(1, 2, 3, 4) == 10
	assert sum([1, 2, 3]) == 6
	assert sum(1234) == 1234


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
