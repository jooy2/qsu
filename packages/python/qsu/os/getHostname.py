import os
import socket
import sys
from typing import Optional

from .runCommand import runCommand


def getHostname() -> str:
	if sys.platform == 'darwin':
		# The name given to the machine in System Settings, which is not the kernel
		# hostname: `Sam's MacBook` against `sams-macbook.local`.
		return _computerName() or socket.gethostname() or 'Unknown'

	if sys.platform.startswith('linux'):
		return _staticHostname() or socket.gethostname() or 'Unknown'

	if sys.platform == 'win32':
		return os.environ.get('COMPUTERNAME') or socket.gethostname() or 'Unknown'

	return socket.gethostname() or 'Unknown'


def _computerName() -> Optional[str]:
	try:
		name = runCommand('scutil --get ComputerName')
	except Exception:
		# No name has been set, or the tool refused to answer. The kernel always has a
		# name of its own, so the caller is not left with an error.
		return None

	return (name or '').strip() or None


def _staticHostname() -> Optional[str]:
	try:
		with open('/etc/hostname', encoding='utf-8', errors='replace') as handle:
			# What `hostnamectl` reports, without needing systemd to be installed.
			return handle.readline().strip() or None
	except OSError:
		# A system that sets its hostname another way keeps no such file.
		return None
