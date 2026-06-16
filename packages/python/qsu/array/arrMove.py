def arrMove(array: list, fromIndex: int, to: int) -> list:
	arrayLength = len(array)

	if arrayLength <= fromIndex or arrayLength <= to:
		raise Exception('Invalid move params')

	array.insert(to, array.pop(fromIndex))

	return array
