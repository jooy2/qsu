import os


def getFileSize(filePath: str) -> int:
	# The OSError is raised as it is, so `errno`, `strerror` and `filename`
	# survive for the caller to read.
	return os.stat(filePath).st_size
