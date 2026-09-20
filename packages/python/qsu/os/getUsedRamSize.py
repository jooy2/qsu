from ..format.fileSizeFormat import fileSizeFormat
from ._system import memorySize


def getUsedRamSize() -> str:
	memory = memorySize()

	if memory is None:
		raise RuntimeError('Failed to read the size of the physical memory')

	total, free = memory

	return fileSizeFormat(max(total - free, 0), 0, True)
