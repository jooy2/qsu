from ..verify.isObject import isObject


def objUpdate(obj, key, value, recursive=False, upsert=False):
	if not isinstance(obj, dict):
		return None

	hasUpdated = {'value': False}

	# Work on copies. `newObj = obj` modified the caller's dict (and every nested dict)
	# in place, even though the function looks like it returns a new one.
	def updateObject(currentObj):
		result = dict(currentObj)

		for currentKey in list(result.keys()):
			if recursive and result.get(currentKey) and isObject(result[currentKey]):
				result[currentKey] = updateObject(result[currentKey])

		# Assign once per dict. The old code repeated this identical assignment for
		# every key in the dict.
		if key in result:
			result[key] = value
			hasUpdated['value'] = True

		return result

	newObj = updateObject(obj)

	if not hasUpdated['value'] and upsert:
		newObj[key] = value

	return newObj
