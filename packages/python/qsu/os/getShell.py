import os
import sys
from typing import Optional


def getShell() -> str:
	if sys.platform == 'win32':
		return os.environ.get('COMSPEC') or 'cmd.exe'

	return _loginShell() or os.environ.get('SHELL') or '/bin/sh'


def _loginShell() -> Optional[str]:
	try:
		import pwd

		# The shell recorded for the account, which is the one a login starts. It is
		# not necessarily the shell the caller is typing into.
		return pwd.getpwuid(os.getuid()).pw_shell or None
	except (ImportError, KeyError, AttributeError):
		return None
