def is2dArray(array: list) -> bool:
	return len([item for item in array if isinstance(item, (list, tuple))]) > 0
