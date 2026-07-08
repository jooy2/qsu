import type { ParsedAddress } from '../_types/global';

export function getParsedInfoFromAddress(url: string): ParsedAddress {
	const result: ParsedAddress = {
		error: false,
		protocol: undefined,
		host: undefined,
		port: undefined,
		user: undefined,
		pass: undefined
	};

	if (typeof url !== 'string' || url.trim() === '') {
		result.error = true;

		return result;
	}

	let rest = url.trim();

	// Extract the scheme only when it is followed by `://` (e.g. `ssh://`, `https://`).
	// A bare `host:1234` must not be treated as a `host` scheme.
	const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//.exec(rest);

	if (schemeMatch) {
		result.protocol = schemeMatch[1].toUpperCase();
		rest = rest.slice(schemeMatch[0].length);
	}

	// Drop the path/query/fragment. Only the authority part is analyzed.
	const authority = rest.split(/[/?#]/)[0];

	if (authority === '') {
		return result;
	}

	// Split userinfo from host by the last `@` so that `@` inside the password is preserved.
	let hostPort = authority;
	const atIndex = authority.lastIndexOf('@');

	if (atIndex !== -1) {
		const userInfo = authority.slice(0, atIndex);

		hostPort = authority.slice(atIndex + 1);

		// Split user from password by the first `:` so that `:` inside the password is preserved.
		const colonIndex = userInfo.indexOf(':');
		const user = colonIndex !== -1 ? userInfo.slice(0, colonIndex) : userInfo;
		const pass = colonIndex !== -1 ? userInfo.slice(colonIndex + 1) : '';

		result.user = user === '' ? undefined : user;
		result.pass = pass === '' ? undefined : pass;
	}

	const parsePort = (portString: string): void => {
		if (portString === '') {
			return;
		}

		if (!/^\d+$/.test(portString) || Number(portString) > 65535) {
			result.error = true;

			return;
		}

		result.port = Number(portString);
	};

	if (hostPort.startsWith('[')) {
		// Bracketed IPv6. Keep the brackets as part of the host.
		const closeIndex = hostPort.indexOf(']');

		if (closeIndex === -1) {
			result.error = true;

			return result;
		}

		result.host = hostPort.slice(0, closeIndex + 1);

		const after = hostPort.slice(closeIndex + 1);

		if (after === '') {
			// No port.
		} else if (after.startsWith(':')) {
			parsePort(after.slice(1));
		} else {
			result.error = true;
		}
	} else {
		const colonCount = (hostPort.match(/:/g) || []).length;

		if (colonCount >= 2) {
			// Bare IPv6 without brackets (e.g. `::1`, `fe80::1`). It cannot carry a port.
			result.host = hostPort;
		} else if (colonCount === 1) {
			const [host, portString] = hostPort.split(':');

			result.host = host === '' ? undefined : host;
			parsePort(portString);
		} else {
			result.host = hostPort === '' ? undefined : hostPort;
		}
	}

	return result;
}
