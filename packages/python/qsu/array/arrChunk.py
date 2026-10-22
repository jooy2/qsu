def arrChunk(array: list, size: int = 1) -> list:
	result = []
	tempArray: list = []

	for item in array:
		if len(tempArray) == size:
			result.append(tempArray)
			tempArray = []

		tempArray.append(item)

	if len(tempArray) > 0:
		result.append(tempArray)

	return result
