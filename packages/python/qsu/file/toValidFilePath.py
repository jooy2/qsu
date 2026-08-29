import re
import posixpath
import ntpath
from typing import Optional

def toValidFilePath(filePath: str, isWindows: Optional[bool] = None) -> str:
	if filePath is not None and len(filePath) < 1:
		return '\\' if isWindows else '/'

	if isWindows:
		p = filePath

		p = re.sub(r'\.$', '', ntpath.normpath(p))

		if not p.startswith('\\') and p.find(':') == -1:
			# Anchor the path *before* resolving the rest of it: '..' cannot
			# climb above the root, so '..\\..\\Users' is '\\Users' rather than
			# the '\\..\\..\\Users' a plain prefix would leave behind.
			p = ntpath.normpath(f'\\{p}')
		if p.endswith('\\') and len(p) > 1:
			p = re.sub(r'\\+$', '', p)
		if p.endswith(':'):
			p = f'{p}\\'

		return p
	else:
		p = filePath

		p = posixpath.normpath(p)

		# `normpath` collapses an empty or self-referential path to '.', which must
		# resolve to the root rather than to a literal '/.' segment.
		if p == '.':
			return '/'

		# POSIX leaves a leading '//' implementation-defined and normpath keeps it;
		# Node collapses it, so collapse it here too.
		p = re.sub(r'^/{2,}', '/', p)

		if not posixpath.isabs(p):
			# Anchor the path *before* resolving the rest of it: '..' cannot
			# climb above the root, so '../../etc/passwd' is '/etc/passwd'
			# rather than the '/../../etc/passwd' a plain prefix would leave.
			p = posixpath.normpath(f'/{p}')
		if p.endswith('/') and len(p) > 1:
			p = p[:-1]

		return p
