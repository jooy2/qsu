def objPickBy(obj, predicate):
	if not isinstance(obj, dict):
		return None

	# Top level only, like Lodash's `pickBy`. Nested dicts are carried over as they are.
	return {key: value for key, value in obj.items() if predicate(value, key)}
