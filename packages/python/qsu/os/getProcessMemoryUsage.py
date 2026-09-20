from ..format.fileSizeFormat import fileSizeFormat
from ._system import residentSetSize


def getProcessMemoryUsage() -> str:
	resident = residentSetSize()

	if resident is None:
		raise RuntimeError('Failed to read how much memory this process occupies')

	return fileSizeFormat(resident, 0, True)
