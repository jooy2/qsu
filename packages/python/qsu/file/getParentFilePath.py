import posixpath
import ntpath
from .toValidFilePath import toValidFilePath


def getParentFilePath(filePath: str, isWindows: bool = None) -> str:
	return toValidFilePath(
		ntpath.dirname(filePath) if isWindows else posixpath.dirname(filePath),
		isWindows,
	)
