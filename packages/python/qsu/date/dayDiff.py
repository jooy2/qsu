import math
from datetime import datetime


def dayDiff(date1: datetime, date2: datetime = None) -> int:
	date2c = date2 if date2 is not None else datetime.now()

	diff_ms = abs(date2c.timestamp() - date1.timestamp()) * 1000

	return math.ceil(diff_ms / (1000 * 3600 * 24))
