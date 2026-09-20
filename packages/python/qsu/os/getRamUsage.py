from typing import Union

from ..math.round import round
from ._system import memorySize


def getRamUsage(decimals: int = 1) -> Union[int, float]:
	memory = memorySize()

	if memory is None:
		raise RuntimeError('Failed to read the size of the physical memory')

	total, free = memory

	if not total:
		return 0

	return round(max(total - free, 0) / total * 100, decimals)
