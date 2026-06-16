from ..verify.isObject import isObject


def objTo1d(obj, separator='.'):
	if not separator or len(separator) < 1:
		raise Exception('`separator` must have value at least 1 character.')

	def convertObjectTo1d(o, objPath=''):
		result = {}
		isFirstDepth = len(objPath) < 1

		for key in o.keys():
			value = o[key]
			newObjPath = f"{objPath}{'' if isFirstDepth else separator}{key}"

			if isObject(value):
				result.update(convertObjectTo1d(value, newObjPath))
				if key in result:
					del result[key]
			else:
				result[newObjPath] = value

		return result

	return convertObjectTo1d(obj)
