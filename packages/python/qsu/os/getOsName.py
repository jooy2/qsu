import platform
import re
import sys
from typing import Optional

# `os-release` is the interface every distribution agrees on. The second path is
# where a system that keeps `/etc` empty puts it.
_LINUX_NAME_FILES = ('/etc/os-release', '/usr/lib/os-release')
_LINUX_NAME = re.compile(r'^PRETTY_NAME="?([^"\n]+)"?$', re.MULTILINE)

# Windows 11 kept the NT version of Windows 10, so the build number is the only
# thing that separates them. 22000 is the first Windows 11 build.
_FIRST_WINDOWS_11_BUILD = 22000

_WINDOWS_6_NAMES = {3: 'Windows 8.1', 2: 'Windows 8', 1: 'Windows 7'}


def getOsName() -> str:
	if sys.platform == 'darwin':
		version = platform.mac_ver()[0]

		return f'macOS {version}' if version else 'macOS'

	if sys.platform.startswith('linux'):
		return _linuxName() or 'Linux'

	if sys.platform == 'win32':
		return _windowsName()

	return sys.platform


def _linuxName() -> Optional[str]:
	for path in _LINUX_NAME_FILES:
		try:
			with open(path, encoding='utf-8', errors='replace') as handle:
				found = _LINUX_NAME.search(handle.read())
		except OSError:
			# The file is not part of every installation. Try the next one.
			continue

		if found:
			return found.group(1)

	return None


def _windowsName() -> str:
	from .getKernelVersion import getKernelVersion

	parts = getKernelVersion().split('.')
	major, minor, build = (int(part) if part.isdigit() else 0 for part in (parts + ['0', '0', '0'])[:3])

	if major == 10:
		return 'Windows 11' if build >= _FIRST_WINDOWS_11_BUILD else 'Windows 10'

	if major == 6:
		return _WINDOWS_6_NAMES.get(minor, 'Windows')

	return 'Windows'
