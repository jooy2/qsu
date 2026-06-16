import re


def _naturalKey(value: str):
	parts = re.split(r'(\d+)', str(value))

	return [(0, int(part)) if part.isdigit() else (1, part) for part in parts if part != '']


def sortNumeric(array: list, descending: bool = False) -> list:
	array.sort(key=_naturalKey)

	if descending:
		array.reverse()

	return array
