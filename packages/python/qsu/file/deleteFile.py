import os
import shutil


def deleteFile(filePath: str) -> None:
	if not filePath:
		return

	try:
		if os.path.isdir(filePath) and not os.path.islink(filePath):
			shutil.rmtree(filePath, ignore_errors=True)
		else:
			os.remove(filePath)
	except Exception:
		# Do Nothing (mirrors Node rm with force: true)
		pass
