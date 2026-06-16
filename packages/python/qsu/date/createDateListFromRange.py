import math
import re
from datetime import datetime

from .dateToYYYYMMDD import dateToYYYYMMDD
from .isValidDate import isValidDate

_YEAR_END_RE = re.compile(r'[0-9]{4}-12-31')


def createDateListFromRange(startDate: datetime, endDate: datetime):
	if not isValidDate(dateToYYYYMMDD(startDate)) or not isValidDate(
		dateToYYYYMMDD(endDate)
	):
		raise ValueError('Either the start date or end date is an invalid date.')

	date_diff = math.floor((endDate.timestamp() - startDate.timestamp()) / 86400)

	if date_diff < 0:
		raise ValueError('The start date is more recent than the end date.')

	end_date_str = dateToYYYYMMDD(endDate)
	all_date = []
	current_year = startDate.year
	current_month = startDate.month
	current_day = startDate.day
	current_date_str = ''

	def create_new_date_str(year: int, month: int, day: int) -> str:
		m = f'0{month}' if month < 10 else f'{month}'
		d = f'0{day}' if day < 10 else f'{day}'
		return f'{year}-{m}-{d}'

	while end_date_str != current_date_str:
		if _YEAR_END_RE.search(current_date_str):
			current_year += 1
			current_month = 1
			current_day = 1

		current_new_date_str = create_new_date_str(
			current_year, current_month, current_day
		)

		if isValidDate(current_new_date_str):
			current_day += 1
			all_date.append(current_new_date_str)
			current_date_str = current_new_date_str
		else:
			current_month += 1
			current_day = 1
			current_date_str = create_new_date_str(
				current_year, current_month, current_day
			)

	return all_date
