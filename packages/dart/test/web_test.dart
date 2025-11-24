import 'package:qsu/qsu.dart';
import 'package:test/test.dart' hide contains, isEmpty;

void main() {
  final String homepage = 'https://qsu.cdget.com';
  final String userAgentBot =
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html';
  final String userAgentDesktop =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';
  final String userAgentMobileIOS =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';
  final String userAgentMobileAndroid =
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36';
  final String userAgentTablet =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15';

  group('Web', () {
    test('isBotAgent', () {
      expect(isBotAgent(userAgentBot), true);
      expect(isBotAgent(userAgentDesktop), false);
      expect(isBotAgent(userAgentMobileIOS), false);
      expect(isBotAgent(userAgentMobileAndroid), false);
      expect(isBotAgent(userAgentTablet), false);
    });

    test('isMatchPathname', () {
      expect(isMatchPathname('/user/login', '/admin'), false);
      expect(isMatchPathname('/user/login', '/user'), false);
      expect(isMatchPathname('/user/login', '/user/*'), true);
      expect(isMatchPathname('/user/login', '/user/login/*'), false);
      expect(isMatchPathname('/user/login', '/user/login*'), true);
      expect(isMatchPathname('/user/login/hello', '/user/login*'), true);
      expect(
          isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']),
          true);
      expect(
          isMatchPathname(
              '/user/login', ['/test', '/home/hello', '/user/login']),
          true);
      expect(isMatchPathname('/admin/hello/world', ['/admin/hello/']), false);
      expect(
          isMatchPathname('/admin/hello/world', ['/admin/hello/world']), true);
      expect(isMatchPathname('/admin/hello/world', ['/admin/*']), true);
      expect(isMatchPathname('/admin/hello/world', ['*']), true);
    });

    test('removeLocalePrefix', () {
      expect(removeLocalePrefix('/', ['ko', 'en']), '/');
      expect(removeLocalePrefix('', ['ko', 'en']), '');
      expect(removeLocalePrefix('ko', ['ko', 'en']), '');
      expect(removeLocalePrefix('/ko', ['ko', 'en']), '');
      expect(removeLocalePrefix('/user/login', ['ko', 'en']), '/user/login');
      expect(removeLocalePrefix('/ko/user/login', 'ko'), '/user/login');
      expect(removeLocalePrefix('/koen/user/login', 'ko'), '/koen/user/login');
      expect(removeLocalePrefix('/ko/user/login', ['ko', 'en']), '/user/login');
      expect(removeLocalePrefix('/zh-CN/user/login', ['zh-CN', 'zh-TW']),
          '/user/login');
      expect(removeLocalePrefix('/zh-CNT/user/login', ['zh-CN', 'zh-TW']),
          '/zh-CNT/user/login');
      expect(removeLocalePrefix('/zhCNT/user/login', ['zh-CN', 'zh-TW']),
          '/zhCNT/user/login');
      expect(removeLocalePrefix('/zh-cn/user/login', ['zh-CN', 'zh-TW']),
          '/zh-cn/user/login');
      expect(
          removeLocalePrefix('/user/ko/login', ['ko', 'en']), '/user/ko/login');
      expect(removeLocalePrefix('/en/user/login', ['ko', 'en']), '/user/login');
      expect(
          removeLocalePrefix('/cn/user/login', ['ko', 'en']), '/cn/user/login');
      expect(removeLocalePrefix('ko/user/login', ['ko', 'en']), '/user/login');
      expect(removeLocalePrefix(homepage, ['ko', 'en']), homepage);
      expect(removeLocalePrefix('$homepage/ko', ['ko', 'en']), homepage);
      expect(removeLocalePrefix('$homepage/user/login', ['ko', 'en']),
          '$homepage/user/login');
      expect(removeLocalePrefix('$homepage/koen/user/login', ['ko', 'en']),
          '$homepage/koen/user/login');
      expect(removeLocalePrefix('$homepage/user/ko/login', ['ko', 'en']),
          '$homepage/user/ko/login');
      expect(removeLocalePrefix('$homepage/ko/user/login', ['ko', 'en']),
          '$homepage/user/login');
      expect(removeLocalePrefix('$homepage/ko/en/user/login', ['ko', 'en']),
          '$homepage/en/user/login');
    });
  });
}
