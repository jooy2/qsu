import platform
import sys


def getKernelVersion() -> str:
	if sys.platform == 'win32':
		return _windowsVersion() or 'Unknown'

	return platform.release() or 'Unknown'


def _windowsVersion() -> str:
	# `platform.release()` answers with the name Windows is sold under — `10`, `11`,
	# `Server 2022` — where every other platform answers with the kernel version, and
	# where the JavaScript package answers with the NT version. This is that version.
	version = platform.win32_ver()[1]

	if version:
		return version

	windowsVersion = getattr(sys, 'getwindowsversion', None)

	return '.'.join(str(part) for part in windowsVersion()[:3]) if windowsVersion else ''
