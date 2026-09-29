from typing import Optional


def median(array: list) -> Optional[float]:
	values = []

	for value in array:
		# `bool` is a subclass of `int`, so it has to be rejected explicitly, as `min` and
		# `max` do.
		if not isinstance(value, (int, float)) or isinstance(value, bool):
			continue

		# `nan` has no place in a sorted order, so it is skipped as `min` and `max` skip it.
		if value != value:
			continue

		values.append(value)

	if not values:
		return None

	# `values` is already a copy, so sorting it leaves the caller's list in its order.
	values.sort()

	middle = len(values) // 2

	if len(values) % 2 == 1:
		return values[middle]

	return (values[middle - 1] + values[middle]) / 2
