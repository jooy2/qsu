import re
from .toPosixFilePath import toPosixFilePath


def getFilePathLevel(filePath: str) -> int:
	if not filePath:
		return -1

	if filePath == '/':
		return 1

	return len(toPosixFilePath(re.sub(r'\\+$', '', filePath)).split('/'))
