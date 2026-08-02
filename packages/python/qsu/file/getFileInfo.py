import os
import math
import stat as statModule
from .getFileExtension import getFileExtension
from .getFileName import getFileName
from ..format.fileSizeFormat import fileSizeFormat


def getFileInfo(filePath: str) -> dict:
	def dateToUnixTime(seconds: float) -> int:
		return math.floor(seconds)

	# The OSError is raised as it is. Re-raising `Exception(str(err))` dropped
	# `errno`, `strerror` and `filename`, so a caller could not tell a missing
	# file from a permission error, and the original traceback went with them.
	fileItem = os.stat(filePath)

	return {
		'success': True,
		# Read the mode already returned by `stat` instead of asking the
		# filesystem a second time through `os.path.isdir`.
		'isDirectory': statModule.S_ISDIR(fileItem.st_mode),
		'ext': getFileExtension(filePath),
		'size': fileItem.st_size,
		'sizeHumanized': fileSizeFormat(fileItem.st_size),
		'name': getFileName(filePath),
		# `os.path` follows the host platform, so a Windows path separates on
		# '\\' here as it does in the JavaScript implementation.
		'dirname': os.path.dirname(filePath),
		'path': os.path.abspath(filePath),
		'created': dateToUnixTime(fileItem.st_ctime),
		'modified': dateToUnixTime(fileItem.st_mtime),
	}
