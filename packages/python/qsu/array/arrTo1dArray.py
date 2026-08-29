from typing import Sequence, cast

from ..verify.is2dArray import is2dArray


def arrTo1dArray(array: list) -> list:
	def convert1dArray(arr: Sequence) -> list:
		tempArr: list = []

		for item in arr:
			if not isinstance(item, (list, tuple)):
				tempArr.append(item)
			elif is2dArray(cast(list, item)):
				tempArr.extend(convert1dArray(item))
			else:
				tempArr.extend(item)

		return tempArr

	return convert1dArray(array)
