import assert from 'assert';
import { describe, it } from 'node:test';
import { parseAddress } from '../dist';
import { fetchData } from '../dist/node';

describe('Net', () => {
	it('fetchData', async () => {
		const testHost = 'https://jsonplaceholder.typicode.com';

		const responseGet = await fetchData('/posts/1', {
			host: testHost
		});

		assert.deepStrictEqual(responseGet.id, 1);

		const responsePost = await fetchData('/posts', {
			post: true,
			host: testHost,
			body: { title: 'foo', body: 'bar', userId: 1 }
		});

		assert.deepStrictEqual(responsePost.id, 101);
	});

	it('parseAddress', () => {
		type Expected = {
			error: boolean;
			protocol?: string;
			host?: string;
			hostname?: string;
			port?: number;
			defaultPort?: number;
			user?: string;
			pass?: string;
			path?: string;
			query?: string;
			params?: { [key: string]: string };
			hash?: string;
			isIP: boolean;
			isIPv6: boolean;
		};
		const base: Expected = {
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

		// [input, only the fields that differ from `base`]
		const cases: Array<[string, Partial<Expected>]> = [
			// Full form: scheme, user, password and port.
			[
				'ssh://test:pass@host:1234',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: 'host',
					hostname: 'host',
					port: 1234,
					user: 'test',
					pass: 'pass'
				}
			],
			// Web URL. Missing values stay `undefined`, not an error.
			[
				'https://google.com',
				{ protocol: 'HTTPS', defaultPort: 443, host: 'google.com', hostname: 'google.com' }
			],
			// No scheme -> protocol is `undefined` (no SSH default).
			['user:test@host', { host: 'host', hostname: 'host', user: 'user', pass: 'test' }],
			['host:1234', { host: 'host', hostname: 'host', port: 1234 }],
			[
				'192.168.1.123:1234',
				{ host: '192.168.1.123', hostname: '192.168.1.123', port: 1234, isIP: true }
			],
			['hostname', { host: 'hostname', hostname: 'hostname' }],
			[
				'ssh://test@hostname',
				{ protocol: 'SSH', defaultPort: 22, host: 'hostname', hostname: 'hostname', user: 'test' }
			],
			// IPv6 without brackets keeps the raw address and cannot carry a port.
			[
				'ssh://::1',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: '::1',
					hostname: '::1',
					isIP: true,
					isIPv6: true
				}
			],
			['::1', { host: '::1', hostname: '::1', isIP: true, isIPv6: true }],
			[
				'ssh://fe80::f9e9:1d57:9f2d:fb87',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: 'fe80::f9e9:1d57:9f2d:fb87',
					hostname: 'fe80::f9e9:1d57:9f2d:fb87',
					isIP: true,
					isIPv6: true
				}
			],
			// IPv6 with brackets keeps the brackets on `host` and drops them from `hostname`.
			[
				'ssh://[fe80::f9e9:1d57:9f2d:fb87]',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: '[fe80::f9e9:1d57:9f2d:fb87]',
					hostname: 'fe80::f9e9:1d57:9f2d:fb87',
					isIP: true,
					isIPv6: true
				}
			],
			[
				'[fe80::f9e9:1d57:9f2d:fb87]:1234',
				{
					host: '[fe80::f9e9:1d57:9f2d:fb87]',
					hostname: 'fe80::f9e9:1d57:9f2d:fb87',
					port: 1234,
					isIP: true,
					isIPv6: true
				}
			],
			[
				'test:pass@[fe80::f9e9:1d57:9f2d:fb87]:1234',
				{
					host: '[fe80::f9e9:1d57:9f2d:fb87]',
					hostname: 'fe80::f9e9:1d57:9f2d:fb87',
					port: 1234,
					user: 'test',
					pass: 'pass',
					isIP: true,
					isIPv6: true
				}
			],
			['[::1]', { host: '[::1]', hostname: '::1', isIP: true, isIPv6: true }],
			['192.168.1.1', { host: '192.168.1.1', hostname: '192.168.1.1', isIP: true }],
			// Unknown scheme is parsed as-is (generic parser, no error) and has no default port.
			[
				'asd://192.168.1.1',
				{ protocol: 'ASD', host: '192.168.1.1', hostname: '192.168.1.1', isIP: true }
			],
			// Scheme only: empty host is `undefined`, not an error.
			['ssh://', { protocol: 'SSH', defaultPort: 22 }],
			[
				'sftp://test@localhost',
				{
					protocol: 'SFTP',
					defaultPort: 22,
					host: 'localhost',
					hostname: 'localhost',
					user: 'test'
				}
			],
			['test@localhost', { host: 'localhost', hostname: 'localhost', user: 'test' }],
			[
				'test@192.168.1.1:1234',
				{
					host: '192.168.1.1',
					hostname: '192.168.1.1',
					port: 1234,
					user: 'test',
					isIP: true
				}
			],
			[
				'test@fe80::f9e9:1d57:9f2d:fb87',
				{
					host: 'fe80::f9e9:1d57:9f2d:fb87',
					hostname: 'fe80::f9e9:1d57:9f2d:fb87',
					user: 'test',
					isIP: true,
					isIPv6: true
				}
			],
			// The host is split by the last `@`; the password may keep `@` and `:`.
			[
				'test:hell@test@192.168.1.1',
				{
					host: '192.168.1.1',
					hostname: '192.168.1.1',
					user: 'test',
					pass: 'hell@test',
					isIP: true
				}
			],
			[
				'ssh://test:he::@test@192.168.1.1:1234',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: '192.168.1.1',
					hostname: '192.168.1.1',
					port: 1234,
					user: 'test',
					pass: 'he::@test',
					isIP: true
				}
			],
			['test@test:pass@host', { host: 'host', hostname: 'host', user: 'test@test', pass: 'pass' }],
			[
				'test:test@test@host:1234',
				{ host: 'host', hostname: 'host', port: 1234, user: 'test', pass: 'test@test' }
			],
			['kara', { host: 'kara', hostname: 'kara' }],
			// Empty user and password become `undefined`.
			[':@test', { host: 'test', hostname: 'test' }],

			// --- Path, query and fragment ---
			[
				'https://user:pw@example.com:8080/path?q=1#frag',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					port: 8080,
					user: 'user',
					pass: 'pw',
					path: '/path',
					query: 'q=1',
					params: { q: '1' },
					hash: 'frag'
				}
			],
			// An empty authority still leaves a path to read.
			['file:///etc/hosts', { protocol: 'FILE', path: '/etc/hosts' }],
			[
				'https://example.com/',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/'
				}
			],
			[
				'https://example.com/a/b/c',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/a/b/c'
				}
			],
			[
				'https://example.com?q=1',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					query: 'q=1',
					params: { q: '1' }
				}
			],
			[
				'https://example.com#top',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					hash: 'top'
				}
			],
			[
				'https://example.com/#top',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/',
					hash: 'top'
				}
			],
			[
				'https://example.com/p?a=1&b=2#f',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/p',
					query: 'a=1&b=2',
					params: { a: '1', b: '2' },
					hash: 'f'
				}
			],
			// A repeated key keeps its last value.
			[
				'https://example.com/p?a=1&a=2',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/p',
					query: 'a=1&a=2',
					params: { a: '2' }
				}
			],
			// A key with no `=` is an empty value, and an empty pair is skipped.
			[
				'https://example.com/p?flag&&a=1',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/p',
					query: 'flag&&a=1',
					params: { flag: '', a: '1' }
				}
			],
			// A pair with an empty key is dropped; the raw query keeps it.
			[
				'https://example.com/p?=novalue&a=1',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/p',
					query: '=novalue&a=1',
					params: { a: '1' }
				}
			],
			// An empty query or fragment is absent, not an empty string.
			[
				'https://example.com/p?',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/p'
				}
			],
			[
				'https://example.com/p#',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/p'
				}
			],
			// The fragment starts at the first `#`, so a `?` after it belongs to the fragment.
			[
				'https://example.com/#/route?x=1',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/',
					hash: '/route?x=1'
				}
			],
			['host/path', { host: 'host', hostname: 'host', path: '/path' }],
			[
				'ssh://user@host:22/var/log',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: 'host',
					hostname: 'host',
					port: 22,
					user: 'user',
					path: '/var/log'
				}
			],

			// --- Default port per protocol ---
			[
				'http://example.com',
				{ protocol: 'HTTP', defaultPort: 80, host: 'example.com', hostname: 'example.com' }
			],
			// The port in the address and the protocol's default are reported separately.
			[
				'https://example.com:8443',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					port: 8443
				}
			],
			[
				'redis://localhost',
				{ protocol: 'REDIS', defaultPort: 6379, host: 'localhost', hostname: 'localhost' }
			],
			[
				'postgres://user@db',
				{ protocol: 'POSTGRES', defaultPort: 5432, host: 'db', hostname: 'db', user: 'user' }
			],
			[
				'mongodb://db:27018',
				{ protocol: 'MONGODB', defaultPort: 27017, host: 'db', hostname: 'db', port: 27018 }
			],
			['ws://host', { protocol: 'WS', defaultPort: 80, host: 'host', hostname: 'host' }],
			['wss://host', { protocol: 'WSS', defaultPort: 443, host: 'host', hostname: 'host' }],
			['telnet://host', { protocol: 'TELNET', defaultPort: 23, host: 'host', hostname: 'host' }],
			['vnc://host', { protocol: 'VNC', defaultPort: 5900, host: 'host', hostname: 'host' }],
			['ftps://host', { protocol: 'FTPS', defaultPort: 990, host: 'host', hostname: 'host' }],
			// The scheme is matched without regard to case.
			['FTP://host', { protocol: 'FTP', defaultPort: 21, host: 'host', hostname: 'host' }],
			// A scheme nobody serves has no default.
			['whatever://host', { protocol: 'WHATEVER', host: 'host', hostname: 'host' }],

			// --- Percent-decoded user information ---
			[
				'ssh://us%40er:p%40ss@host',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: 'host',
					hostname: 'host',
					user: 'us@er',
					pass: 'p@ss'
				}
			],
			[
				'ssh://user:pa%2Fss@host',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: 'host',
					hostname: 'host',
					user: 'user',
					pass: 'pa/ss'
				}
			],
			[
				'https://%ED%85%8C%EC%8A%A4%ED%8A%B8@example.com',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					user: '테스트'
				}
			],
			// `%ZZ` is not an escape, so the value is left exactly as it was written.
			[
				'ssh://user:p%ZZss@host',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: 'host',
					hostname: 'host',
					user: 'user',
					pass: 'p%ZZss'
				}
			],
			// Well-formed escapes that are not valid UTF-8 are left alone too.
			[
				'ssh://user:%E0%A4@host',
				{
					protocol: 'SSH',
					defaultPort: 22,
					host: 'host',
					hostname: 'host',
					user: 'user',
					pass: '%E0%A4'
				}
			],
			// The query is reported raw and its values decoded.
			[
				'https://example.com/s?q=a%20b&t=%ED%85%8C',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/s',
					query: 'q=a%20b&t=%ED%85%8C',
					params: { q: 'a b', t: '테' }
				}
			],
			// `+` is not a space outside form encoding, so it is left as it is.
			[
				'https://example.com/s?q=a+b',
				{
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/s',
					query: 'q=a+b',
					params: { q: 'a+b' }
				}
			],

			// --- IPv4 and IPv6 detection ---
			['127.0.0.1', { host: '127.0.0.1', hostname: '127.0.0.1', isIP: true }],
			['0.0.0.0', { host: '0.0.0.0', hostname: '0.0.0.0', isIP: true }],
			['255.255.255.255', { host: '255.255.255.255', hostname: '255.255.255.255', isIP: true }],
			// An octet over 255, a leading zero or a missing octet is not an address.
			['256.1.1.1', { host: '256.1.1.1', hostname: '256.1.1.1' }],
			['01.2.3.4', { host: '01.2.3.4', hostname: '01.2.3.4' }],
			['1.2.3', { host: '1.2.3', hostname: '1.2.3' }],
			['example.com', { host: 'example.com', hostname: 'example.com' }],
			['[::]', { host: '[::]', hostname: '::', isIP: true, isIPv6: true }],
			['::', { host: '::', hostname: '::', isIP: true, isIPv6: true }],
			[
				'[1:2:3:4:5:6:7:8]',
				{ host: '[1:2:3:4:5:6:7:8]', hostname: '1:2:3:4:5:6:7:8', isIP: true, isIPv6: true }
			],
			[
				'1:2:3:4:5:6:7:8',
				{ host: '1:2:3:4:5:6:7:8', hostname: '1:2:3:4:5:6:7:8', isIP: true, isIPv6: true }
			],
			// An IPv4 tail fills the last two groups.
			[
				'[::ffff:192.168.1.1]:443',
				{
					host: '[::ffff:192.168.1.1]',
					hostname: '::ffff:192.168.1.1',
					port: 443,
					isIP: true,
					isIPv6: true
				}
			],
			[
				'[1:2:3:4:5:6:1.2.3.4]',
				{
					host: '[1:2:3:4:5:6:1.2.3.4]',
					hostname: '1:2:3:4:5:6:1.2.3.4',
					isIP: true,
					isIPv6: true
				}
			],
			// Nine groups, a group outside hex, a second `::` and a bad IPv4 tail are all rejected.
			['[1:2:3:4:5:6:7:8:9]', { host: '[1:2:3:4:5:6:7:8:9]', hostname: '1:2:3:4:5:6:7:8:9' }],
			['[1:2:3:4:5:6:7]', { host: '[1:2:3:4:5:6:7]', hostname: '1:2:3:4:5:6:7' }],
			['[gggg::1]', { host: '[gggg::1]', hostname: 'gggg::1' }],
			['[1::2::3]', { host: '[1::2::3]', hostname: '1::2::3' }],
			['[::ffff:256.1.1.1]', { host: '[::ffff:256.1.1.1]', hostname: '::ffff:256.1.1.1' }],
			['[:1:2]', { host: '[:1:2]', hostname: ':1:2' }],
			// Two colons make a host look like a bare IPv6 even when it is not one.
			['host:1234:5678', { host: 'host:1234:5678', hostname: 'host:1234:5678' }],

			// --- Ports at the edges ---
			['host:0', { host: 'host', hostname: 'host', port: 0 }],
			['host:65535', { host: 'host', hostname: 'host', port: 65535 }],
			// A trailing `:` with nothing after it leaves the port absent rather than in error.
			['host:', { host: 'host', hostname: 'host' }],

			// --- Invalid input ---
			['', { error: true }],
			['   ', { error: true }],
			['host:abc', { error: true, host: 'host', hostname: 'host' }],
			['host:70000', { error: true, host: 'host', hostname: 'host' }],
			['host:65536', { error: true, host: 'host', hostname: 'host' }],
			['host:-1', { error: true, host: 'host', hostname: 'host' }],
			['host: 22', { error: true, host: 'host', hostname: 'host' }],
			// An unclosed `[` leaves nothing that can be read as a host.
			['[fe80::1', { error: true }],
			// A bracketed host followed by anything other than `:port`.
			[
				'[fe80::1]x',
				{ error: true, host: '[fe80::1]', hostname: 'fe80::1', isIP: true, isIPv6: true }
			],
			[
				'[fe80::1]:70000',
				{ error: true, host: '[fe80::1]', hostname: 'fe80::1', isIP: true, isIPv6: true }
			],
			// The path is still read from an address whose port is in error.
			[
				'https://example.com:abc/path',
				{
					error: true,
					protocol: 'HTTPS',
					defaultPort: 443,
					host: 'example.com',
					hostname: 'example.com',
					path: '/path'
				}
			],
			// Surrounding whitespace is trimmed before anything is read.
			[
				'  ssh://host:22  ',
				{ protocol: 'SSH', defaultPort: 22, host: 'host', hostname: 'host', port: 22 }
			]
		];

		for (const [url, expected] of cases) {
			assert.deepStrictEqual(parseAddress(url), { ...base, ...expected }, url);
		}

		// `decode` is on by default and turns the escapes in the user information and in the
		// query values back into the characters they stand for.
		assert.deepStrictEqual(parseAddress('ssh://us%40er:p%40ss@host', { decode: false }), {
			...base,
			protocol: 'SSH',
			defaultPort: 22,
			host: 'host',
			hostname: 'host',
			user: 'us%40er',
			pass: 'p%40ss'
		});
		assert.deepStrictEqual(parseAddress('https://example.com/s?q=a%20b', { decode: false }), {
			...base,
			protocol: 'HTTPS',
			defaultPort: 443,
			host: 'example.com',
			hostname: 'example.com',
			path: '/s',
			query: 'q=a%20b',
			params: { q: 'a%20b' }
		});
		assert.deepStrictEqual(parseAddress('ssh://us%40er@host', { decode: true }), {
			...base,
			protocol: 'SSH',
			defaultPort: 22,
			host: 'host',
			hostname: 'host',
			user: 'us@er'
		});

		// Anything that is not a string cannot be parsed.
		for (const input of [null, undefined, 123, {}, []]) {
			assert.deepStrictEqual(parseAddress(input as unknown as string), { ...base, error: true });
		}
	});
});
