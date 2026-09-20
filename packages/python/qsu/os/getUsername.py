import getpass
import os
from typing import Optional


def getUsername() -> str:
	# The name recorded for this account, which is what the JavaScript package
	# reports. `getpass.getuser()` would read the environment first, and that can
	# name somebody else entirely.
	return _accountName() or _environmentName() or 'Unknown'


def _accountName() -> Optional[str]:
	try:
		import pwd

		return pwd.getpwuid(os.getuid()).pw_name or None
	except (ImportError, KeyError, AttributeError):
		# The account has no entry in the password database, which happens in a
		# container running under an id that was never given a name.
		return None


def _environmentName() -> Optional[str]:
	try:
		return getpass.getuser() or None
	except (OSError, KeyError):
		return None
