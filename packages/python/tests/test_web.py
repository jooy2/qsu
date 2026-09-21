import pytest

from qsu.web import (
	escapeHtml,
	generateLicense,
	getSlug,
	isBotAgent,
	isMatchPathname,
	isMobile,
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
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 '
	'(KHTML, like Gecko) Version/16.0 Safari/605.1.15'
)


def test_isBotAgent():
	assert isBotAgent(userAgentBot) is True
	assert isBotAgent(userAgentDesktop) is False
	assert isBotAgent(userAgentMobileIOS) is False
	assert isBotAgent(userAgentMobileAndroid) is False
	assert isBotAgent(userAgentTablet) is False


def test_isMobile():
	assert isMobile(userAgentBot) is False
	assert isMobile(userAgentDesktop) is False
	assert isMobile(userAgentMobileIOS) is True
	assert isMobile(userAgentMobileAndroid) is True
	assert isMobile(userAgentTablet) is False


def test_isMatchPathname():
	assert isMatchPathname('/user/login', '/admin') is False
	assert isMatchPathname('/user/login', '/user') is False
	assert isMatchPathname('/user/login', '/user/*') is True
	assert isMatchPathname('/user/login', '/user/login/*') is False
	assert isMatchPathname('/user/login', '/user/login*') is True
	assert isMatchPathname('/user/login/hello', '/user/login*') is True
	assert isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']) is True
	assert isMatchPathname('/user/login', ['/test', '/home/hello', '/user/login']) is True
	assert isMatchPathname('/admin/hello/world', ['/admin/hello/']) is False
	assert isMatchPathname('/admin/hello/world', ['/admin/hello/world']) is True
	assert isMatchPathname('/admin/hello/world', ['/admin/*']) is True
	assert isMatchPathname('/admin/hello/world', ['*']) is True


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
	assert generateLicense(type='mit', author='example', yearStart=2021)
	assert generateLicense(type='apache20', author='example', yearStart=2021)


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
