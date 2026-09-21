import type { ParseAddressOptions, ParsedAddress, StringValueObject } from '../_types/global.js';

/**
 * (Private) The port each scheme is served on when the address does not name one. It is
 * reported as `defaultPort` and never as `port`, so a caller can still tell an address that
 * carried a port from one that did not.
 */
const DEFAULT_PORTS: { [key: string]: number } = {
	dns: 53,
	ftp: 21,
	ftps: 990,
	git: 9418,
	http: 80,
	https: 443,
	imap: 143,
	imaps: 993,
	ldap: 389,
	ldaps: 636,
	mongodb: 27017,
	mssql: 1433,
	mysql: 3306,
	pop3: 110,
	pop3s: 995,
	postgres: 5432,
	postgresql: 5432,
	rdp: 3389,
	redis: 6379,
	sftp: 22,
	smb: 445,
	smtp: 25,
	smtps: 465,
	ssh: 22,
	telnet: 23,
	vnc: 5900,
	ws: 80,
	wss: 443
};

// Compiled once. Building a `RegExp` inside the function recompiles the pattern on every call.
const SCHEME_PREFIX = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//;
const AUTHORITY_DELIMITER = /[/?#]/;
const DIGITS_ONLY = /^\d+$/;
const HEX_GROUP = /^[0-9a-fA-F]{1,4}$/;
const IPV4_PART = /^(0|[1-9][0-9]{0,2})$/;
// A `%` that is not the start of a `%XX` escape, which makes the whole value undecodable.
const MALFORMED_PERCENT = /%(?![0-9a-fA-F]{2})/;

function isIPv4Address(host: string): boolean {
	const parts = host.split('.');

	if (parts.length !== 4) {
		return false;
	}

	// A leading zero reads as octal in some resolvers and as decimal in others, so `01.2.3.4`
	// is rejected rather than guessed at.
	return parts.every((part) => IPV4_PART.test(part) && Number(part) <= 255);
}

function isIPv6Address(host: string): boolean {
	if (host === '') {
		return false;
	}

	const doubleIndex = host.indexOf('::');
	let groups: string[];

	if (doubleIndex !== -1) {
		if (host.indexOf('::', doubleIndex + 1) !== -1) {
			// `::` stands for the run of zero groups, so a second one leaves the length ambiguous.
			return false;
		}

		const left = host.slice(0, doubleIndex);
		const right = host.slice(doubleIndex + 2);

		groups = [...(left === '' ? [] : left.split(':')), ...(right === '' ? [] : right.split(':'))];
	} else {
		groups = host.split(':');
	}

	let count = groups.length;
	let hexGroups = groups;

	// The last group may be a dotted IPv4 address (`::ffff:192.168.1.1`), which fills two groups.
	if (count > 0 && groups[count - 1].includes('.')) {
		if (!isIPv4Address(groups[count - 1])) {
			return false;
		}

		hexGroups = groups.slice(0, count - 1);
		count += 1;
	}

	if (!hexGroups.every((group) => HEX_GROUP.test(group))) {
		return false;
	}

	// `::` replaces one group at the least, so a compressed address is short of the eight.
	return doubleIndex !== -1 ? count <= 7 : count === 8;
}

function percentDecode(value: string): string {
	if (!value.includes('%')) {
		return value;
	}

	// A value that cannot be decoded is returned as it was written rather than half-decoded,
	// so the caller sees the input instead of a string that is neither form.
	if (MALFORMED_PERCENT.test(value)) {
		return value;
	}

	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

function parseQuery(query: string, decode: boolean): StringValueObject | undefined {
	const params: StringValueObject = {};
	let found = false;

	for (const pair of query.split('&')) {
		const equalIndex = pair.indexOf('=');
		const key = equalIndex === -1 ? pair : pair.slice(0, equalIndex);

		if (key === '') {
			continue;
		}

		const value = equalIndex === -1 ? '' : pair.slice(equalIndex + 1);

		// A key that repeats keeps its last value, which is what reading the string left to
		// right into an object gives.
		params[decode ? percentDecode(key) : key] = decode ? percentDecode(value) : value;
		found = true;
	}

	return found ? params : undefined;
}

export function parseAddress(url: string, options?: ParseAddressOptions): ParsedAddress {
	const result: ParsedAddress = {
		error: false,
		protocol: undefined,
		host: undefined,
		hostname: undefined,
		port: undefined,
		defaultPort: undefined,
		user: undefined,
		pass: undefined,
		path: undefined,
		query: undefined,
		params: undefined,
		hash: undefined,
		isIP: false,
		isIPv6: false
	};

	if (typeof url !== 'string' || url.trim() === '') {
		result.error = true;

		return result;
	}

	const decode = options?.decode !== false;
	let rest = url.trim();

	// Read the scheme only where it is followed by `://` (`ssh://`, `https://`). A bare
	// `host:1234` must not be taken for a `host` scheme.
	const schemeMatch = SCHEME_PREFIX.exec(rest);

	if (schemeMatch) {
		result.protocol = schemeMatch[1].toUpperCase();
		result.defaultPort = DEFAULT_PORTS[schemeMatch[1].toLowerCase()];
		rest = rest.slice(schemeMatch[0].length);
	}

	// The authority runs to the first `/`, `?` or `#`; everything after it is the path,
	// the query and the fragment.
	const delimiterIndex = rest.search(AUTHORITY_DELIMITER);
	const authority = delimiterIndex === -1 ? rest : rest.slice(0, delimiterIndex);
	let tail = delimiterIndex === -1 ? '' : rest.slice(delimiterIndex);

	const hashIndex = tail.indexOf('#');

	if (hashIndex !== -1) {
		result.hash = tail.slice(hashIndex + 1) || undefined;
		tail = tail.slice(0, hashIndex);
	}

	const queryIndex = tail.indexOf('?');

	if (queryIndex !== -1) {
		const query = tail.slice(queryIndex + 1);

		result.query = query || undefined;
		result.params = query === '' ? undefined : parseQuery(query, decode);
		tail = tail.slice(0, queryIndex);
	}

	result.path = tail || undefined;

	if (authority === '') {
		return result;
	}

	// Split the user information off by the last `@`, so an `@` inside the password stays.
	let hostPort = authority;
	const atIndex = authority.lastIndexOf('@');

	if (atIndex !== -1) {
		const userInfo = authority.slice(0, atIndex);

		hostPort = authority.slice(atIndex + 1);

		// Split the user off by the first `:`, so a `:` inside the password stays.
		const colonIndex = userInfo.indexOf(':');
		const user = colonIndex === -1 ? userInfo : userInfo.slice(0, colonIndex);
		const pass = colonIndex === -1 ? '' : userInfo.slice(colonIndex + 1);

		result.user = user === '' ? undefined : decode ? percentDecode(user) : user;
		result.pass = pass === '' ? undefined : decode ? percentDecode(pass) : pass;
	}

	const parsePort = (portString: string): void => {
		if (portString === '') {
			return;
		}

		if (!DIGITS_ONLY.test(portString) || Number(portString) > 65535) {
			result.error = true;

			return;
		}

		result.port = Number(portString);
	};

	if (hostPort.startsWith('[')) {
		// Bracketed IPv6. The brackets are kept as part of the host and dropped from the hostname.
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
			// Bare IPv6 without brackets (`::1`, `fe80::1`). It cannot carry a port, because the
			// colon before it cannot be told from the ones inside the address.
			result.host = hostPort;
		} else if (colonCount === 1) {
			const [host, portString] = hostPort.split(':');

			result.host = host === '' ? undefined : host;
			parsePort(portString);
		} else {
			result.host = hostPort === '' ? undefined : hostPort;
		}
	}

	if (result.host !== undefined) {
		result.hostname = result.host.startsWith('[') ? result.host.slice(1, -1) : result.host;
		result.isIPv6 = isIPv6Address(result.hostname);
		result.isIP = result.isIPv6 || isIPv4Address(result.hostname);
	}

	return result;
}
