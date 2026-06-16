import os


def moveFile(filePath: str, targetFilePath: str) -> None:
	if not filePath or not targetFilePath:
		return

	os.rename(filePath, targetFilePath)
