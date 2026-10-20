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
      'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1';
  // iPadOS 13 and later sends the Mac string by default, so it cannot be told from a Mac.
  final String userAgentDesktopModeTablet =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15';
  final Map<String, List<String>> deviceUserAgents = {
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
  };

  void expectDeviceType(bool Function(String) fn, String expected) {
    deviceUserAgents.forEach((String type, List<String> userAgents) {
      for (final String userAgent in userAgents) {
        expect(fn(userAgent), type == expected, reason: '$type: $userAgent');
      }
    });
  }

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

    test('isMobileDeviceFromUA', () {
      expectDeviceType(isMobileDeviceFromUA, 'mobile');
    });

    test('isTabletDeviceFromUA', () {
      expectDeviceType(isTabletDeviceFromUA, 'tablet');
    });

    test('isDesktopDeviceFromUA', () {
      expectDeviceType(isDesktopDeviceFromUA, 'desktop');
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

      expect(
          mit,
          startsWith(
              'Copyright (c) 2024 Sam <sam@example.com>\n\nPermission is hereby granted'));
      expect(mit, endsWith('OTHER DEALINGS IN THE SOFTWARE.'));

      // Each type starts with its own copyright line, and the GNU ones name their license.
      final List<List<String>> expected = [
        [
          'isc',
          'Copyright (c) 2024 Sam',
          'Permission to use, copy, modify, and/or distribute'
        ],
        ['apache20', 'Copyright 2024 Sam', 'Apache License, Version 2.0'],
        ['bsd2', 'Copyright 2024 Sam', '2. Redistributions in binary form'],
        [
          'bsd3',
          'Copyright 2024 Sam',
          '3. Neither the name of the copyright holder'
        ],
        ['mpl20', 'Copyright (c) 2024 Sam', 'https://mozilla.org/MPL/2.0/'],
        [
          'gpl3',
          'Copyright (C) 2024 Sam',
          'the GNU General Public License as published by'
        ],
        [
          'lgpl3',
          'Copyright (C) 2024 Sam',
          'the GNU Lesser General Public License as published by'
        ],
        [
          'agpl3',
          'Copyright (C) 2024 Sam',
          'the GNU Affero General Public License as published by'
        ],
      ];

      for (final List<String> row in expected) {
        final String license =
            generateLicense(author: 'Sam', yearStart: 2024, type: row[0]);

        expect(license, startsWith('${row[1]}\n\n'), reason: row[0]);
        expect(license.contains(row[2]), isTrue, reason: row[0]);
      }

      expect(
          generateLicense(author: 'Sam', yearStart: 2024, type: 'bsd2')
              .contains('3. Neither'),
          isFalse);

      // SPDX identifiers and loose spellings find the same text.
      expect(
          generateLicense(author: 'Sam', yearStart: 2024, type: 'BSD-3-Clause'),
          generateLicense(author: 'Sam', yearStart: 2024, type: 'bsd3'));
      expect(
          generateLicense(
              author: 'Sam', yearStart: 2024, type: 'GPL-3.0-or-later'),
          generateLicense(author: 'Sam', yearStart: 2024, type: 'gpl3'));
      expect(
          generateLicense(author: 'Sam', yearStart: 2024, type: 'apache 2.0'),
          startsWith('Copyright 2024 Sam'));

      // An unknown type throws rather than falling back to MIT. `GPL-3.0` is the deprecated
      // SPDX name for `GPL-3.0-only`, which the "or later" notice would misstate.
      expect(() => generateLicense(author: 'Sam', type: 'gpl-2'),
          throwsArgumentError);
      expect(() => generateLicense(author: 'Sam', type: 'GPL-3.0'),
          throwsArgumentError);

      // The year defaults to the current one, and a range ending in the same year collapses.
      expect(generateLicense(author: 'Sam', type: 'mit'),
          startsWith('Copyright (c) ${DateTime.now().year} Sam'));
      expect(
          generateLicense(
              author: 'Sam', yearStart: 2024, yearEnd: 2026, type: 'mit'),
          startsWith('Copyright (c) 2024-2026 Sam'));
      expect(
          generateLicense(
              author: 'Sam', yearStart: 2024, yearEnd: '2024', type: 'mit'),
          startsWith('Copyright (c) 2024 Sam\n'));

      // `htmlBr` swaps the newlines for tags and escapes what HTML would read as markup.
      final String html = generateLicense(
          author: 'Sam & Co',
          email: 'sam@example.com',
          yearStart: 2024,
          type: 'gpl3',
          htmlBr: true);

      expect(
          html,
          startsWith(
              'Copyright (C) 2024 Sam &amp; Co &lt;sam@example.com&gt;<br/><br/>This program'));
      expect(html, endsWith('see &lt;https://www.gnu.org/licenses/&gt;.'));
      expect(html.contains('\n'), isFalse);
    });
  });
}
