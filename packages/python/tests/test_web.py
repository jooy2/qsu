import pytest

from qsu.web import (
	generateLicense,
	isBotAgent,
	isMatchPathname,
	isMobile,
	removeLocalePrefix,
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
