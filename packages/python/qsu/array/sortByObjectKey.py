from .sortNumeric import _naturalKey


def sortByObjectKey(
	array: list,
	key: str,
	descending: bool = False,
	numerically: bool = False,
) -> list:
	if numerically:
		array.sort(key=lambda item: _naturalKey(item[key]))

		if descending:
			array.reverse()

		return array

	array.sort(key=lambda item: item[key], reverse=descending)

	return array
