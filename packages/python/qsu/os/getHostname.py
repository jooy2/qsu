import os
import socket
import sys

from .runCommand import runCommand


def getHostname() -> str:
	platformName = sys.platform

	if platformName == 'win32':
		return os.environ.get('COMPUTERNAME') or socket.gethostname() or 'Unknown'
	elif platformName == 'darwin':
		command = 'scutil --get ComputerName'
	elif platformName.startswith('linux') or platformName.startswith('freebsd'):
		command = 'hostnamectl hostname'
	else:
		return socket.gethostname() or 'Unknown'

	try:
		response = runCommand(command)

		if response:
			return response
	except Exception as error:
		raise RuntimeError(str(error))

	return 'Unknown'
