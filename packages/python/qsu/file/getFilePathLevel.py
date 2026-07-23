import re
from .toPosixFilePath import toPosixFilePath


def getFilePathLevel(filePath: str) -> int:
	if not filePath:
		return -1

	if filePath == '/':
		return 1

	# Strip trailing separators of either flavour so that '/home/user' and
	# '/home/user/' report the same level.
	return len(toPosixFilePath(re.sub(r'[\\/]+$', '', filePath)).split('/'))
