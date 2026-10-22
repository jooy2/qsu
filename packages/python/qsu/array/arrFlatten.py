from typing import Sequence, cast

from ..verify.isNestedArray import isNestedArray


def arrFlatten(array: list) -> list:
	def convert1dArray(arr: Sequence) -> list:
		tempArr: list = []

		for item in arr:
			if not isinstance(item, (list, tuple)):
				tempArr.append(item)
			elif isNestedArray(cast(list, item)):
				tempArr.extend(convert1dArray(item))
			else:
				tempArr.extend(item)

		return tempArr

	return convert1dArray(array)
