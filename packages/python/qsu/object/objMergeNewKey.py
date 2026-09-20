from ..verify.isObject import isObject


def objMergeNewKey(obj, obj2, options=None, **kwargs):
	if not isinstance(obj, dict) or not isinstance(obj2, dict):
		return None

	opts = {**(options or {}), **kwargs}
	merged = {**obj}

	arrayAction = opts.get('arrayAction')

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
							newList[i] = objMergeNewKey(newList[i], update, opts)
					merged[key] = newList
			elif isObject(merged[key]) and isObject(data):
				merged[key] = objMergeNewKey(merged[key], data, opts)
			else:
				merged[key] = data
		else:
			merged[key] = data

	return merged
