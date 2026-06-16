from .getFileName import getFileName
from .getFileExtension import getFileExtension


def getCopyFileName(fileName: str, fileNameList) -> str:
	fName = getFileName(fileName)
	fExt = getFileExtension(fileName)

	existingSet = set(fileNameList)

	if fileName not in existingSet:
		return fileName

	i = 1
	while True:
		candidate = f'{fName} ({i}){("." + fExt) if fExt else ""}'

		if candidate not in existingSet:
			return candidate

		i += 1
