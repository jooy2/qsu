def isLeapYear(year: int) -> bool:
	# The Gregorian rule, applied to every year including `0` and the negative ones, as the
	# proleptic calendar does.
	return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
