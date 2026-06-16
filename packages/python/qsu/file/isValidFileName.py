import re
from .getFileName import getFileName


def isValidFileName(filePath: str, unixType: bool = None) -> bool:
	fileName = getFileName(filePath)

	if unixType:
		fileNameRegex = re.compile(r'(^\s+$)|(^\.+$)|([:/]+)')
	else:
		# Windows
		fileNameRegex = re.compile(r'(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)')

	return not fileNameRegex.search(fileName) and len(fileName) <= 255
