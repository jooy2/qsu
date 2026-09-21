import re
from typing import Optional
from urllib.parse import unquote

# The port each scheme is served on when the address does not name one. It is
# reported as `defaultPort` and never as `port`, so a caller can still tell an
# address that carried a port from one that did not.
_DEFAULT_PORTS = {
	'dns': 53,
	'ftp': 21,
	'ftps': 990,
	'git': 9418,
	'http': 80,
	'https': 443,
	'imap': 143,
	'imaps': 993,
	'ldap': 389,
	'ldaps': 636,
	'mongodb': 27017,
	'mssql': 1433,
	'mysql': 3306,
	'pop3': 110,
	'pop3s': 995,
	'postgres': 5432,
	'postgresql': 5432,
	'rdp': 3389,
	'redis': 6379,
	'sftp': 22,
	'smb': 445,
	'smtp': 25,
	'smtps': 465,
	'ssh': 22,
	'telnet': 23,
	'vnc': 5900,
	'ws': 80,
	'wss': 443,
}

# Compiled once. Building the pattern inside the function recompiles it on every call.
_SCHEME_PREFIX = re.compile(r'^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/')
_AUTHORITY_DELIMITER = re.compile(r'[/?#]')
_DIGITS_ONLY = re.compile(r'^\d+$')
_HEX_GROUP = re.compile(r'^[0-9a-fA-F]{1,4}$')
_IPV4_PART = re.compile(r'^(0|[1-9][0-9]{0,2})$')
# A `%` that is not the start of a `%XX` escape, which makes the whole value undecodable.
_MALFORMED_PERCENT = re.compile(r'%(?![0-9a-fA-F]{2})')


def _is_ipv4_address(host: str) -> bool:
	# A leading zero reads as octal in some resolvers and as decimal in others, so
	# `01.2.3.4` is rejected rather than guessed at.
	parts = host.split('.')

	if len(parts) != 4:
		return False

	return all(_IPV4_PART.match(part) and int(part) <= 255 for part in parts)


def _is_ipv6_address(host: str) -> bool:
	if host == '':
		return False

	doubleIndex = host.find('::')

	if doubleIndex != -1:
		if host.find('::', doubleIndex + 1) != -1:
			# `::` stands for the run of zero groups, so a second one leaves the
			# length ambiguous.
			return False

		left = host[:doubleIndex]
		right = host[doubleIndex + 2:]
		groups = (left.split(':') if left != '' else []) + (
			right.split(':') if right != '' else []
		)
	else:
		groups = host.split(':')

	count = len(groups)
	hexGroups = groups

	# The last group may be a dotted IPv4 address (`::ffff:192.168.1.1`), which
	# fills two groups.
	if count > 0 and '.' in groups[count - 1]:
		if not _is_ipv4_address(groups[count - 1]):
			return False

		hexGroups = groups[:count - 1]
		count += 1

	if not all(_HEX_GROUP.match(group) for group in hexGroups):
		return False

	# `::` replaces one group at the least, so a compressed address is short of the eight.
	return count <= 7 if doubleIndex != -1 else count == 8


def _percent_decode(value: str) -> str:
	if '%' not in value:
		return value

	# A value that cannot be decoded is returned as it was written rather than
	# half-decoded, so the caller sees the input instead of a string that is
	# neither form.
	if _MALFORMED_PERCENT.search(value):
		return value

	try:
		return unquote(value, errors='strict')
	except UnicodeDecodeError:
		return value


def _parse_query(query: str, decode: bool) -> Optional[dict]:
	params: dict = {}

	for pair in query.split('&'):
		equalIndex = pair.find('=')
		key = pair if equalIndex == -1 else pair[:equalIndex]

		if key == '':
			continue

		value = '' if equalIndex == -1 else pair[equalIndex + 1:]

		# A key that repeats keeps its last value, which is what reading the string
		# left to right into a dict gives.
		params[_percent_decode(key) if decode else key] = (
			_percent_decode(value) if decode else value
		)

	return params if params else None


def parseAddress(url: str, options: Optional[dict] = None, **kwargs) -> dict:
	opts = {**(options or {}), **kwargs}
	decode = opts.get('decode', True)

	result: dict = {
		'error': False,
		'protocol': None,
		'host': None,
		'hostname': None,
		'port': None,
		'defaultPort': None,
		'user': None,
		'pass': None,
		'path': None,
		'query': None,
		'params': None,
		'hash': None,
		'isIP': False,
		'isIPv6': False,
	}

	if not isinstance(url, str) or url.strip() == '':
		result['error'] = True

		return result

	rest = url.strip()

	# Read the scheme only where it is followed by `://` (`ssh://`, `https://`). A
	# bare `host:1234` must not be taken for a `host` scheme.
	schemeMatch = _SCHEME_PREFIX.match(rest)

	if schemeMatch:
		result['protocol'] = schemeMatch.group(1).upper()
		result['defaultPort'] = _DEFAULT_PORTS.get(schemeMatch.group(1).lower())
		rest = rest[len(schemeMatch.group(0)):]

	# The authority runs to the first `/`, `?` or `#`; everything after it is the
	# path, the query and the fragment.
	delimiterMatch = _AUTHORITY_DELIMITER.search(rest)
	delimiterIndex = -1 if delimiterMatch is None else delimiterMatch.start()
	authority = rest if delimiterIndex == -1 else rest[:delimiterIndex]
	tail = '' if delimiterIndex == -1 else rest[delimiterIndex:]

	hashIndex = tail.find('#')

	if hashIndex != -1:
		fragment = tail[hashIndex + 1:]

		result['hash'] = fragment if fragment != '' else None
		tail = tail[:hashIndex]

	queryIndex = tail.find('?')

	if queryIndex != -1:
		queryString = tail[queryIndex + 1:]

		result['query'] = queryString if queryString != '' else None
		result['params'] = (
			None if queryString == '' else _parse_query(queryString, decode)
		)
		tail = tail[:queryIndex]

	result['path'] = tail if tail != '' else None

	if authority == '':
		return result

	# Split the user information off by the last `@`, so an `@` inside the password stays.
	hostPort = authority
	atIndex = authority.rfind('@')

	if atIndex != -1:
		userInfo = authority[:atIndex]

		hostPort = authority[atIndex + 1:]

		# Split the user off by the first `:`, so a `:` inside the password stays.
		colonIndex = userInfo.find(':')
		user = userInfo if colonIndex == -1 else userInfo[:colonIndex]
		passwd = '' if colonIndex == -1 else userInfo[colonIndex + 1:]

		if user != '':
			result['user'] = _percent_decode(user) if decode else user
		if passwd != '':
			result['pass'] = _percent_decode(passwd) if decode else passwd

	def parsePort(portString: str) -> None:
		if portString == '':
			return

		if not _DIGITS_ONLY.match(portString) or int(portString) > 65535:
			result['error'] = True

			return

		result['port'] = int(portString)

	if hostPort.startswith('['):
		# Bracketed IPv6. The brackets are kept as part of the host and dropped
		# from the hostname.
		closeIndex = hostPort.find(']')

		if closeIndex == -1:
			result['error'] = True

			return result

		result['host'] = hostPort[:closeIndex + 1]

		after = hostPort[closeIndex + 1:]

		if after == '':
			pass
		elif after.startswith(':'):
			parsePort(after[1:])
		else:
			result['error'] = True
	else:
		colonCount = hostPort.count(':')

		if colonCount >= 2:
			# Bare IPv6 without brackets (`::1`, `fe80::1`). It cannot carry a port,
			# because the colon before it cannot be told from the ones inside the address.
			result['host'] = hostPort
		elif colonCount == 1:
			host, portString = hostPort.split(':')

			result['host'] = host if host != '' else None
			parsePort(portString)
		else:
			result['host'] = hostPort if hostPort != '' else None

	if result['host'] is not None:
		hostname = (
			result['host'][1:-1] if result['host'].startswith('[') else result['host']
		)

		result['hostname'] = hostname
		result['isIPv6'] = _is_ipv6_address(hostname)
		result['isIP'] = result['isIPv6'] or _is_ipv4_address(hostname)

	return result
