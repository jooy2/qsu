import re


def toPosixFilePath(filePath: str) -> str:
	result = re.sub(r'^\\\\\?\\', '', filePath)
	result = result.replace('\\', '/')
	result = re.sub(r'/{2,}', '/', result)

	return result
