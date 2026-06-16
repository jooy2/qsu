from datetime import datetime


def today(separator: str = '-', yearFirst: bool = True) -> str:
	date = datetime.now()
	month = date.month
	day = date.day

	date_arr = [
		f"{'0' if month < 10 else ''}{month}",
		f"{'0' if day < 10 else ''}{day}",
	]

	if yearFirst:
		date_arr.insert(0, str(date.year))
	else:
		date_arr.append(str(date.year))

	return separator.join(date_arr)
