import posixpath
import ntpath
from .toValidFilePath import toValidFilePath


def _stripTrailingSeparators(filePath: str, sep: str) -> str:
	# `dirname` in Node (and the POSIX dirname(1) utility) ignores trailing
	# separators, so '/home/user/' has the parent '/home'. Python's dirname keeps
	# them and would answer '/home/user', so strip them first. A root-only path
	# is preserved as-is.
	stripped = filePath.rstrip(sep)

	return stripped if stripped else filePath[:1]


def getParentFilePath(filePath: str, isWindows: bool = None) -> str:
	if isWindows:
		return toValidFilePath(
			ntpath.dirname(_stripTrailingSeparators(filePath, '\\')), isWindows
		)

	return toValidFilePath(
		posixpath.dirname(_stripTrailingSeparators(filePath, '/')), isWindows
	)
