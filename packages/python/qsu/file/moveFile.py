import errno
import os
import shutil


def moveFile(filePath: str, targetFilePath: str) -> None:
	# A path of nothing but whitespace is treated as no path at all, matching
	# the Dart implementation.
	if not filePath or not filePath.strip():
		return
	if not targetFilePath or not targetFilePath.strip():
		return

	try:
		os.rename(filePath, targetFilePath)
	except OSError as err:
		# `rename` cannot cross a filesystem boundary, and moving out of /tmp,
		# into a mounted volume or onto another drive is exactly that. Copying
		# and then removing the source is the only way across.
		if err.errno != errno.EXDEV:
			raise

		if os.path.isdir(filePath) and not os.path.islink(filePath):
			shutil.copytree(filePath, targetFilePath)
			shutil.rmtree(filePath)
		else:
			shutil.copy2(filePath, targetFilePath)
			os.remove(filePath)
