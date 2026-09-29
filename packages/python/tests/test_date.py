from datetime import datetime

import pytest

from qsu.date import (
	createDateListFromRange,
	dateToYYYYMMDD,
	dayDiff,
	getDaysInMonth,
	isLeapYear,
	isValidDate,
	today,
)


def test_dayDiff():
	assert dayDiff(datetime(2021, 1, 1), datetime(2021, 1, 2)) == 1
	assert dayDiff(datetime(2021, 1, 1), datetime(2021, 2, 28)) == 58


def test_today():
	now = datetime.now()
	month = f"{'0' if now.month < 10 else ''}{now.month}"
	day = f"{'0' if now.day < 10 else ''}{now.day}"
	year = str(now.year)

	assert today() == f'{year}-{month}-{day}'
	assert today('/') == f'{year}/{month}/{day}'
	assert today('/', False) == f'{month}/{day}/{year}'


def test_isValidDate():
	assert isValidDate('2021-01-01') is True
	assert isValidDate('2021-02-28') is True
	assert isValidDate('0024-01-01') is True
	assert isValidDate('9999-12-12') is True
	assert isValidDate('2024-02-29') is True
	assert isValidDate('0001-01-01') is False  # does not support validation
	assert isValidDate('2021-02-29') is False
	assert isValidDate('2021-03-32') is False
	assert isValidDate('2021-13-01') is False
	assert isValidDate('0000-01-01') is False


def test_isLeapYear():
	assert isLeapYear(2024) is True
	assert isLeapYear(2023) is False
	assert isLeapYear(1900) is False
	assert isLeapYear(2000) is True
	# The rule holds for year 0 and the negative years too.
	assert isLeapYear(0) is True
	assert isLeapYear(-4) is True
	assert isLeapYear(-100) is False


def test_getDaysInMonth():
	assert getDaysInMonth(2024, 2) == 29
	assert getDaysInMonth(2023, 2) == 28
	assert getDaysInMonth(1900, 2) == 28
	assert getDaysInMonth(2000, 2) == 29
	assert getDaysInMonth(2024, 1) == 31
	assert getDaysInMonth(2024, 4) == 30
	assert getDaysInMonth(2024, 12) == 31
	# A float holding a whole number is that number.
	assert getDaysInMonth(2024, 2.0) == 29

	for month in (0, 13, True, 1.5):
		with pytest.raises(ValueError) as error:
			getDaysInMonth(2024, month)
		assert str(error.value) == '`month` must be an integer from 1 to 12.'


def test_dateToYYYYMMDD():
	assert dateToYYYYMMDD(datetime(2023, 5, 15, 1, 1, 0)) == '2023-05-15'
	assert dateToYYYYMMDD(datetime(2023, 12, 31), '/') == '2023/12/31'


def test_createDateListFromRange():
	assert createDateListFromRange(
		datetime(2023, 1, 1, 1, 0, 0), datetime(2023, 1, 5, 1, 0, 0)
	) == ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05']

	assert createDateListFromRange(
		datetime(2023, 12, 30, 1, 0, 0), datetime(2023, 12, 30, 5, 0, 0)
	) == ['2023-12-30']

	assert createDateListFromRange(
		datetime(2023, 1, 30, 1, 0, 0), datetime(2023, 3, 5, 9, 0, 0)
	) == [
		'2023-01-30',
		'2023-01-31',
		'2023-02-01',
		'2023-02-02',
		'2023-02-03',
		'2023-02-04',
		'2023-02-05',
		'2023-02-06',
		'2023-02-07',
		'2023-02-08',
		'2023-02-09',
		'2023-02-10',
		'2023-02-11',
		'2023-02-12',
		'2023-02-13',
		'2023-02-14',
		'2023-02-15',
		'2023-02-16',
		'2023-02-17',
		'2023-02-18',
		'2023-02-19',
		'2023-02-20',
		'2023-02-21',
		'2023-02-22',
		'2023-02-23',
		'2023-02-24',
		'2023-02-25',
		'2023-02-26',
		'2023-02-27',
		'2023-02-28',
		'2023-03-01',
		'2023-03-02',
		'2023-03-03',
		'2023-03-04',
		'2023-03-05',
	]
