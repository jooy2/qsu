from .getFileName import getFileName


def getCopyFileName(fileName: str, fileNameList) -> str:
	fName = getFileName(fileName)
	# Take the extension straight off the original name instead of going through
	# getFileExtension, which lower-cases it. `Report.PDF` must copy to
	# `Report (1).PDF`, not `Report (1).pdf`.
	fExt = getFileName(fileName, True)[len(fName):]

	existingSet = set(fileNameList)

	if fileName not in existingSet:
		return fileName

	i = 1
	while True:
		candidate = f'{fName} ({i}){fExt}'

		if candidate not in existingSet:
			return candidate

		i += 1
