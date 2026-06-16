import os
from .deleteFile import deleteFile


def deleteAllFileFromDirectory(directoryPath: str) -> None:
	fileItems = []

	try:
		fileItems = os.listdir(directoryPath)
	except Exception:
		# Do nothing
		pass

	for item in fileItems:
		deleteFile(os.path.join(directoryPath, item))
