def arrMove(array: list, fromIndex: int, toIndex: int) -> list:
	arrayLength = len(array)

	if arrayLength <= fromIndex or arrayLength <= toIndex:
		raise Exception('Invalid move params')

	# Move within a copy so the caller's list is left untouched.
	newArray = list(array)

	newArray.insert(toIndex, newArray.pop(fromIndex))

	return newArray
