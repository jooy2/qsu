from ..verify.isPlainObject import isPlainObject


def objMergeWithArrays(obj, source, options=None, **kwargs):
	if not isinstance(obj, dict) or not isinstance(source, dict):
		return None

	opts = {**(options or {}), **kwargs}
	merged = {**obj}

	arrayAction = opts.get('arrayAction')

	for key in source.keys():
		data = source[key]

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

						if isPlainObject(update):
							newList[i] = objMergeWithArrays(newList[i], update, opts)
					merged[key] = newList
			elif isPlainObject(merged[key]) and isPlainObject(data):
				merged[key] = objMergeWithArrays(merged[key], data, opts)
			else:
				merged[key] = data
		else:
			merged[key] = data

	return merged
