def objPick(obj, keys):
	if not isinstance(obj, dict):
		return None

	keyList = [keys] if isinstance(keys, str) else list(keys)
	result = {}

	# Top level only, like Lodash's `pick` without its path support. A key that is not
	# there is skipped rather than carried over as `None`, which would leave the result
	# claiming a key the source never had.
	for key in keyList:
		if key in obj:
			result[key] = obj[key]

	return result
