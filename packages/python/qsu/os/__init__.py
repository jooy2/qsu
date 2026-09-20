from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .getArch import getArch as getArch
	from .getCpu import getCpu as getCpu
	from .getCpuCount import getCpuCount as getCpuCount
	from .getDiskSize import getDiskSize as getDiskSize
	from .getDiskUsage import getDiskUsage as getDiskUsage
	from .getEndianness import getEndianness as getEndianness
	from .getFreeDiskSize import getFreeDiskSize as getFreeDiskSize
	from .getFreeRamSize import getFreeRamSize as getFreeRamSize
	from .getHostname import getHostname as getHostname
	from .getKernelVersion import getKernelVersion as getKernelVersion
	from .getMachineId import getMachineId as getMachineId
	from .getPlatform import getPlatform as getPlatform
	from .getRamSize import getRamSize as getRamSize
	from .getRamUsage import getRamUsage as getRamUsage
	from .getSid import getSid as getSid
	from .getUptime import getUptime as getUptime
	from .getUsedRamSize import getUsedRamSize as getUsedRamSize
	from .runCommand import runCommand as runCommand

__all__ = [
	'getArch',
	'getCpu',
	'getCpuCount',
	'getDiskSize',
	'getDiskUsage',
	'getEndianness',
	'getFreeDiskSize',
	'getFreeRamSize',
	'getHostname',
	'getKernelVersion',
	'getMachineId',
	'getPlatform',
	'getRamSize',
	'getRamUsage',
	'getSid',
	'getUptime',
	'getUsedRamSize',
	'runCommand',
]

lazy(__name__)
