import re
from .getFileName import getFileName

# CON, PRN, AUX, NUL, COM1-9 and LPT1-9 are device names reserved by Windows.
# They stay reserved even when an extension is appended (`nul.txt`).
_WINDOWS_RESERVED_NAME_REGEX = re.compile(
	r'^(con|prn|aux|nul|com[1-9]|lpt[1-9])$', re.IGNORECASE
)


def isValidFileName(filePath: str, unixType: bool = None) -> bool:
	# Validate the *whole* name, extension included. Stripping the extension
	# first would let 'hello.:txt' through, because only 'hello' was checked.
	fileName = getFileName(filePath, True)

	if unixType:
		fileNameRegex = re.compile(r'(^\s+$)|(^\.+$)|([:/]+)')
	else:
		# Windows
		fileNameRegex = re.compile(r'(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)')

		if _WINDOWS_RESERVED_NAME_REGEX.match(fileName.split('.')[0]):
			return False

	return not fileNameRegex.search(fileName) and len(fileName) <= 255
