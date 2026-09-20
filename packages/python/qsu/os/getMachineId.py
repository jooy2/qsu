import re
import socket
import sys
from typing import Optional

from .runCommand import runCommand

# In the order the value is trusted. On systemd the second is a symlink to the
# first, and a system carrying neither has no machine id to give.
_MACHINE_ID_FILES = ('/var/lib/dbus/machine-id', '/etc/machine-id')

_CRYPTOGRAPHY_KEY = r'SOFTWARE\Microsoft\Cryptography'

_DARWIN_UUID_VALUE = re.compile(r'"IOPlatformUUID"\s*=\s*"([^"]+)"')


def getMachineId() -> str:
	if sys.platform == 'win32':
		machineId = _windowsMachineId()
	elif sys.platform == 'darwin':
		machineId = _darwinMachineId()
	elif sys.platform.startswith('freebsd'):
		machineId = runCommand('kenv -q smbios.system.uuid || sysctl -n kern.hostuuid')
	else:
		machineId = _linuxMachineId()

	if machineId:
		return machineId.strip()

	raise RuntimeError('Failed to get machine id')


def _windowsMachineId() -> Optional[str]:
	if sys.platform != 'win32':
		return None

	# Read straight from the registry, so nothing is spawned and no command output
	# has to be parsed. The 64-bit view is asked for explicitly, because a 32-bit
	# process is otherwise redirected to `Wow6432Node`, which does not carry this
	# value.
	import winreg

	try:
		with winreg.OpenKey(
			winreg.HKEY_LOCAL_MACHINE,
			_CRYPTOGRAPHY_KEY,
			0,
			winreg.KEY_READ | winreg.KEY_WOW64_64KEY,
		) as key:
			value = winreg.QueryValueEx(key, 'MachineGuid')[0]
	except OSError:
		return None

	return value if isinstance(value, str) else None


def _darwinMachineId() -> Optional[str]:
	properties = runCommand('ioreg -rd1 -c IOPlatformExpertDevice')
	found = _DARWIN_UUID_VALUE.search(properties or '')

	return found.group(1) if found else None


def _linuxMachineId() -> Optional[str]:
	for path in _MACHINE_ID_FILES:
		try:
			with open(path, encoding='utf-8', errors='replace') as handle:
				# The id is the first line; the file is not supposed to hold anything else.
				machineId = handle.readline().strip()
		except OSError:
			# A system that keeps no machine id simply has no such file. Try the next.
			continue

		if machineId:
			return machineId

	return socket.gethostname() or None
