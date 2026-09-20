import platform
import sys
from typing import Optional

from ._system import sysctlString, windowsRegistryString

# The first of these that `/proc/cpuinfo` carries names the processor. Which one it
# is depends on the architecture: x86 writes `model name`, older ARM kernels write
# `Processor`, MIPS writes `cpu model`, and a board may only name itself.
_CPU_INFO_KEYS = ('model name', 'Processor', 'cpu model', 'Hardware', 'Model')

_WINDOWS_CPU_KEY = r'HARDWARE\DESCRIPTION\System\CentralProcessor\0'


def getCpu() -> str:
	# `platform.processor()` is the architecture on macOS and empty on most Linux
	# systems, so the name is read from the system first and it stays as the fallback.
	model = _model() or platform.processor() or platform.machine()

	return f'{model or "Unknown"}'


def _model() -> Optional[str]:
	if sys.platform == 'win32':
		return windowsRegistryString(_WINDOWS_CPU_KEY, 'ProcessorNameString')

	if sys.platform == 'darwin':
		return sysctlString('machdep.cpu.brand_string')

	return _cpuInfoModel()


def _cpuInfoModel() -> Optional[str]:
	fields = {}

	try:
		with open('/proc/cpuinfo', encoding='utf-8', errors='replace') as handle:
			for line in handle:
				# The file repeats itself once per core, so the first block is enough.
				if not line.strip():
					break

				name, separator, value = line.partition(':')

				if separator:
					fields[name.strip()] = value.strip()
	except OSError:
		return None

	for key in _CPU_INFO_KEYS:
		if fields.get(key):
			return fields[key]

	return None
