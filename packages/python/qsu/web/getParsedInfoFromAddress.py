import re


def getParsedInfoFromAddress(url: str) -> dict:
	result = {
		'error': False,
		'protocol': None,
		'host': None,
		'port': None,
		'user': None,
		'pass': None,
	}

	if not isinstance(url, str) or url.strip() == '':
		result['error'] = True

		return result

	rest = url.strip()

	# Extract the scheme only when it is followed by `://` (e.g. `ssh://`,
	# `https://`). A bare `host:1234` must not be treated as a `host` scheme.
	schemeMatch = re.match(r'^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/', rest)

	if schemeMatch:
		result['protocol'] = schemeMatch.group(1).upper()
		rest = rest[len(schemeMatch.group(0)):]

	# Drop the path/query/fragment. Only the authority part is analyzed.
	authority = re.split(r'[/?#]', rest)[0]

	if authority == '':
		return result

	# Split userinfo from host by the last `@` so `@` inside the password stays.
	hostPort = authority
	atIndex = authority.rfind('@')

	if atIndex != -1:
		userInfo = authority[:atIndex]

		hostPort = authority[atIndex + 1:]

		# Split user from password by the first `:` so `:` inside password stays.
		colonIndex = userInfo.find(':')
		user = userInfo[:colonIndex] if colonIndex != -1 else userInfo
		passwd = userInfo[colonIndex + 1:] if colonIndex != -1 else ''

		result['user'] = user if user != '' else None
		result['pass'] = passwd if passwd != '' else None

	def parsePort(portString: str) -> None:
		if portString == '':
			return

		if not re.match(r'^\d+$', portString) or int(portString) > 65535:
			result['error'] = True

			return

		result['port'] = int(portString)

	if hostPort.startswith('['):
		# Bracketed IPv6. Keep the brackets as part of the host.
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
			# Bare IPv6 without brackets (e.g. `::1`). It cannot carry a port.
			result['host'] = hostPort
		elif colonCount == 1:
			host, portString = hostPort.split(':')

			result['host'] = host if host != '' else None
			parsePort(portString)
		else:
			result['host'] = hostPort if hostPort != '' else None

	return result
