from .._lazy import lazy

__all__ = [
	'getCpu',
	'getHostname',
	'getMachineId',
	'getRamSize',
	'getSid',
	'getUptime',
	'runCommand',
]

lazy(__name__)
