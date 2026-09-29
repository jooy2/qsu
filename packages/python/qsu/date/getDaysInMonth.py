from .isLeapYear import isLeapYear

_DAYS_IN_MONTH = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)


def getDaysInMonth(year: int, month: int) -> int:
	# JavaScript has no int/float distinction, so a float holding a whole number is taken as
	# that number.
	if isinstance(month, float) and month.is_integer():
		month = int(month)

	# `bool` is a subclass of `int`, so it has to be rejected explicitly.
	if isinstance(month, bool) or not isinstance(month, int) or not 1 <= month <= 12:
		raise ValueError('`month` must be an integer from 1 to 12.')

	if month == 2 and isLeapYear(year):
		return 29

	return _DAYS_IN_MONTH[month - 1]
