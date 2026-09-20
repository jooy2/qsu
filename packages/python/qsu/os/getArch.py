import os
import platform
import sys

# Every name a system might answer with, written the way the JavaScript package
# writes it. Node's own vocabulary is the one the packages share.
_ARCH_NAMES = {
	'aarch64': 'arm64',
	'aarch64_be': 'arm64',
	'amd64': 'x64',
	'armv6l': 'arm',
	'armv7l': 'arm',
	'armv8b': 'arm64',
	'armv8l': 'arm64',
	'i386': 'ia32',
	'i486': 'ia32',
	'i586': 'ia32',
	'i686': 'ia32',
	'loongarch64': 'loong64',
	'powerpc': 'ppc',
	'ppc64le': 'ppc64',
	'x86': 'ia32',
	'x86_64': 'x64',
}


def getArch() -> str:
	machine = _machine().lower()

	return _ARCH_NAMES.get(machine, machine) or 'unknown'


def _machine() -> str:
	if sys.platform == 'win32':
		# `platform.machine()` prefers `PROCESSOR_ARCHITEW6432`, which names the
		# machine rather than the process running on it. The JavaScript package
		# reports what the running binary was built for, so this one does too.
		return os.environ.get('PROCESSOR_ARCHITECTURE') or platform.machine()

	return platform.machine()
