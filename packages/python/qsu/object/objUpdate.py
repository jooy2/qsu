from ..verify.isObject import isObject


def objUpdate(obj, key, value, recursive=False, upsert=False):
	if not isinstance(obj, dict):
		return None

	newObj = obj
	hasUpdated = {'value': False}

	def checkObjectKey(currentObj):
		for currentKey in list(currentObj.keys()):
			if recursive and currentObj.get(currentKey) and isObject(currentObj[currentKey]):
				checkObjectKey(currentObj[currentKey])

			if key in currentObj:
				currentObj[key] = value
				hasUpdated['value'] = True

	checkObjectKey(newObj)

	if not hasUpdated['value'] and upsert:
		newObj[key] = value

	return newObj
