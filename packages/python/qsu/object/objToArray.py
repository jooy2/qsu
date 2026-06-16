from ..verify.isObject import isObject


def objToArray(obj, recursive=False) -> list:
	def convertToArray(o):
		r = []

		for key in o.keys():
			if recursive and isObject(o[key]):
				r.append([key, convertToArray(o[key])])
			else:
				r.append([key, o[key]])

		return r

	return convertToArray(obj)
