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

    test('isMobile', () {
      expect(isMobile(userAgentBot), false);
      expect(isMobile(userAgentDesktop), false);
      expect(isMobile(userAgentMobileIOS), true);
      expect(isMobile(userAgentMobileAndroid), true);
      expect(isMobile(userAgentTablet), false);
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

    test('getParsedInfoFromAddress', () {
      // Each case: {'url': ...} plus only the fields that differ from the
      // defaults (error: false, everything else null).
      final List<Map<String, dynamic>> cases = [
        // Full form: scheme, user, password and port.
        {
          'url': 'ssh://test:pass@host:1234',
          'protocol': 'SSH',
          'host': 'host',
          'port': 1234,
          'user': 'test',
          'pass': 'pass'
        },
        // Web URL. Missing values stay null, not an error.
        {
          'url': 'https://google.com',
          'protocol': 'HTTPS',
          'host': 'google.com'
        },
        // No scheme -> protocol is null (no SSH default).
        {
          'url': 'user:test@host',
          'host': 'host',
          'user': 'user',
          'pass': 'test'
        },
        {'url': 'host:1234', 'host': 'host', 'port': 1234},
        {'url': '192.168.1.123:1234', 'host': '192.168.1.123', 'port': 1234},
        {'url': 'hostname', 'host': 'hostname'},
        {
          'url': 'ssh://test@hostname',
          'protocol': 'SSH',
          'host': 'hostname',
          'user': 'test'
        },
        // IPv6 without brackets keeps the raw address and cannot carry a port.
        {'url': 'ssh://::1', 'protocol': 'SSH', 'host': '::1'},
        {'url': '::1', 'host': '::1'},
        {
          'url': 'ssh://fe80::f9e9:1d57:9f2d:fb87',
          'protocol': 'SSH',
          'host': 'fe80::f9e9:1d57:9f2d:fb87'
        },
        // IPv6 with brackets keeps the brackets and may carry a port.
        {
          'url': 'ssh://[fe80::f9e9:1d57:9f2d:fb87]',
          'protocol': 'SSH',
          'host': '[fe80::f9e9:1d57:9f2d:fb87]'
        },
        {
          'url': '[fe80::f9e9:1d57:9f2d:fb87]:1234',
          'host': '[fe80::f9e9:1d57:9f2d:fb87]',
          'port': 1234
        },
        {
          'url': 'test:pass@[fe80::f9e9:1d57:9f2d:fb87]:1234',
          'host': '[fe80::f9e9:1d57:9f2d:fb87]',
          'port': 1234,
          'user': 'test',
          'pass': 'pass'
        },
        {'url': '[::1]', 'host': '[::1]'},
        {'url': '192.168.1.1', 'host': '192.168.1.1'},
        // Unknown scheme is parsed as-is (generic parser, no error).
        {'url': 'asd://192.168.1.1', 'protocol': 'ASD', 'host': '192.168.1.1'},
        // Scheme only: empty host is null, not an error.
        {'url': 'ssh://', 'protocol': 'SSH'},
        {
          'url': 'sftp://test@localhost',
          'protocol': 'SFTP',
          'host': 'localhost',
          'user': 'test'
        },
        {'url': 'test@localhost', 'host': 'localhost', 'user': 'test'},
        {
          'url': 'test@192.168.1.1:1234',
          'host': '192.168.1.1',
          'port': 1234,
          'user': 'test'
        },
        {
          'url': 'test@fe80::f9e9:1d57:9f2d:fb87',
          'host': 'fe80::f9e9:1d57:9f2d:fb87',
          'user': 'test'
        },
        // The host is split by the last `@`; the password may keep `@` and `:`.
        {
          'url': 'test:hell@test@192.168.1.1',
          'host': '192.168.1.1',
          'user': 'test',
          'pass': 'hell@test'
        },
        {
          'url': 'ssh://test:he::@test@192.168.1.1:1234',
          'protocol': 'SSH',
          'host': '192.168.1.1',
          'port': 1234,
          'user': 'test',
          'pass': 'he::@test'
        },
        {
          'url': 'test@test:pass@host',
          'host': 'host',
          'user': 'test@test',
          'pass': 'pass'
        },
        {
          'url': 'test:test@test@host:1234',
          'host': 'host',
          'port': 1234,
          'user': 'test',
          'pass': 'test@test'
        },
        {'url': 'kara', 'host': 'kara'},
        // Empty user and password become null.
        {'url': ':@test', 'host': 'test'},
        // Path/query/fragment are dropped, only the authority is analyzed.
        {
          'url': 'https://user:pw@example.com:8080/path?q=1#frag',
          'protocol': 'HTTPS',
          'host': 'example.com',
          'port': 8080,
          'user': 'user',
          'pass': 'pw'
        },
        {'url': 'file:///etc/hosts', 'protocol': 'FILE'},
        // Invalid inputs -> error: true.
        {'url': '', 'error': true},
        {'url': '   ', 'error': true},
        {'url': 'host:abc', 'error': true, 'host': 'host'},
        {'url': 'host:70000', 'error': true, 'host': 'host'},
        {'url': '[fe80::1', 'error': true},
      ];

      for (final c in cases) {
        final String url = c['url'] as String;
        final ParsedAddress result = getParsedInfoFromAddress(url);

        expect(result.error, c['error'] ?? false, reason: 'error for "$url"');
        expect(result.protocol, c['protocol'], reason: 'protocol for "$url"');
        expect(result.host, c['host'], reason: 'host for "$url"');
        expect(result.port, c['port'], reason: 'port for "$url"');
        expect(result.user, c['user'], reason: 'user for "$url"');
        expect(result.pass, c['pass'], reason: 'pass for "$url"');
      }
    });

    test('getSlug', () {
      // Basics: lowercased, spaces become the separator.
      expect(getSlug('Hello World'), 'hello-world');
      // Leading/trailing whitespace is trimmed.
      expect(getSlug('  Hello World  '), 'hello-world');
      // Non-Latin letters (Korean) are kept as-is by default.
      expect(getSlug('안녕 하세요 반갑습니다'), '안녕-하세요-반갑습니다');
      expect(getSlug('Hello 안녕'), 'hello-안녕');
      // Numbers are included by default and dropped when disabled.
      expect(getSlug('Product 123'), 'product-123');
      expect(getSlug('Product 123', includeNumbers: false), 'product');
      // Special characters are dropped by default.
      expect(getSlug('My First Blog Post!'), 'my-first-blog-post');
      expect(getSlug('100% Pure & Natural'), '100-pure-natural');
      expect(getSlug('React.js + Next.js Guide'), 'reactjs-nextjs-guide');
      // Special characters are percent-encoded when enabled.
      expect(getSlug('a & b', includeSpecial: true), 'a-%26-b');
      expect(getSlug('a&b', uppercase: true, includeSpecial: true), 'A%26B');
      // Uppercase option.
      expect(getSlug('Hello World', uppercase: true), 'HELLO-WORLD');
      // Custom separators.
      expect(getSlug('Hello World', separator: '_'), 'hello_world');
      expect(getSlug('Hello World', separator: '::'), 'hello::world');
      expect(getSlug('Hello World', separator: ''), 'helloworld');
      // Existing `-`/`_` in the source also act as word boundaries; `@`/`.` do
      // not, so their surrounding characters merge into one word.
      expect(getSlug('a - b _ c'), 'a-b-c');
      expect(getSlug('user_name@example.com'), 'user-nameexamplecom');
      // includeNonLatin gates non-ASCII letters (Korean, accents).
      expect(getSlug('Hello 안녕 World', includeNonLatin: false), 'hello-world');
      expect(getSlug('Café', includeNonLatin: false), 'caf');
      expect(getSlug('Café & Restaurant', includeSpecial: true),
          'café-%26-restaurant');
      // baseUrl builds a full URL; a trailing slash is normalized away.
      expect(getSlug('Hello World', baseUrl: 'https://example.com/blog'),
          'https://example.com/blog/hello-world');
      expect(getSlug('Hello World', baseUrl: 'https://example.com/'),
          'https://example.com/hello-world');
      // Empty results stay empty, even with a baseUrl.
      expect(getSlug(''), '');
      expect(getSlug('   '), '');
      expect(getSlug('!!!'), '');
      expect(getSlug('', baseUrl: 'https://example.com'), '');
    });
  });
}
