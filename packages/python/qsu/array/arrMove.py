def arrMove(array: list, fromIndex: int, to: int) -> list:
	arrayLength = len(array)

	if arrayLength <= fromIndex or arrayLength <= to:
		raise Exception('Invalid move params')

	# Move within a copy so the caller's list is left untouched.
	newArray = list(array)

	newArray.insert(to, newArray.pop(fromIndex))

	return newArray
