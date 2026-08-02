from .getFileName import getFileName


def getCopyFileName(fileName: str, fileNameList) -> str:
	fName = getFileName(fileName)
	# Take the extension straight off the original name instead of going through
	# getFileExtension, which lower-cases it. `Report.PDF` must copy to
	# `Report (1).PDF`, not `Report (1).pdf`.
	fExt = getFileName(fileName, True)[len(fName):]

	# Naming n files into one directory means calling this n times, so building
	# a fresh set out of the list on every call makes that loop quadratic
	# (16,000 names took 19 seconds). A set handed in is used as it is, which
	# lets the caller keep one across the whole loop.
	existingSet = fileNameList if isinstance(fileNameList, set) else set(fileNameList)

	if fileName not in existingSet:
		return fileName

	i = 1
	while True:
		candidate = f'{fName} ({i}){fExt}'

		if candidate not in existingSet:
			return candidate

		i += 1
