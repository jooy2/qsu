import assert from 'assert';
import { describe, it } from 'node:test';
import {
	isBotAgent,
	isMatchPathname,
	generateLicense,
	removeLocalePrefix,
	isMobileDeviceFromUA,
	isTabletDeviceFromUA,
	isDesktopDeviceFromUA,
	getSlug,
	escapeHtml,
	unescapeHtml
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
	'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1';
// iPadOS 13 and later sends the Mac string by default, so it cannot be told from a Mac.
const userAgentDesktopModeTablet =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15';

const deviceUserAgents: { [key: string]: string[] } = {
	mobile: [
		userAgentMobileIOS,
		userAgentMobileAndroid,
		'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
		'Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
		'Opera/9.80 (Android; Opera Mini/7.6.35766/35.5706; U; en) Presto/2.8.119 Version/11.10',
		'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15063',
		'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
		'Mozilla/5.0 (Linux; Tizen 2.3; SAMSUNG SM-Z130H) AppleWebKit/537.3 (KHTML, like Gecko) Version/2.3 Mobile Safari/537.3',
		'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 KAKAOTALK 10.3.0',
		'Nokia6310i/1.0 (04.53) Profile/MIDP-1.0 Configuration/CLDC-1.0'
	],
	tablet: [
		userAgentTablet,
		'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
		'Mozilla/5.0 (Linux; Android 12; SM-X700) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/20.0 Chrome/106.0.5249.126 Safari/537.36',
		'Mozilla/5.0 (Android 14; Tablet; rv:131.0) Gecko/131.0 Firefox/131.0',
		'Mozilla/5.0 (Linux; Android 9; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/104.3.1 like Chrome/104.0.5112.97 Safari/537.36',
		'Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+ Kindle/3.0+',
		'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML, like Gecko) Version/7.2.1.0 Safari/536.2+'
	],
	desktop: [
		userAgentDesktop,
		userAgentDesktopModeTablet,
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
		'Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0',
		'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
		'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; Media Center PC 6.0; Tablet PC 2.0; rv:11.0) like Gecko'
	],
	none: [
		'',
		userAgentBot,
		'curl/8.4.0',
		'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) 76.0.3809.146/6.0 TV Safari/537.36',
		'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager',
		'Mozilla/5.0 (Linux; Android 9; AFTKA Build/PS7633.3445N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.160 Safari/537.36',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19041',
		'Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
		'Mozilla/5.0 (X11; Linux x86_64; Quest 3) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0.0.0 Chrome/126.0.6478.122 VR Safari/537.36',
		'Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 CrKey/1.56.500000'
	]
};

const assertDeviceType = (fn: (userAgent: string) => boolean, expected: string): void => {
	for (const [type, userAgents] of Object.entries(deviceUserAgents)) {
		for (const userAgent of userAgents) {
			assert.strictEqual(fn(userAgent), type === expected, `${type}: ${userAgent}`);
		}
	}
};

describe('Web', () => {
	it('isBotAgent', () => {
		assert.strictEqual(isBotAgent(userAgentBot), true);
		assert.strictEqual(isBotAgent(userAgentDesktop), false);
		assert.strictEqual(isBotAgent(userAgentMobileIOS), false);
		assert.strictEqual(isBotAgent(userAgentMobileAndroid), false);
		assert.strictEqual(isBotAgent(userAgentTablet), false);
	});

	it('isMobileDeviceFromUA', () => {
		assertDeviceType(isMobileDeviceFromUA, 'mobile');
	});

	it('isTabletDeviceFromUA', () => {
		assertDeviceType(isTabletDeviceFromUA, 'tablet');
	});

	it('isDesktopDeviceFromUA', () => {
		assertDeviceType(isDesktopDeviceFromUA, 'desktop');
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

	it('escapeHtml', () => {
		assert.strictEqual(escapeHtml(''), '');
		assert.strictEqual(escapeHtml('fred, barney, & pebbles'), 'fred, barney, &amp; pebbles');
		assert.strictEqual(
			escapeHtml('<script>alert("x")</script>'),
			'&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
		);
		assert.strictEqual(escapeHtml("it's"), 'it&#39;s');
		// `&` is escaped first, so an escaped entity is not escaped twice.
		assert.strictEqual(escapeHtml('&lt;'), '&amp;lt;');
		// Everything else is left alone.
		assert.strictEqual(escapeHtml('a/b한글😀'), 'a/b한글😀');
	});

	it('unescapeHtml', () => {
		assert.strictEqual(unescapeHtml(''), '');
		assert.strictEqual(unescapeHtml('fred, barney, &amp; pebbles'), 'fred, barney, & pebbles');
		assert.strictEqual(
			unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'),
			'<script>alert("x")</script>'
		);
		assert.strictEqual(unescapeHtml('it&#39;s'), "it's");
		// One pass, so an escaped entity comes back as text instead of being unescaped twice.
		assert.strictEqual(unescapeHtml('&amp;lt;'), '&lt;');
		// Entities outside the escaped set are left alone.
		assert.strictEqual(unescapeHtml('&apos;&nbsp;&#x27;'), '&apos;&nbsp;&#x27;');
		// Round trip.
		const raw = `<a href="x">it's & more</a>`;

		assert.strictEqual(unescapeHtml(escapeHtml(raw)), raw);
	});

	it('getSlug', () => {
		// Each case: [text, options, expected].
		const cases: [string, Parameters<typeof getSlug>[1], string][] = [
			// Basics: lowercased, spaces become the separator.
			['Hello World', undefined, 'hello-world'],
			// Leading/trailing whitespace is trimmed.
			['  Hello World  ', undefined, 'hello-world'],
			// Non-Latin letters (Korean) are kept as-is by default.
			['안녕 하세요 반갑습니다', undefined, '안녕-하세요-반갑습니다'],
			['Hello 안녕', undefined, 'hello-안녕'],
			// Numbers are included by default and dropped when disabled.
			['Product 123', undefined, 'product-123'],
			['Product 123', { includeNumbers: false }, 'product'],
			// Special characters are dropped by default.
			['My First Blog Post!', undefined, 'my-first-blog-post'],
			['100% Pure & Natural', undefined, '100-pure-natural'],
			['React.js + Next.js Guide', undefined, 'reactjs-nextjs-guide'],
			// Special characters are percent-encoded when enabled.
			['a & b', { includeSpecial: true }, 'a-%26-b'],
			['a&b', { uppercase: true, includeSpecial: true }, 'A%26B'],
			// Uppercase option.
			['Hello World', { uppercase: true }, 'HELLO-WORLD'],
			// Custom separators.
			['Hello World', { separator: '_' }, 'hello_world'],
			['Hello World', { separator: '::' }, 'hello::world'],
			['Hello World', { separator: '' }, 'helloworld'],
			// Existing `-`/`_` in the source also act as word boundaries.
			['a - b _ c', undefined, 'a-b-c'],
			// Only whitespace and `-`/`_` are boundaries; `@`/`.` just get dropped,
			// so the surrounding characters merge into one word.
			['user_name@example.com', undefined, 'user-nameexamplecom'],
			// includeNonLatin gates non-ASCII letters (Korean, accents).
			['Hello 안녕 World', { includeNonLatin: false }, 'hello-world'],
			['Café', { includeNonLatin: false }, 'caf'],
			['Café & Restaurant', { includeSpecial: true }, 'café-%26-restaurant'],
			// baseUrl builds a full URL; a trailing slash is normalized away.
			[
				'Hello World',
				{ baseUrl: 'https://example.com/blog' },
				'https://example.com/blog/hello-world'
			],
			['Hello World', { baseUrl: 'https://example.com/' }, 'https://example.com/hello-world'],
			// Empty results stay empty, even with a baseUrl.
			['', undefined, ''],
			['   ', undefined, ''],
			['!!!', undefined, ''],
			['Hello', { baseUrl: '' }, 'hello'],
			['', { baseUrl: 'https://example.com' }, '']
		];

		for (const [text, options, expected] of cases) {
			assert.strictEqual(getSlug(text, options), expected, `${text} :: ${JSON.stringify(options)}`);
		}
	});
});
