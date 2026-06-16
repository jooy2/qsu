import re
import posixpath
import ntpath


def toValidFilePath(filePath: str, isWindows: bool = None) -> str:
	if filePath is not None and len(filePath) < 1:
		return '\\' if isWindows else '/'

	if isWindows:
		p = filePath

		p = re.sub(r'\.$', '', ntpath.normpath(p))

		if p.endswith('\\') and len(p) > 1:
			p = re.sub(r'\\+$', '', p)
		if p.endswith(':'):
			p = f'{p}\\'
		if not p.startswith('\\') and p.find(':') == -1:
			p = f'\\{p}'

		return p
	else:
		p = filePath

		p = posixpath.normpath(p)

		if not posixpath.isabs(p):
			p = f'/{p}'
		if p.endswith('/') and len(p) > 1:
			p = p[:-1]

		return p
