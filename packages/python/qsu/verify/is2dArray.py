def is2dArray(array: list) -> bool:
	# `any` stops at the first match. The comprehension walked the whole list and built
	# a new one — 640ms vs 0ms on a 100,000 element list whose first item is a list.
	return any(isinstance(item, (list, tuple)) for item in array)
