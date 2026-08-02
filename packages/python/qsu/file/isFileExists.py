import os


def isFileExists(filePath: str) -> bool:
	try:
		# `exists` follows symlinks, so a dangling link reports as missing. The
		# `access` call that used to sit in front of this one had its result
		# thrown away, and cost a system call for nothing.
		return os.path.exists(filePath)
	except Exception:
		return False
