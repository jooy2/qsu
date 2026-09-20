"""(Private) The platform calls the `os` functions share.

Every entry here asks the operating system directly, through a `sysctl`, a
`kernel32` call or a file under `/proc`. Nothing in this module starts a shell or
depends on a command being installed, so a function built on it works on a
stripped-down container the same as on a desktop.

Each one returns `None` when the platform cannot answer, leaving the caller to
decide what to do about it.
"""

import os
import struct
import sys
import time
from typing import Optional, Tuple

_SECONDS_FROM_1601_TO_1970 = 11644473600


def _libc():
	import ctypes
	import ctypes.util

	name = ctypes.util.find_library('c')

	return ctypes.CDLL(name, use_errno=True) if name else None


def sysctlUnsigned(name: str) -> Optional[int]:
	"""One numeric `sysctl`, read by name. macOS and the BSDs."""
	library = _libc()

	if library is None:
		return None

	import ctypes

	value = ctypes.c_uint64(0)
	size = ctypes.c_size_t(ctypes.sizeof(value))

	if library.sysctlbyname(name.encode(), ctypes.byref(value), ctypes.byref(size), None, 0) != 0:
		return None

	return int(value.value)


def sysctlString(name: str) -> Optional[str]:
	"""One textual `sysctl`, read by name. macOS and the BSDs."""
	library = _libc()

	if library is None:
		return None

	import ctypes

	size = ctypes.c_size_t(0)

	# The first call asks how long the value is, the second reads it.
	if library.sysctlbyname(name.encode(), None, ctypes.byref(size), None, 0) != 0 or not size.value:
		return None

	buffer = ctypes.create_string_buffer(size.value)

	if library.sysctlbyname(name.encode(), buffer, ctypes.byref(size), None, 0) != 0:
		return None

	return buffer.value.decode(errors='replace').strip() or None


def windowsRegistryString(path: str, name: str) -> Optional[str]:
	"""One string value under `HKEY_LOCAL_MACHINE`, read without running a command."""
	if sys.platform != 'win32':
		return None

	import winreg

	try:
		with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, path) as key:
			value = winreg.QueryValueEx(key, name)[0]
	except OSError:
		return None

	if not isinstance(value, str):
		return None

	return value.strip() or None


def memorySize() -> Optional[Tuple[int, int]]:
	"""The physical memory in bytes, as a total and the part of it still available.

	Every branch reads the same counter the JavaScript package reads through libuv,
	so the two report the same numbers on the same machine.
	"""
	if sys.platform == 'win32':
		return _windowsMemorySize()

	if sys.platform == 'darwin':
		return _darwinMemorySize()

	return _procMemorySize() or _sysconfMemorySize()


def _windowsMemorySize() -> Optional[Tuple[int, int]]:
	if sys.platform != 'win32':
		return None

	import ctypes

	class MEMORYSTATUSEX(ctypes.Structure):
		_fields_ = [
			('dwLength', ctypes.c_ulong),
			('dwMemoryLoad', ctypes.c_ulong),
			('ullTotalPhys', ctypes.c_ulonglong),
			('ullAvailPhys', ctypes.c_ulonglong),
			('ullTotalPageFile', ctypes.c_ulonglong),
			('ullAvailPageFile', ctypes.c_ulonglong),
			('ullTotalVirtual', ctypes.c_ulonglong),
			('ullAvailVirtual', ctypes.c_ulonglong),
			('ullAvailExtendedVirtual', ctypes.c_ulonglong),
		]

	status = MEMORYSTATUSEX()
	status.dwLength = ctypes.sizeof(MEMORYSTATUSEX)

	if not ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(status)):
		return None

	return int(status.ullTotalPhys), int(status.ullAvailPhys)


def _darwinMemorySize() -> Optional[Tuple[int, int]]:
	total = sysctlUnsigned('hw.memsize')
	pageSize = sysctlUnsigned('hw.pagesize')
	freePages = sysctlUnsigned('vm.page_free_count')
	speculativePages = sysctlUnsigned('vm.page_speculative_count')

	if total is None or not pageSize or freePages is None or speculativePages is None:
		return None

	# The mach `free_count` the JavaScript package reads counts the speculative
	# pages along with the free ones, and these two sysctls add up to exactly that.
	return total, (freePages + speculativePages) * pageSize


def _procMemorySize() -> Optional[Tuple[int, int]]:
	"""Linux. `MemAvailable` is what can be handed out without swapping, which counts
	the page cache that would be dropped; the free pages alone are far fewer."""
	values = {}

	try:
		with open('/proc/meminfo', encoding='utf-8', errors='replace') as handle:
			for line in handle:
				name, separator, rest = line.partition(':')

				if separator and name in ('MemTotal', 'MemAvailable'):
					# The file writes every size in kibibytes.
					values[name] = int(rest.split()[0]) * 1024

					if len(values) == 2:
						break
	except (OSError, ValueError, IndexError):
		return None

	if 'MemTotal' not in values or 'MemAvailable' not in values:
		return None

	return values['MemTotal'], values['MemAvailable']


def _sysconfMemorySize() -> Optional[Tuple[int, int]]:
	try:
		pageSize = os.sysconf('SC_PAGE_SIZE')

		return os.sysconf('SC_PHYS_PAGES') * pageSize, os.sysconf('SC_AVPHYS_PAGES') * pageSize
	except (ValueError, OSError):
		return None


def processStartTime() -> Optional[float]:
	"""When this process started, as a Unix timestamp in seconds."""
	if sys.platform == 'win32':
		return _windowsProcessStartTime()

	if sys.platform == 'darwin':
		return _darwinProcessStartTime()

	return _procProcessStartTime()


def _windowsProcessStartTime() -> Optional[float]:
	if sys.platform != 'win32':
		return None

	import ctypes
	from ctypes import wintypes

	kernel32 = ctypes.WinDLL('kernel32', use_last_error=True)
	kernel32.GetCurrentProcess.restype = wintypes.HANDLE
	kernel32.GetProcessTimes.argtypes = [
		wintypes.HANDLE,
		ctypes.POINTER(wintypes.FILETIME),
		ctypes.POINTER(wintypes.FILETIME),
		ctypes.POINTER(wintypes.FILETIME),
		ctypes.POINTER(wintypes.FILETIME),
	]

	created, exited, kernelTime, userTime = (wintypes.FILETIME() for _ in range(4))

	if not kernel32.GetProcessTimes(
		kernel32.GetCurrentProcess(),
		ctypes.byref(created),
		ctypes.byref(exited),
		ctypes.byref(kernelTime),
		ctypes.byref(userTime),
	):
		return None

	# A FILETIME counts 100-nanosecond intervals since the start of 1601.
	intervals = (created.dwHighDateTime << 32) | created.dwLowDateTime

	return intervals / 1e7 - _SECONDS_FROM_1601_TO_1970


def _darwinProcessStartTime() -> Optional[float]:
	library = _libc()

	if library is None:
		return None

	import ctypes

	CTL_KERN, KERN_PROC, KERN_PROC_PID = 1, 14, 1
	mib = (ctypes.c_int * 4)(CTL_KERN, KERN_PROC, KERN_PROC_PID, os.getpid())
	size = ctypes.c_size_t(0)

	if library.sysctl(mib, 4, None, ctypes.byref(size), None, 0) != 0 or not size.value:
		return None

	buffer = ctypes.create_string_buffer(size.value)

	if library.sysctl(mib, 4, buffer, ctypes.byref(size), None, 0) != 0:
		return None

	# A `kinfo_proc` opens with the `extern_proc` whose first member is a union, and
	# the second half of that union is the `timeval` the process started at. This is
	# the same layout `ps` reads, so the two agree.
	seconds, microseconds = struct.unpack_from('qi', buffer.raw, 0)

	return seconds + microseconds / 1e6


def _procProcessStartTime() -> Optional[float]:
	"""Linux and anything else carrying a `/proc` filesystem."""
	try:
		with open('/proc/self/stat', 'rb') as handle:
			fields = handle.read()

		with open('/proc/uptime', 'rb') as handle:
			systemUptime = float(handle.read().split()[0])
	except (OSError, ValueError, IndexError):
		return None

	# The second field is the executable name in brackets and may hold spaces of its
	# own, so the fields are counted from the last bracket rather than from the start.
	tail = fields[fields.rfind(b')') + 2 :].split()

	if len(tail) < 20:
		return None

	try:
		startedTicks = int(tail[19])
		ticksPerSecond = os.sysconf('SC_CLK_TCK')
	except (ValueError, OSError):
		return None

	if ticksPerSecond <= 0:
		return None

	return time.time() - systemUptime + startedTicks / ticksPerSecond
