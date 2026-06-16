import os


def isFileExists(filePath: str) -> bool:
	try:
		os.access(filePath, os.F_OK)
		return os.path.exists(filePath)
	except Exception:
		return False
