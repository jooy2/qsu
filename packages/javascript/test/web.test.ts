import assert from 'assert';
import { describe, it } from 'node:test';
import {
	isBotAgent,
	isMatchPathname,
	generateLicense,
	removeLocalePrefix,
	isMobile,
	getParsedInfoFromAddress
} from '../dist';
import { homepage } from '../package.json';

const userAgentBot = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html';
const userAgentDesktop =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';
const userAgentMobileIOS =
	'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';
const userAgentMobileAndroid =
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36';
const userAgentTablet =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15';

describe('Web', () => {
	it('isBotAgent', () => {
		assert.strictEqual(isBotAgent(userAgentBot), true);
		assert.strictEqual(isBotAgent(userAgentDesktop), false);
		assert.strictEqual(isBotAgent(userAgentMobileIOS), false);
		assert.strictEqual(isBotAgent(userAgentMobileAndroid), false);
		assert.strictEqual(isBotAgent(userAgentTablet), false);
	});

	it('isMobile', () => {
		assert.strictEqual(isMobile(userAgentBot), false);
		assert.strictEqual(isMobile(userAgentDesktop), false);
		assert.strictEqual(isMobile(userAgentMobileIOS), true);
		assert.strictEqual(isMobile(userAgentMobileAndroid), true);
		assert.strictEqual(isMobile(userAgentTablet), false);
	});

	it('isMatchPathname', () => {
		assert.strictEqual(isMatchPathname('/user/login', '/admin'), false);
		assert.strictEqual(isMatchPathname('/user/login', '/user'), false);
		assert.strictEqual(isMatchPathname('/user/login', '/user/*'), true);
		assert.strictEqual(isMatchPathname('/user/login', '/user/login/*'), false);
		assert.strictEqual(isMatchPathname('/user/login', '/user/login*'), true);
		assert.strictEqual(isMatchPathname('/user/login/hello', '/user/login*'), true);
		assert.strictEqual(isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']), true);
		assert.strictEqual(
			isMatchPathname('/user/login', ['/test', '/home/hello', '/user/login']),
			true
		);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['/admin/hello/']), false);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['/admin/hello/world']), true);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['/admin/*']), true);
		assert.strictEqual(isMatchPathname('/admin/hello/world', ['*']), true);
	});

	it('removeLocalePrefix', () => {
		assert.strictEqual(removeLocalePrefix('/', ['ko', 'en']), '/');
		assert.strictEqual(removeLocalePrefix('', ['ko', 'en']), '');
		assert.strictEqual(removeLocalePrefix('ko', ['ko', 'en']), '');
		assert.strictEqual(removeLocalePrefix('/ko', ['ko', 'en']), '');
		assert.strictEqual(removeLocalePrefix('/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(removeLocalePrefix('/ko/user/login', 'ko'), '/user/login');
		assert.strictEqual(removeLocalePrefix('/koen/user/login', 'ko'), '/koen/user/login');
		assert.strictEqual(removeLocalePrefix('/ko/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(removeLocalePrefix('/zh-CN/user/login', ['zh-CN', 'zh-TW']), '/user/login');
		assert.strictEqual(
			removeLocalePrefix('/zh-CNT/user/login', ['zh-CN', 'zh-TW']),
			'/zh-CNT/user/login'
		);
		assert.strictEqual(
			removeLocalePrefix('/zhCNT/user/login', ['zh-CN', 'zh-TW']),
			'/zhCNT/user/login'
		);
		assert.strictEqual(
			removeLocalePrefix('/zh-cn/user/login', ['zh-CN', 'zh-TW']),
			'/zh-cn/user/login'
		);
		assert.strictEqual(removeLocalePrefix('/user/ko/login', ['ko', 'en']), '/user/ko/login');
		assert.strictEqual(removeLocalePrefix('/en/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(removeLocalePrefix('/cn/user/login', ['ko', 'en']), '/cn/user/login');
		assert.strictEqual(removeLocalePrefix('ko/user/login', ['ko', 'en']), '/user/login');
		assert.strictEqual(removeLocalePrefix(homepage, ['ko', 'en']), homepage);
		assert.strictEqual(removeLocalePrefix(`${homepage}/ko`, ['ko', 'en']), homepage);
		assert.strictEqual(
			removeLocalePrefix(`${homepage}/user/login`, ['ko', 'en']),
			`${homepage}/user/login`
		);
		assert.strictEqual(
			removeLocalePrefix(`${homepage}/koen/user/login`, ['ko', 'en']),
			`${homepage}/koen/user/login`
		);
		assert.strictEqual(
			removeLocalePrefix(`${homepage}/user/ko/login`, ['ko', 'en']),
			`${homepage}/user/ko/login`
		);
		assert.strictEqual(
			removeLocalePrefix(`${homepage}/ko/user/login`, ['ko', 'en']),
			`${homepage}/user/login`
		);
		assert.strictEqual(
			removeLocalePrefix(`${homepage}/ko/en/user/login`, ['ko', 'en']),
			`${homepage}/en/user/login`
		);
	});

	it('generateLicense', () => {
		assert(generateLicense({ type: 'mit', author: 'example', yearStart: 2021 }));
		assert(generateLicense({ type: 'apache20', author: 'example', yearStart: 2021 }));
	});

	it('getParsedInfoFromAddress', () => {
		type Expected = {
			error: boolean;
			protocol?: string;
			host?: string;
			port?: number;
			user?: string;
			pass?: string;
		};
		const base: Expected = {
			error: false,
			protocol: undefined,
			host: undefined,
			port: undefined,
			user: undefined,
			pass: undefined
		};

		// [input, only the fields that differ from `base`]
		const cases: Array<[string, Partial<Expected>]> = [
			// Full form: scheme, user, password and port.
			[
				'ssh://test:pass@host:1234',
				{ protocol: 'SSH', host: 'host', port: 1234, user: 'test', pass: 'pass' }
			],
			// Web URL. Missing values stay `undefined`, not an error.
			['https://google.com', { protocol: 'HTTPS', host: 'google.com' }],
			// No scheme -> protocol is `undefined` (no SSH default).
			['user:test@host', { host: 'host', user: 'user', pass: 'test' }],
			['host:1234', { host: 'host', port: 1234 }],
			['192.168.1.123:1234', { host: '192.168.1.123', port: 1234 }],
			['hostname', { host: 'hostname' }],
			['ssh://test@hostname', { protocol: 'SSH', host: 'hostname', user: 'test' }],
			// IPv6 without brackets keeps the raw address and cannot carry a port.
			['ssh://::1', { protocol: 'SSH', host: '::1' }],
			['::1', { host: '::1' }],
			['ssh://fe80::f9e9:1d57:9f2d:fb87', { protocol: 'SSH', host: 'fe80::f9e9:1d57:9f2d:fb87' }],
			// IPv6 with brackets keeps the brackets and may carry a port.
			[
				'ssh://[fe80::f9e9:1d57:9f2d:fb87]',
				{ protocol: 'SSH', host: '[fe80::f9e9:1d57:9f2d:fb87]' }
			],
			['[fe80::f9e9:1d57:9f2d:fb87]:1234', { host: '[fe80::f9e9:1d57:9f2d:fb87]', port: 1234 }],
			[
				'test:pass@[fe80::f9e9:1d57:9f2d:fb87]:1234',
				{ host: '[fe80::f9e9:1d57:9f2d:fb87]', port: 1234, user: 'test', pass: 'pass' }
			],
			['[::1]', { host: '[::1]' }],
			['192.168.1.1', { host: '192.168.1.1' }],
			// Unknown scheme is parsed as-is (generic parser, no error).
			['asd://192.168.1.1', { protocol: 'ASD', host: '192.168.1.1' }],
			// Scheme only: empty host is `undefined`, not an error.
			['ssh://', { protocol: 'SSH' }],
			['sftp://test@localhost', { protocol: 'SFTP', host: 'localhost', user: 'test' }],
			['test@localhost', { host: 'localhost', user: 'test' }],
			['test@192.168.1.1:1234', { host: '192.168.1.1', port: 1234, user: 'test' }],
			['test@fe80::f9e9:1d57:9f2d:fb87', { host: 'fe80::f9e9:1d57:9f2d:fb87', user: 'test' }],
			// The host is split by the last `@`; the password may keep `@` and `:`.
			['test:hell@test@192.168.1.1', { host: '192.168.1.1', user: 'test', pass: 'hell@test' }],
			[
				'ssh://test:he::@test@192.168.1.1:1234',
				{ protocol: 'SSH', host: '192.168.1.1', port: 1234, user: 'test', pass: 'he::@test' }
			],
			['test@test:pass@host', { host: 'host', user: 'test@test', pass: 'pass' }],
			['test:test@test@host:1234', { host: 'host', port: 1234, user: 'test', pass: 'test@test' }],
			['kara', { host: 'kara' }],
			// Empty user and password become `undefined`.
			[':@test', { host: 'test' }],
			// Path/query/fragment are dropped, only the authority is analyzed.
			[
				'https://user:pw@example.com:8080/path?q=1#frag',
				{ protocol: 'HTTPS', host: 'example.com', port: 8080, user: 'user', pass: 'pw' }
			],
			['file:///etc/hosts', { protocol: 'FILE' }],
			// Invalid inputs -> `error: true`.
			['', { error: true }],
			['   ', { error: true }],
			['host:abc', { error: true, host: 'host' }],
			['host:70000', { error: true, host: 'host' }],
			['[fe80::1', { error: true }]
		];

		for (const [url, expected] of cases) {
			assert.deepStrictEqual(getParsedInfoFromAddress(url), { ...base, ...expected }, url);
		}
	});
});
