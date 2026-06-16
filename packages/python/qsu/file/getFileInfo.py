import os
import math
import posixpath
from .getFileExtension import getFileExtension
from .getFileName import getFileName
from ..format.fileSizeFormat import fileSizeFormat


def getFileInfo(filePath: str) -> dict:
	def dateToUnixTime(seconds: float) -> int:
		return math.floor(seconds)

	try:
		fileItem = os.stat(filePath)

		return {
			'success': True,
			'isDirectory': os.path.isdir(filePath),
			'ext': getFileExtension(filePath),
			'size': fileItem.st_size,
			'sizeHumanized': fileSizeFormat(fileItem.st_size),
			'name': getFileName(filePath),
			'dirname': posixpath.dirname(filePath),
			'path': os.path.abspath(filePath),
			'created': dateToUnixTime(fileItem.st_ctime),
			'modified': dateToUnixTime(fileItem.st_mtime),
		}
	except OSError as err:
		raise Exception(str(err))

	return {
		'success': False,
		'isDirectory': False,
		'ext': None,
		'size': 0,
		'sizeHumanized': '0 Bytes',
		'name': 'unknown',
		'dirname': posixpath.dirname(filePath),
		'path': filePath,
		'created': -1,
		'modified': -1,
	}
