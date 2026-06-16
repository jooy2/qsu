import sys

from .runCommand import runCommand


def getMachineId() -> str:
	platformName = sys.platform

	if platformName == 'win32':
		command = (
			'for /f "tokens=3 delims= " %i in (\'REG QUERY '
			'HKLM\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid ^| '
			'findstr MachineGuid\') do @echo %i'
		)
	elif platformName == 'darwin':
		command = "ioreg -rd1 -c IOPlatformExpertDevice | awk '/IOPlatformUUID/' | cut -d '\"' -f4"
	elif platformName.startswith('freebsd'):
		command = 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid'
	else:
		command = (
			'(cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname) '
			'| head -n 1 || :'
		)

	try:
		response = runCommand(command)

		if response:
			return response
	except Exception as error:
		raise RuntimeError(str(error))

	raise RuntimeError('Failed to get machine id')
