def arrWithDefault(defaultValue, length: int = 0) -> list:
	if length < 1:
		return []

	return [defaultValue] * length
