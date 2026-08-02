import os
import shutil


def deleteFile(filePath: str) -> None:
	# A path of nothing but whitespace is treated as no path at all, matching
	# the Dart implementation.
	if not filePath or not filePath.strip():
		return

	try:
		if os.path.isdir(filePath) and not os.path.islink(filePath):
			shutil.rmtree(filePath, ignore_errors=True)
		else:
			os.remove(filePath)
	except Exception:
		# Do Nothing (mirrors Node rm with force: true)
		pass
