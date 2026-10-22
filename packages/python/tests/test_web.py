import datetime
import json
from pathlib import Path

import pytest

from qsu.web import (
	escapeHtml,
	generateLicense,
	getSlug,
	isAiAgentBot,
	isAiSearchBot,
	isAiTrainingBot,
	isBot,
	isDesktopDeviceFromUa,
	isMobileDeviceFromUa,
	isPathnameMatch,
	isSearchBot,
	isTabletDeviceFromUa,
	removeLocalePrefix,
	unescapeHtml,
)

homepage = 'https://qsu.cdget.com'

userAgentBot = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html'
userAgentDesktop = (
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
	'(KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)
userAgentMobileIOS = (
	'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) '
	'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
)
userAgentMobileAndroid = (
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 '
	'(KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
)
userAgentTablet = (
	'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 '
	'(KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'
)
# iPadOS 13 and later sends the Mac string by default, so it cannot be told from a Mac.
userAgentDesktopModeTablet = (
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 '
	'(KHTML, like Gecko) Version/16.0 Safari/605.1.15'
)

deviceUserAgents = {
	'mobile': [
		userAgentMobileIOS,
		userAgentMobileAndroid,
		'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
		'Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
		'Opera/9.80 (Android; Opera Mini/7.6.35766/35.5706; U; en) Presto/2.8.119 Version/11.10',
		'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15063',
		'Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
		'Mozilla/5.0 (Linux; Tizen 2.3; SAMSUNG SM-Z130H) AppleWebKit/537.3 (KHTML, like Gecko) Version/2.3 Mobile Safari/537.3',
		'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 KAKAOTALK 10.3.0',
		'Nokia6310i/1.0 (04.53) Profile/MIDP-1.0 Configuration/CLDC-1.0',
	],
	'tablet': [
		userAgentTablet,
		'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
		'Mozilla/5.0 (Linux; Android 12; SM-X700) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/20.0 Chrome/106.0.5249.126 Safari/537.36',
		'Mozilla/5.0 (Android 14; Tablet; rv:131.0) Gecko/131.0 Firefox/131.0',
		'Mozilla/5.0 (Linux; Android 9; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/104.3.1 like Chrome/104.0.5112.97 Safari/537.36',
		'Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+ Kindle/3.0+',
		'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML, like Gecko) Version/7.2.1.0 Safari/536.2+',
	],
	'desktop': [
		userAgentDesktop,
		userAgentDesktopModeTablet,
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
		'Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0',
		'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
		'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; Media Center PC 6.0; Tablet PC 2.0; rv:11.0) like Gecko',
	],
	'none': [
		'',
		userAgentBot,
		'curl/8.4.0',
		'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) 76.0.3809.146/6.0 TV Safari/537.36',
		'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager',
		'Mozilla/5.0 (Linux; Android 9; AFTKA Build/PS7633.3445N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.160 Safari/537.36',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19041',
		'Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
		'Mozilla/5.0 (X11; Linux x86_64; Quest 3) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/33.0.0.0 Chrome/126.0.6478.122 VR Safari/537.36',
		'Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 CrKey/1.56.500000',
	],
}


def _assertDeviceType(fn, expected):
	for deviceType, userAgents in deviceUserAgents.items():
		for userAgent in userAgents:
			assert fn(userAgent) is (deviceType == expected), f'{deviceType}: {userAgent}'


# Every name and User-Agent in the fixture belongs to exactly one group. `other` is a bot
# that none of the four categories claims, and `human` is not a bot at all.
bots = json.loads((Path(__file__).parent / '_resources' / 'bots.json').read_text(encoding='utf-8'))


def test_isBot():
	for group, values in bots.items():
		for value in values:
			assert isBot(value) is (group != 'human'), f'{group}: {value}'

	assert isBot('') is False
	assert isBot(None) is False
	assert isBot(userAgentBot) is True
	assert isBot(userAgentDesktop) is False
	assert isBot(userAgentMobileIOS) is False
	assert isBot(userAgentMobileAndroid) is False
	assert isBot(userAgentTablet) is False


def _assertBotCategory(fn, category):
	for group, values in bots.items():
		for value in values:
			assert fn(value) is (group == category), f'{group}: {value}'

	assert fn('') is False


def test_isSearchBot():
	_assertBotCategory(isSearchBot, 'search')


def test_isAiSearchBot():
	_assertBotCategory(isAiSearchBot, 'aiSearch')


def test_isAiAgentBot():
	_assertBotCategory(isAiAgentBot, 'aiAgent')


def test_isAiTrainingBot():
	_assertBotCategory(isAiTrainingBot, 'aiTraining')


def test_isMobileDeviceFromUa():
	_assertDeviceType(isMobileDeviceFromUa, 'mobile')


def test_isTabletDeviceFromUa():
	_assertDeviceType(isTabletDeviceFromUa, 'tablet')


def test_isDesktopDeviceFromUa():
	_assertDeviceType(isDesktopDeviceFromUa, 'desktop')


def test_isPathnameMatch():
	assert isPathnameMatch('/user/login', '/admin') is False
	assert isPathnameMatch('/user/login', '/user') is False
	assert isPathnameMatch('/user/login', '/user/*') is True
	assert isPathnameMatch('/user/login', '/user/login/*') is False
	assert isPathnameMatch('/user/login', '/user/login*') is True
	assert isPathnameMatch('/user/login/hello', '/user/login*') is True
	assert isPathnameMatch('/user/login', ['/test', '/home/hello', '/user/*']) is True
	assert isPathnameMatch('/user/login', ['/test', '/home/hello', '/user/login']) is True
	assert isPathnameMatch('/admin/hello/world', ['/admin/hello/']) is False
	assert isPathnameMatch('/admin/hello/world', ['/admin/hello/world']) is True
	assert isPathnameMatch('/admin/hello/world', ['/admin/*']) is True
	assert isPathnameMatch('/admin/hello/world', ['*']) is True


def test_removeLocalePrefix():
	assert removeLocalePrefix('/', ['ko', 'en']) == '/'
	assert removeLocalePrefix('', ['ko', 'en']) == ''
	assert removeLocalePrefix('ko', ['ko', 'en']) == ''
	assert removeLocalePrefix('/ko', ['ko', 'en']) == ''
	assert removeLocalePrefix('/user/login', ['ko', 'en']) == '/user/login'
	assert removeLocalePrefix('/ko/user/login', 'ko') == '/user/login'
	assert removeLocalePrefix('/koen/user/login', 'ko') == '/koen/user/login'
	assert removeLocalePrefix('/ko/user/login', ['ko', 'en']) == '/user/login'
	assert removeLocalePrefix('/zh-CN/user/login', ['zh-CN', 'zh-TW']) == '/user/login'
	assert (
		removeLocalePrefix('/zh-CNT/user/login', ['zh-CN', 'zh-TW']) == '/zh-CNT/user/login'
	)
	assert (
		removeLocalePrefix('/zhCNT/user/login', ['zh-CN', 'zh-TW']) == '/zhCNT/user/login'
	)
	assert (
		removeLocalePrefix('/zh-cn/user/login', ['zh-CN', 'zh-TW']) == '/zh-cn/user/login'
	)
	assert removeLocalePrefix('/user/ko/login', ['ko', 'en']) == '/user/ko/login'
	assert removeLocalePrefix('/en/user/login', ['ko', 'en']) == '/user/login'
	assert removeLocalePrefix('/cn/user/login', ['ko', 'en']) == '/cn/user/login'
	assert removeLocalePrefix('ko/user/login', ['ko', 'en']) == '/user/login'
	assert removeLocalePrefix(homepage, ['ko', 'en']) == homepage
	assert removeLocalePrefix(f'{homepage}/ko', ['ko', 'en']) == homepage
	assert (
		removeLocalePrefix(f'{homepage}/user/login', ['ko', 'en'])
		== f'{homepage}/user/login'
	)
	assert (
		removeLocalePrefix(f'{homepage}/koen/user/login', ['ko', 'en'])
		== f'{homepage}/koen/user/login'
	)
	assert (
		removeLocalePrefix(f'{homepage}/user/ko/login', ['ko', 'en'])
		== f'{homepage}/user/ko/login'
	)
	assert (
		removeLocalePrefix(f'{homepage}/ko/user/login', ['ko', 'en'])
		== f'{homepage}/user/login'
	)
	assert (
		removeLocalePrefix(f'{homepage}/ko/en/user/login', ['ko', 'en'])
		== f'{homepage}/en/user/login'
	)


def test_generateLicense():
	mit = generateLicense(type='mit', author='Sam', email='sam@example.com', yearStart=2024)

	assert mit.startswith('Copyright (c) 2024 Sam <sam@example.com>\n\nPermission is hereby granted')
	assert mit.endswith('OTHER DEALINGS IN THE SOFTWARE.')

	# Each type starts with its own copyright line, and the GNU ones name their license.
	expected = [
		('isc', 'Copyright (c) 2024 Sam', 'Permission to use, copy, modify, and/or distribute'),
		('apache20', 'Copyright 2024 Sam', 'Apache License, Version 2.0'),
		('bsd2', 'Copyright 2024 Sam', '2. Redistributions in binary form'),
		('bsd3', 'Copyright 2024 Sam', '3. Neither the name of the copyright holder'),
		('mpl20', 'Copyright (c) 2024 Sam', 'https://mozilla.org/MPL/2.0/'),
		('gpl3', 'Copyright (C) 2024 Sam', 'the GNU General Public License as published by'),
		('lgpl3', 'Copyright (C) 2024 Sam', 'the GNU Lesser General Public License as published by'),
		('agpl3', 'Copyright (C) 2024 Sam', 'the GNU Affero General Public License as published by'),
	]

	for licenseType, copyright, text in expected:
		license = generateLicense(type=licenseType, author='Sam', yearStart=2024)

		assert license.startswith(f'{copyright}\n\n'), licenseType
		assert text in license, licenseType

	assert '3. Neither' not in generateLicense(type='bsd2', author='Sam', yearStart=2024)

	# SPDX identifiers, loose spellings and an options dict find the same text.
	assert generateLicense(type='BSD-3-Clause', author='Sam', yearStart=2024) == generateLicense(
		type='bsd3', author='Sam', yearStart=2024
	)
	assert generateLicense(type='GPL-3.0-or-later', author='Sam', yearStart=2024) == generateLicense(
		type='gpl3', author='Sam', yearStart=2024
	)
	assert generateLicense(type='apache 2.0', author='Sam', yearStart=2024).startswith('Copyright 2024 Sam')
	assert generateLicense({'type': 'isc', 'author': 'Sam', 'yearStart': 2024}).startswith(
		'Copyright (c) 2024 Sam'
	)

	# An unknown type raises rather than falling back to MIT. `GPL-3.0` is the deprecated
	# SPDX name for `GPL-3.0-only`, which the "or later" notice would misstate.
	with pytest.raises(ValueError):
		generateLicense(type='gpl-2', author='Sam')

	with pytest.raises(ValueError):
		generateLicense(type='GPL-3.0', author='Sam')

	with pytest.raises(ValueError):
		generateLicense(author='Sam')

	# The year defaults to the current one, and a range ending in the same year collapses.
	assert generateLicense(type='mit', author='Sam').startswith(
		f'Copyright (c) {datetime.date.today().year} Sam'
	)
	assert generateLicense(type='mit', author='Sam', yearStart=2024, yearEnd=2026).startswith(
		'Copyright (c) 2024-2026 Sam'
	)
	assert generateLicense(type='mit', author='Sam', yearStart=2024, yearEnd='2024').startswith(
		'Copyright (c) 2024 Sam\n'
	)

	# `htmlBr` swaps the newlines for tags and escapes what HTML would read as markup.
	html = generateLicense(
		type='gpl3', author='Sam & Co', email='sam@example.com', yearStart=2024, htmlBr=True
	)

	assert html.startswith('Copyright (C) 2024 Sam &amp; Co &lt;sam@example.com&gt;<br/><br/>This program')
	assert html.endswith('see &lt;https://www.gnu.org/licenses/&gt;.')
	assert '\n' not in html


def test_escapeHtml():
	assert escapeHtml('') == ''
	assert escapeHtml('fred, barney, & pebbles') == 'fred, barney, &amp; pebbles'
	assert (
		escapeHtml('<script>alert("x")</script>')
		== '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
	)
	assert escapeHtml("it's") == 'it&#39;s'
	# `&` is escaped first, so an escaped entity is not escaped twice.
	assert escapeHtml('&lt;') == '&amp;lt;'
	# Everything else is left alone.
	assert escapeHtml('a/b한글😀') == 'a/b한글😀'


def test_unescapeHtml():
	assert unescapeHtml('') == ''
	assert unescapeHtml('fred, barney, &amp; pebbles') == 'fred, barney, & pebbles'
	assert (
		unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;')
		== '<script>alert("x")</script>'
	)
	assert unescapeHtml('it&#39;s') == "it's"
	# One pass, so an escaped entity comes back as text instead of being unescaped twice.
	assert unescapeHtml('&amp;lt;') == '&lt;'
	# Entities outside the escaped set are left alone.
	assert unescapeHtml('&apos;&nbsp;&#x27;') == '&apos;&nbsp;&#x27;'
	# Round trip.
	raw = '<a href="x">it\'s & more</a>'

	assert unescapeHtml(escapeHtml(raw)) == raw


def test_getSlug():
	# Basics: lowercased, spaces become the separator.
	assert getSlug('Hello World') == 'hello-world'
	# Leading/trailing whitespace is trimmed.
	assert getSlug('  Hello World  ') == 'hello-world'
	# Non-Latin letters (Korean) are kept as-is by default.
	assert getSlug('안녕 하세요 반갑습니다') == '안녕-하세요-반갑습니다'
	assert getSlug('Hello 안녕') == 'hello-안녕'
	# Numbers are included by default and dropped when disabled.
	assert getSlug('Product 123') == 'product-123'
	assert getSlug('Product 123', includeNumbers=False) == 'product'
	# Special characters are dropped by default.
	assert getSlug('My First Blog Post!') == 'my-first-blog-post'
	assert getSlug('100% Pure & Natural') == '100-pure-natural'
	assert getSlug('React.js + Next.js Guide') == 'reactjs-nextjs-guide'
	# Special characters are percent-encoded when enabled.
	assert getSlug('a & b', includeSpecial=True) == 'a-%26-b'
	assert getSlug('a&b', uppercase=True, includeSpecial=True) == 'A%26B'
	# Uppercase option.
	assert getSlug('Hello World', uppercase=True) == 'HELLO-WORLD'
	# Custom separators.
	assert getSlug('Hello World', separator='_') == 'hello_world'
	assert getSlug('Hello World', separator='::') == 'hello::world'
	assert getSlug('Hello World', separator='') == 'helloworld'
	# Existing `-`/`_` in the source also act as word boundaries; `@`/`.` do not,
	# so their surrounding characters merge into one word.
	assert getSlug('a - b _ c') == 'a-b-c'
	assert getSlug('user_name@example.com') == 'user-nameexamplecom'
	# includeNonLatin gates non-ASCII letters (Korean, accents).
	assert getSlug('Hello 안녕 World', includeNonLatin=False) == 'hello-world'
	assert getSlug('Café', includeNonLatin=False) == 'caf'
	assert getSlug('Café & Restaurant', includeSpecial=True) == 'café-%26-restaurant'
	# baseUrl builds a full URL; a trailing slash is normalized away.
	assert (
		getSlug('Hello World', baseUrl='https://example.com/blog')
		== 'https://example.com/blog/hello-world'
	)
	assert (
		getSlug('Hello World', baseUrl='https://example.com/')
		== 'https://example.com/hello-world'
	)
	# Empty results stay empty, even with a baseUrl.
	assert getSlug('') == ''
	assert getSlug('   ') == ''
	assert getSlug('!!!') == ''
	assert getSlug('', baseUrl='https://example.com') == ''
