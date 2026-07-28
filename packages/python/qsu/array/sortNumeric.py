import re


def _naturalKey(value: str):
	parts = re.split(r'(\d+)', str(value))

	return [(0, int(part)) if part.isdigit() else (1, part) for part in parts if part != '']


def sortNumeric(array: list, descending: bool = False) -> list:
	# Sort a copy: `list.sort` reorders in place. Use `reverse=` rather than reversing the
	# result, which would also flip the order of equal elements.
	return sorted(array, key=_naturalKey, reverse=descending)
