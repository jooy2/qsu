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


_libcHandle = None
_libcLoaded = False


def _libc():
	"""The C library, opened on the first call that needs it and then kept."""
	global _libcHandle, _libcLoaded

	if not _libcLoaded:
		_libcLoaded = True

		import ctypes
		import ctypes.util

		name = ctypes.util.find_library('c')
		_libcHandle = ctypes.CDLL(name, use_errno=True) if name else None

	return _libcHandle


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


def sysctlBytes(name: str, size: int) -> Optional[bytes]:
	"""One `sysctl` read as raw bytes, for a value that is a struct. macOS and the BSDs."""
	library = _libc()

	if library is None:
		return None

	import ctypes

	buffer = ctypes.create_string_buffer(size)
	length = ctypes.c_size_t(size)

	if library.sysctlbyname(name.encode(), buffer, ctypes.byref(length), None, 0) != 0:
		return None

	return buffer.raw[: length.value]


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


def windowsRegistryNumber(path: str, name: str) -> Optional[int]:
	"""One numeric value under `HKEY_LOCAL_MACHINE`, read without running a command."""
	if sys.platform != 'win32':
		return None

	import winreg

	try:
		with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, path) as key:
			value = winreg.QueryValueEx(key, name)[0]
	except OSError:
		return None

	return value if isinstance(value, int) else None


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


# The frequency libuv reports on an Apple Silicon Mac. Apple does not publish the
# real one, so the JavaScript package answers with this and so does this package,
# rather than the two disagreeing about the same machine.
_APPLE_SILICON_MHZ = 2400

_LINUX_CPU_FREQUENCY = '/sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq'

_WINDOWS_CPU_KEY = r'HARDWARE\DESCRIPTION\System\CentralProcessor\0'

# `host_statistics` counts ticks in this order, and idle is the third of them.
_MACH_CPU_STATES = 4
_MACH_CPU_STATE_IDLE = 2
_MACH_HOST_CPU_LOAD_INFO = 3


def cpuSpeed() -> int:
	"""The clock speed of the first processor, in megahertz, or zero when unknown."""
	if sys.platform == 'win32':
		return windowsRegistryNumber(_WINDOWS_CPU_KEY, '~MHz') or 0

	if sys.platform == 'darwin':
		hertz = sysctlUnsigned('hw.cpufrequency')

		return hertz // 1000000 if hertz else _APPLE_SILICON_MHZ

	try:
		with open(_LINUX_CPU_FREQUENCY, 'rb') as handle:
			# The file is in kilohertz.
			return int(handle.read().strip()) // 1000
	except (OSError, ValueError):
		return 0


def cpuTicks() -> Optional[Tuple[int, int]]:
	"""Processor time since boot, as a total and the part of it spent idle.

	The units differ between platforms and mean nothing on their own. Two readings
	a moment apart are what says how busy the processor was in between.
	"""
	if sys.platform == 'win32':
		return _windowsCpuTicks()

	if sys.platform == 'darwin':
		return _darwinCpuTicks()

	return _procCpuTicks()


def _windowsCpuTicks() -> Optional[Tuple[int, int]]:
	if sys.platform != 'win32':
		return None

	import ctypes
	from ctypes import wintypes

	kernel32 = ctypes.WinDLL('kernel32', use_last_error=True)
	idle, kernel, user = (wintypes.FILETIME() for _ in range(3))

	if not kernel32.GetSystemTimes(ctypes.byref(idle), ctypes.byref(kernel), ctypes.byref(user)):
		return None

	def intervals(value) -> int:
		return (value.dwHighDateTime << 32) | value.dwLowDateTime

	# The kernel figure already counts the idle time inside it.
	return intervals(kernel) + intervals(user), intervals(idle)


def _darwinCpuTicks() -> Optional[Tuple[int, int]]:
	library = _libc()

	if library is None:
		return None

	import ctypes

	class HostCpuLoadInfo(ctypes.Structure):
		_fields_ = [('cpu_ticks', ctypes.c_uint * _MACH_CPU_STATES)]

	library.mach_host_self.restype = ctypes.c_uint
	info = HostCpuLoadInfo()
	count = ctypes.c_uint(_MACH_CPU_STATES)

	if library.host_statistics(
		library.mach_host_self(), _MACH_HOST_CPU_LOAD_INFO, ctypes.byref(info), ctypes.byref(count)
	) != 0:
		return None

	ticks = list(info.cpu_ticks)

	return sum(ticks), ticks[_MACH_CPU_STATE_IDLE]


def _procCpuTicks() -> Optional[Tuple[int, int]]:
	try:
		with open('/proc/stat', 'rb') as handle:
			fields = handle.readline().split()
	except OSError:
		return None

	if len(fields) < 7 or fields[0] != b'cpu':
		return None

	try:
		# user, nice, system, idle and irq, which is the set the JavaScript package
		# counts. The time waiting on I/O and the time stolen by a hypervisor sit
		# between them in the file and are left out of both.
		user, nice, system, idle, _, irq = (int(field) for field in fields[1:7])
	except ValueError:
		return None

	return user + nice + system + idle + irq, idle


# `task_info` answers in this shape, and the resident size is its second member.
_MACH_TASK_BASIC_INFO = 20


def residentSetSize() -> Optional[int]:
	"""The physical memory this process currently occupies, in bytes."""
	if sys.platform == 'win32':
		return _windowsResidentSetSize()

	if sys.platform == 'darwin':
		return _darwinResidentSetSize()

	return _procResidentSetSize()


def _windowsResidentSetSize() -> Optional[int]:
	if sys.platform != 'win32':
		return None

	import ctypes
	from ctypes import wintypes

	class PROCESS_MEMORY_COUNTERS(ctypes.Structure):
		_fields_ = [
			('cb', wintypes.DWORD),
			('PageFaultCount', wintypes.DWORD),
			('PeakWorkingSetSize', ctypes.c_size_t),
			('WorkingSetSize', ctypes.c_size_t),
			('QuotaPeakPagedPoolUsage', ctypes.c_size_t),
			('QuotaPagedPoolUsage', ctypes.c_size_t),
			('QuotaPeakNonPagedPoolUsage', ctypes.c_size_t),
			('QuotaNonPagedPoolUsage', ctypes.c_size_t),
			('PagefileUsage', ctypes.c_size_t),
			('PeakPagefileUsage', ctypes.c_size_t),
		]

	kernel32 = ctypes.WinDLL('kernel32', use_last_error=True)
	kernel32.GetCurrentProcess.restype = wintypes.HANDLE

	psapi = ctypes.WinDLL('psapi', use_last_error=True)
	# Without these, the handle is passed as a C `int`. `GetCurrentProcess` answers
	# with a pseudo-handle of all ones, which does not fit in one.
	psapi.GetProcessMemoryInfo.argtypes = [
		wintypes.HANDLE,
		ctypes.POINTER(PROCESS_MEMORY_COUNTERS),
		wintypes.DWORD,
	]
	psapi.GetProcessMemoryInfo.restype = wintypes.BOOL

	counters = PROCESS_MEMORY_COUNTERS()
	counters.cb = ctypes.sizeof(PROCESS_MEMORY_COUNTERS)

	if not psapi.GetProcessMemoryInfo(
		kernel32.GetCurrentProcess(), ctypes.byref(counters), counters.cb
	):
		return None

	return int(counters.WorkingSetSize)


def _darwinResidentSetSize() -> Optional[int]:
	library = _libc()

	if library is None:
		return None

	import ctypes

	class TimeValue(ctypes.Structure):
		_fields_ = [('seconds', ctypes.c_int), ('microseconds', ctypes.c_int)]

	class MachTaskBasicInfo(ctypes.Structure):
		_fields_ = [
			('virtual_size', ctypes.c_uint64),
			('resident_size', ctypes.c_uint64),
			('resident_size_max', ctypes.c_uint64),
			('user_time', TimeValue),
			('system_time', TimeValue),
			('policy', ctypes.c_int),
			('suspend_count', ctypes.c_int),
		]

	library.mach_task_self.restype = ctypes.c_uint
	info = MachTaskBasicInfo()
	count = ctypes.c_uint(ctypes.sizeof(MachTaskBasicInfo) // ctypes.sizeof(ctypes.c_int))

	if library.task_info(
		library.mach_task_self(), _MACH_TASK_BASIC_INFO, ctypes.byref(info), ctypes.byref(count)
	) != 0:
		return None

	return int(info.resident_size)


def _procResidentSetSize() -> Optional[int]:
	try:
		with open('/proc/self/statm', 'rb') as handle:
			# The second field is the resident set, counted in pages.
			pages = int(handle.read().split()[1])

		return pages * os.sysconf('SC_PAGE_SIZE')
	except (OSError, ValueError, IndexError):
		return None


def systemUptime() -> Optional[float]:
	"""Seconds since the machine booted.

	Each branch computes it the way libuv does, so the value matches what the
	JavaScript package reports on the same machine, down to the granularity: whole
	seconds on macOS, fractions of one on Windows and Linux.
	"""
	if sys.platform == 'win32':
		return _windowsSystemUptime()

	if sys.platform == 'darwin':
		return _darwinSystemUptime()

	return _procSystemUptime()


def _windowsSystemUptime() -> Optional[float]:
	if sys.platform != 'win32':
		return None

	import ctypes

	kernel32 = ctypes.WinDLL('kernel32', use_last_error=True)
	kernel32.GetTickCount64.restype = ctypes.c_uint64

	return kernel32.GetTickCount64() / 1000.0


def _darwinSystemUptime() -> Optional[float]:
	# `kern.boottime` is a `timeval`. Both sides of the subtraction are whole
	# seconds, which is why macOS answers in whole seconds and the other two do not.
	value = sysctlBytes('kern.boottime', 16)

	if value is None or len(value) < 12:
		return None

	bootSeconds = struct.unpack_from('q', value, 0)[0]

	return float(int(time.time()) - bootSeconds)


def _procSystemUptime() -> Optional[float]:
	try:
		with open('/proc/uptime', 'rb') as handle:
			return float(handle.read().split()[0])
	except (OSError, ValueError, IndexError):
		pass

	clock = getattr(time, 'CLOCK_BOOTTIME', None)

	if clock is None:
		return None

	try:
		return float(int(time.clock_gettime(clock)))
	except OSError:
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
	bootedSecondsAgo = _procSystemUptime()

	if bootedSecondsAgo is None:
		return None

	try:
		with open('/proc/self/stat', 'rb') as handle:
			fields = handle.read()
	except OSError:
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

	return time.time() - bootedSecondsAgo + startedTicks / ticksPerSecond
