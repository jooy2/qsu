from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .getArch import getArch as getArch
	from .getBootTime import getBootTime as getBootTime
	from .getCpu import getCpu as getCpu
	from .getCpuCount import getCpuCount as getCpuCount
	from .getCpuSpeed import getCpuSpeed as getCpuSpeed
	from .getCpuUsage import getCpuUsage as getCpuUsage
	from .getDiskSize import getDiskSize as getDiskSize
	from .getDiskUsage import getDiskUsage as getDiskUsage
	from .getEndianness import getEndianness as getEndianness
	from .getFreeDiskSize import getFreeDiskSize as getFreeDiskSize
	from .getFreeRamSize import getFreeRamSize as getFreeRamSize
	from .getHomeDir import getHomeDir as getHomeDir
	from .getHostname import getHostname as getHostname
	from .getKernelVersion import getKernelVersion as getKernelVersion
	from .getLocalIp import getLocalIp as getLocalIp
	from .getMachineId import getMachineId as getMachineId
	from .getOsName import getOsName as getOsName
	from .getPlatform import getPlatform as getPlatform
	from .getProcessMemoryUsage import getProcessMemoryUsage as getProcessMemoryUsage
	from .getRamSize import getRamSize as getRamSize
	from .getRamUsage import getRamUsage as getRamUsage
	from .getShell import getShell as getShell
	from .getSid import getSid as getSid
	from .getSystemUptime import getSystemUptime as getSystemUptime
	from .getTempDir import getTempDir as getTempDir
	from .getUptime import getUptime as getUptime
	from .getUsedRamSize import getUsedRamSize as getUsedRamSize
	from .getUsername import getUsername as getUsername
	from .runCommand import runCommand as runCommand

__all__ = [
	'getArch',
	'getBootTime',
	'getCpu',
	'getCpuCount',
	'getCpuSpeed',
	'getCpuUsage',
	'getDiskSize',
	'getDiskUsage',
	'getEndianness',
	'getFreeDiskSize',
	'getFreeRamSize',
	'getHomeDir',
	'getHostname',
	'getKernelVersion',
	'getLocalIp',
	'getMachineId',
	'getOsName',
	'getPlatform',
	'getProcessMemoryUsage',
	'getRamSize',
	'getRamUsage',
	'getShell',
	'getSid',
	'getSystemUptime',
	'getTempDir',
	'getUptime',
	'getUsedRamSize',
	'getUsername',
	'runCommand',
]

lazy(__name__)
