import sys

# What each runtime calls the systems qsu knows. A name outside this table is
# reported as `unknown` rather than guessed at from the one next to it.
_PLATFORM_NAMES = {
	'android': 'linux',
	'cygwin': 'windows',
	'darwin': 'macos',
	'linux': 'linux',
	'msys': 'windows',
	'win32': 'windows',
}


def getPlatform() -> str:
	# FreeBSD writes its major version into `sys.platform`, so `freebsd14` has to be
	# recognised as FreeBSD rather than falling through as something unknown.
	if sys.platform.startswith('freebsd'):
		return 'freebsd'

	return _PLATFORM_NAMES.get(sys.platform, 'unknown')
