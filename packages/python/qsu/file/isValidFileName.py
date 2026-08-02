import re
from .getFileName import getFileName

# CON, PRN, AUX, NUL, COM1-9 and LPT1-9 are device names reserved by Windows.
# They stay reserved even when an extension is appended (`nul.txt`).
_WINDOWS_RESERVED_NAME_REGEX = re.compile(
	r'^(con|prn|aux|nul|com[1-9]|lpt[1-9])$', re.IGNORECASE
)

# NUL terminates a path in the system calls underneath every filesystem, so a
# name carrying one is silently truncated rather than rejected. The rest of the
# C0 range and DEL are rejected by Windows outright and are never intentional.
_CONTROL_CHARACTER_REGEX = re.compile(r'[\x00-\x1f\x7f]')

# Filesystems cap a name at 255 *bytes*, not characters, so the limit is
# measured after encoding. '가' * 100 is 100 characters but 300 bytes and cannot
# be created on ext4, APFS or NTFS.
_MAX_FILE_NAME_BYTES = 255


def isValidFileName(filePath: str, unixType: bool = None) -> bool:
	# Validate the *whole* name, extension included. Stripping the extension
	# first would let 'hello.:txt' through, because only 'hello' was checked.
	fileName = getFileName(filePath, True)

	if len(fileName) < 1 or _CONTROL_CHARACTER_REGEX.search(fileName):
		return False

	if unixType:
		fileNameRegex = re.compile(r'(^\s+$)|(^\.+$)|([:/]+)')
	else:
		# Windows
		fileNameRegex = re.compile(r'(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)')

		if _WINDOWS_RESERVED_NAME_REGEX.match(fileName.split('.')[0]):
			return False

		# Windows strips a trailing dot or space instead of reporting an error,
		# so 'report.' silently becomes 'report' and overwrites it.
		if re.search(r'[. ]$', fileName):
			return False

	return (
		not fileNameRegex.search(fileName)
		and len(fileName.encode('utf-8')) <= _MAX_FILE_NAME_BYTES
	)
