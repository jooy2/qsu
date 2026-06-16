import os
import sys

from ..format.fileSizeFormat import fileSizeFormat


def _totalmem() -> int:
	if sys.platform == 'win32':
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

		stat = MEMORYSTATUSEX()
		stat.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
		ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(stat))

		return int(stat.ullTotalPhys)

	return os.sysconf('SC_PAGE_SIZE') * os.sysconf('SC_PHYS_PAGES')


def getRamSize() -> str:
	return fileSizeFormat(_totalmem(), 0, True)
