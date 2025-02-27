import assert from 'assert';
import { describe, it } from 'node:test';
import {
	isBotAgent,
	isMatchPathname,
	generateLicense,
	removeLocalePrefix,
	isMobile
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
});
