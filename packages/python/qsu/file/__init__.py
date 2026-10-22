from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .createDirectory import createDirectory as createDirectory
	from .createFileOfSize import createFileOfSize as createFileOfSize
	from .deletePath import deletePath as deletePath
	from .emptyDirectory import emptyDirectory as emptyDirectory
	from .getCopyFileName import getCopyFileName as getCopyFileName
	from .getFileExtension import getFileExtension as getFileExtension
	from .getFileHashFromPath import getFileHashFromPath as getFileHashFromPath
	from .getFileHashFromStream import getFileHashFromStream as getFileHashFromStream
	from .getFileInfo import getFileInfo as getFileInfo
	from .getFileName import getFileName as getFileName
	from .getFilePathDepth import getFilePathDepth as getFilePathDepth
	from .getFileSize import getFileSize as getFileSize
	from .getParentFilePath import getParentFilePath as getParentFilePath
	from .headFile import headFile as headFile
	from .isExistingPath import isExistingPath as isExistingPath
	from .isFileHidden import isFileHidden as isFileHidden
	from .isValidFileName import isValidFileName as isValidFileName
	from .joinFilePath import joinFilePath as joinFilePath
	from .moveFile import moveFile as moveFile
	from .normalizeFilePath import normalizeFilePath as normalizeFilePath
	from .normalizeFilePathUnicode import normalizeFilePathUnicode as normalizeFilePathUnicode
	from .tailFile import tailFile as tailFile
	from .toPosixFilePath import toPosixFilePath as toPosixFilePath
	from .touchFile import touchFile as touchFile

__all__ = [
	'createDirectory',
	'createFileOfSize',
	'deletePath',
	'emptyDirectory',
	'getCopyFileName',
	'getFileExtension',
	'getFileHashFromPath',
	'getFileHashFromStream',
	'getFileInfo',
	'getFileName',
	'getFilePathDepth',
	'getFileSize',
	'getParentFilePath',
	'headFile',
	'isExistingPath',
	'isFileHidden',
	'isValidFileName',
	'joinFilePath',
	'moveFile',
	'normalizeFilePath',
	'normalizeFilePathUnicode',
	'tailFile',
	'toPosixFilePath',
	'touchFile',
]

lazy(__name__)
