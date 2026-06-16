import os
import time


def createFile(filePath: str) -> None:
	if not filePath:
		return

	now = time.time()

	try:
		# Mirrors Node fs.utimes: update times of an existing file.
		os.utime(filePath, (now, now))
	except Exception:
		# File does not exist yet: create it (equivalent to opening with 'a').
		with open(filePath, 'a'):
			pass
