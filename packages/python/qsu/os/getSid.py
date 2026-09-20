import getpass
import os
import re
import sys

from .runCommand import runCommand

_PROFILE_LIST_KEY = r'SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList'


def getSid() -> str:
	if sys.platform == 'win32':
		return _windowsSid()

	if sys.platform == 'darwin':
		return _darwinSid()

	raise RuntimeError('Not supported on this operating system.')


def _windowsSid() -> str:
	if sys.platform != 'win32':
		raise RuntimeError('Not supported on this operating system.')

	# Every profile on the machine is listed under a key named after its SID, and
	# carries the folder that profile owns. The one owning this user's home directory
	# is this user's SID. The registry is read directly, so nothing is spawned and
	# there is no command output to parse.
	import winreg

	home = os.path.expanduser('~').lower()

	try:
		with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, _PROFILE_LIST_KEY) as profiles:
			for index in range(winreg.QueryInfoKey(profiles)[0]):
				sid = winreg.EnumKey(profiles, index)

				try:
					with winreg.OpenKey(profiles, sid) as profile:
						path = winreg.QueryValueEx(profile, 'ProfileImagePath')[0]
				except OSError:
					continue

				# Windows paths are compared without case, so a profile recorded as
				# `C:\Users\Sam` still matches a home directory read as `C:\users\sam`.
				if isinstance(path, str) and path.strip().lower() == home:
					return sid
	except OSError as error:
		raise RuntimeError(str(error))

	raise RuntimeError('Failed to get the SID of the current user')


def _darwinSid() -> str:
	# Quoted because the name comes from the system rather than from this code, and
	# it is written into a shell command. macOS does not allow a single quote in a
	# user name, so there is nothing for the quotes to fail to contain.
	sid = runCommand(f"dsmemberutil getsid -U '{getpass.getuser()}'")

	if not sid:
		raise RuntimeError('Failed to get the SID of the current user')

	return re.sub(r'\r?\n', '', sid)
