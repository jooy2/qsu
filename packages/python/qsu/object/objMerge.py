from ..verify.isObject import isObject


def objMerge(*objects):
	if len(objects) == 0:
		return None

	result = {}

	for source in objects:
		if not isObject(source):
			return None

		for key, value in source.items():
			# Two dicts are merged into a *new* dict, so neither source ends up shared with
			# the result. Everything else, lists included, is replaced whole by the later
			# value. Lodash merges lists index by index instead, which quietly keeps
			# elements the caller meant to drop.
			if isObject(result.get(key)) and isObject(value):
				result[key] = objMerge(result[key], value)
			else:
				result[key] = value

	return result
