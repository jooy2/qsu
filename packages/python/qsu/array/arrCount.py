def arrCount(array: list) -> dict:
	result: dict = {}

	for item in array:
		key = str(item)
		result[key] = result.get(key, 0) + 1

	return result
