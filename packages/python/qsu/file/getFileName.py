import posixpath
import ntpath


def getFileName(filePath: str, withExtension: bool = False) -> str:
	removeExtension = (
		not withExtension
		and not filePath.endswith('/')
		and not filePath.endswith('\\')
	)

	# For Windows path
	if filePath.find('/') == -1 and filePath.find('\\') != -1:
		base = ntpath.basename(filePath.rstrip('\\'))
		if removeExtension:
			ext = ntpath.splitext(base)[1]
			if ext:
				base = base[: -len(ext)]
		return base or ''

	base = posixpath.basename(filePath.rstrip('/'))
	if removeExtension:
		ext = posixpath.splitext(base)[1]
		if ext:
			base = base[: -len(ext)]
	return base or ''
