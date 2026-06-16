from ..verify.isObject import isObject


def objMergeNewKey(obj, obj2, options=None):
	if not isinstance(obj, dict) or not isinstance(obj2, dict):
		return None

	merged = {**obj}

	arrayAction = options.get('arrayAction') if options else None

	for key in obj2.keys():
		data = obj2[key]

		if key in merged:
			if isinstance(merged[key], list) and isinstance(data, list):
				if arrayAction == 'append':
					merged[key] = merged[key] + list(data)
				elif arrayAction == 'replace':
					merged[key] = data
				elif len(merged[key]) == len(data):
					newList = list(merged[key])
					for i in range(len(newList)):
						update = data[i]

						if isObject(update):
							newList[i] = objMergeNewKey(newList[i], update, options)
					merged[key] = newList
			elif isObject(merged[key]) and isObject(data):
				merged[key] = objMergeNewKey(merged[key], data, options)
			else:
				merged[key] = data
		else:
			merged[key] = data

	return merged
