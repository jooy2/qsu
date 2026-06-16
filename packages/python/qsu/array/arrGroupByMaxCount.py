def arrGroupByMaxCount(array: list, maxLengthPerGroup: int = 1) -> list:
	result = []
	tempArray = []

	for item in array:
		if len(tempArray) == maxLengthPerGroup:
			result.append(tempArray)
			tempArray = []

		tempArray.append(item)

	if len(tempArray) > 0:
		result.append(tempArray)

	return result
