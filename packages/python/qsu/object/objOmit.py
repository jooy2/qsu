def objOmit(obj, keys):
	if not isinstance(obj, dict):
		return None

	omitted = {keys} if isinstance(keys, str) else set(keys)

	# Top level only, like Lodash's `omit` without its path support. A listed key the object
	# does not have is ignored, and the values are carried over as they are, so a nested
	# dict is shared with the source rather than copied.
	return {key: value for key, value in obj.items() if key not in omitted}
