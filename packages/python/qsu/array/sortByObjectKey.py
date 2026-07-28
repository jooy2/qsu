from .sortNumeric import _naturalKey


def sortByObjectKey(
	array: list,
	key: str,
	descending: bool = False,
	numerically: bool = False,
) -> list:
	# Sort a copy: `list.sort` reorders in place. Use `reverse=` rather than reversing the
	# result, which would also flip the order of equal elements.
	if numerically:
		return sorted(array, key=lambda item: _naturalKey(item[key]), reverse=descending)

	return sorted(array, key=lambda item: item[key], reverse=descending)
