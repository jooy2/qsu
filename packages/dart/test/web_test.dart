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

    test('escapeHtml', () {
      expect(escapeHtml(''), '');
      expect(escapeHtml(null), '');
      expect(
          escapeHtml('fred, barney, & pebbles'), 'fred, barney, &amp; pebbles');
      expect(escapeHtml('<script>alert("x")</script>'),
          '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
      expect(escapeHtml("it's"), 'it&#39;s');
      // `&` is escaped first, so an escaped entity is not escaped twice.
      expect(escapeHtml('&lt;'), '&amp;lt;');
      // Everything else is left alone.
      expect(escapeHtml('a/b한글😀'), 'a/b한글😀');
    });

    test('unescapeHtml', () {
      expect(unescapeHtml(''), '');
      expect(unescapeHtml(null), '');
      expect(unescapeHtml('fred, barney, &amp; pebbles'),
          'fred, barney, & pebbles');
      expect(unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'),
          '<script>alert("x")</script>');
      expect(unescapeHtml('it&#39;s'), "it's");
      // One pass, so an escaped entity comes back as text instead of being unescaped twice.
      expect(unescapeHtml('&amp;lt;'), '&lt;');
      // Entities outside the escaped set are left alone.
      expect(unescapeHtml('&apos;&nbsp;&#x27;'), '&apos;&nbsp;&#x27;');
      // Round trip.
      const String raw = '<a href="x">it\'s & more</a>';

      expect(unescapeHtml(escapeHtml(raw)), raw);
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

    test('generateLicense', () {
      final String mit = generateLicense(
          author: 'Sam',
          yearStart: 2024,
          type: 'mit',
          email: 'sam@example.com');

      expect(mit, startsWith('Copyright (c) 2024 Sam <sam@example.com>'));
      expect(mit.contains('WITHOUT WARRANTY OF ANY KIND'), isTrue);
      // The type is matched without its punctuation, so `apache 2.0` finds it.
      expect(
          generateLicense(author: 'Sam', yearStart: 2024, type: 'apache 2.0'),
          startsWith('Copyright 2024 Sam'));
      expect(
          generateLicense(author: 'Sam', yearStart: 2024, type: 'bsd-3')
              .contains('Redistribution and use'),
          isTrue);
      // `htmlBr` swaps the newline for a tag.
      expect(
          generateLicense(
                  author: 'Sam', yearStart: 2024, type: 'mit', htmlBr: true)
              .contains('<br/>'),
          isTrue);
      expect(
          generateLicense(
              author: 'Sam', yearStart: 2024, yearEnd: '2026', type: 'mit'),
          startsWith('Copyright (c) 2024-2026 Sam'));
    });
  });
}
