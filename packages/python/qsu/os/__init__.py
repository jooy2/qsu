from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .getArch import getArch as getArch
	from .getBootTime import getBootTime as getBootTime
	from .getComputerName import getComputerName as getComputerName
	from .getCpuCount import getCpuCount as getCpuCount
	from .getCpuModel import getCpuModel as getCpuModel
	from .getCpuSpeed import getCpuSpeed as getCpuSpeed
	from .getCpuUsage import getCpuUsage as getCpuUsage
	from .getDiskSize import getDiskSize as getDiskSize
	from .getDiskUsage import getDiskUsage as getDiskUsage
	from .getEndianness import getEndianness as getEndianness
	from .getFonts import getFonts as getFonts
	from .getFreeDiskSize import getFreeDiskSize as getFreeDiskSize
	from .getFreeRamSize import getFreeRamSize as getFreeRamSize
	from .getHomeDir import getHomeDir as getHomeDir
	from .getKernelVersion import getKernelVersion as getKernelVersion
	from .getLocalIp import getLocalIp as getLocalIp
	from .getMachineId import getMachineId as getMachineId
	from .getOsName import getOsName as getOsName
	from .getPlatform import getPlatform as getPlatform
	from .getProcessRamSize import getProcessRamSize as getProcessRamSize
	from .getProcessUptime import getProcessUptime as getProcessUptime
	from .getRamSize import getRamSize as getRamSize
	from .getRamUsage import getRamUsage as getRamUsage
	from .getShell import getShell as getShell
	from .getSid import getSid as getSid
	from .getSystemUptime import getSystemUptime as getSystemUptime
	from .getTempDir import getTempDir as getTempDir
	from .getUsedRamSize import getUsedRamSize as getUsedRamSize
	from .getUsername import getUsername as getUsername
	from .runCommand import runCommand as runCommand

__all__ = [
	'getArch',
	'getBootTime',
	'getComputerName',
	'getCpuCount',
	'getCpuModel',
	'getCpuSpeed',
	'getCpuUsage',
	'getDiskSize',
	'getDiskUsage',
	'getEndianness',
	'getFonts',
	'getFreeDiskSize',
	'getFreeRamSize',
	'getHomeDir',
	'getKernelVersion',
	'getLocalIp',
	'getMachineId',
	'getOsName',
	'getPlatform',
	'getProcessRamSize',
	'getProcessUptime',
	'getRamSize',
	'getRamUsage',
	'getShell',
	'getSid',
	'getSystemUptime',
	'getTempDir',
	'getUsedRamSize',
	'getUsername',
	'runCommand',
]

lazy(__name__)
