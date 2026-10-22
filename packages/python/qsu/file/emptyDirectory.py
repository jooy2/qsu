import os
from .deletePath import deletePath


def emptyDirectory(directoryPath: str) -> None:
	fileItems = []

	try:
		fileItems = os.listdir(directoryPath)
	except Exception:
		# Do nothing
		pass

	for item in fileItems:
		deletePath(os.path.join(directoryPath, item))
