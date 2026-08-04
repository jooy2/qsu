def objMapKeys(obj, iteratee):
	if not isinstance(obj, dict):
		return None

	# Top level only, like Lodash's `mapKeys`. When two keys map onto the same name, the
	# later one wins.
	return {iteratee(value, key): value for key, value in obj.items()}
