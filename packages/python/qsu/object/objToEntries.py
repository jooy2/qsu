from ..verify.isPlainObject import isPlainObject


def objToEntries(obj, recursive=False) -> list:
	def convertToArray(o):
		r = []

		for key in o.keys():
			if recursive and isPlainObject(o[key]):
				r.append([key, convertToArray(o[key])])
			else:
				r.append([key, o[key]])

		return r

	return convertToArray(obj)
