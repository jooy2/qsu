import os
import time


def createFile(filePath: str) -> None:
	# A path of nothing but whitespace is treated as no path at all, matching
	# the Dart implementation, which otherwise creates a file literally named
	# '   ' out of an empty form field.
	if not filePath or not filePath.strip():
		return

	now = time.time()

	try:
		# Mirrors Node fs.utimes: update times of an existing file.
		os.utime(filePath, (now, now))
	except Exception:
		# The file does not exist yet. Its parent directory may not exist
		# either, so it is created first rather than raising FileNotFoundError.
		parent = os.path.dirname(filePath)

		if parent:
			os.makedirs(parent, exist_ok=True)

		with open(filePath, 'a'):
			pass
