import posixpath
from .getFileName import getFileName


def getFileExtension(filePath: str):
	ext = posixpath.splitext(getFileName(filePath, True))[1].replace('.', '').lower()

	return ext if len(ext) > 0 else None
