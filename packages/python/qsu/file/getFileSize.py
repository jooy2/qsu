import os


def getFileSize(filePath: str) -> int:
	try:
		return os.stat(filePath).st_size
	except Exception as err:
		raise Exception(str(err))

	return -1
