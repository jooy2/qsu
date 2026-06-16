import os
from .isFileExists import isFileExists


def createDirectory(filePath: str, recursive: bool = True) -> None:
	try:
		if not isFileExists(filePath):
			if recursive:
				os.makedirs(filePath, exist_ok=True)
			else:
				os.mkdir(filePath)
	except Exception as err:
		raise Exception(str(err))
