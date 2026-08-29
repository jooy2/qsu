from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .createDirectory import createDirectory as createDirectory
	from .createFile import createFile as createFile
	from .createFileWithDummy import createFileWithDummy as createFileWithDummy
	from .deleteAllFileFromDirectory import deleteAllFileFromDirectory as deleteAllFileFromDirectory
	from .deleteFile import deleteFile as deleteFile
	from .getCopyFileName import getCopyFileName as getCopyFileName
	from .getFileExtension import getFileExtension as getFileExtension
	from .getFileHashFromPath import getFileHashFromPath as getFileHashFromPath
	from .getFileHashFromStream import getFileHashFromStream as getFileHashFromStream
	from .getFileInfo import getFileInfo as getFileInfo
	from .getFileName import getFileName as getFileName
	from .getFilePathLevel import getFilePathLevel as getFilePathLevel
	from .getFileSize import getFileSize as getFileSize
	from .getParentFilePath import getParentFilePath as getParentFilePath
	from .headFile import headFile as headFile
	from .isFileExists import isFileExists as isFileExists
	from .isFileHidden import isFileHidden as isFileHidden
	from .isValidFileName import isValidFileName as isValidFileName
	from .joinFilePath import joinFilePath as joinFilePath
	from .moveFile import moveFile as moveFile
	from .normalizeFile import normalizeFile as normalizeFile
	from .tailFile import tailFile as tailFile
	from .toPosixFilePath import toPosixFilePath as toPosixFilePath
	from .toValidFilePath import toValidFilePath as toValidFilePath

__all__ = [
	'createDirectory',
	'createFile',
	'createFileWithDummy',
	'deleteAllFileFromDirectory',
	'deleteFile',
	'getCopyFileName',
	'getFileExtension',
	'getFileHashFromPath',
	'getFileHashFromStream',
	'getFileInfo',
	'getFileName',
	'getFilePathLevel',
	'getFileSize',
	'getParentFilePath',
	'headFile',
	'isFileExists',
	'isFileHidden',
	'isValidFileName',
	'joinFilePath',
	'moveFile',
	'normalizeFile',
	'tailFile',
	'toPosixFilePath',
	'toValidFilePath',
]

lazy(__name__)
