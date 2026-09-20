from ..format.fileSizeFormat import fileSizeFormat
from ._system import memorySize


def getFreeRamSize() -> str:
	memory = memorySize()

	if memory is None:
		raise RuntimeError('Failed to read the size of the physical memory')

	return fileSizeFormat(memory[1], 0, True)
