from datetime import date as _date
from datetime import datetime


def dateToYYYYMMDD(date, separator: str = '-') -> str:
	if isinstance(date, datetime):
		year = date.year
		month = date.month
		day = date.day
	elif isinstance(date, _date):
		year = date.year
		month = date.month
		day = date.day
	else:
		raise TypeError('date must be a datetime or date instance')

	month_str = f'0{month}' if month < 10 else f'{month}'
	day_str = f'0{day}' if day < 10 else f'{day}'

	return f'{year}{separator}{month_str}{separator}{day_str}'
