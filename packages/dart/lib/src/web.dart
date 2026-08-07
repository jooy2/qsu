import 'dart:convert';

/// (Private) Compiled once. Building a `RegExp` inside a function recompiles the
/// pattern on every call, and `getSlug` did it for every single character.
final RegExp _trailingSlash = RegExp(r'/$');
final RegExp _trailingStar = RegExp(r'\*$');
final RegExp _leadingSlash = RegExp(r'^/');
final RegExp _whitespace = RegExp(r'\s');
final RegExp _asciiLetterOnly = RegExp(r'^[a-zA-Z]$');
final RegExp _unicodeLetter = RegExp(r'\p{L}', unicode: true);
final RegExp _schemePrefix = RegExp(r'^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/');
final RegExp _authorityDelimiter = RegExp(r'[/?#]');
final RegExp _digitsOnly = RegExp(r'^\d+$');
final RegExp _trailingSlashes = RegExp(r'/+$');
final RegExp _regExpSpecialCharacters = RegExp(r'[.*+?^$(){}|\[\]\\\-/]');

/// (Private) Escape regular expression metacharacters so a locale is matched literally.
String _escapeRegExp(String str) {
  return str.replaceAllMapped(_regExpSpecialCharacters, (m) => '\\${m[0]}');
}

/// (Private) Compiled once, and pruned: 84 of the original 172 alternatives were
/// substrings of another one (`bot` already matches `naverbot`, `bingbot`, ...), so they
/// could never change the outcome while every one of them was still scanned.
final RegExp _botPattern = RegExp(
  r'bot|google|Chrome-Lighthouse|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|FAST Enterprise Crawler|biglotron|teoma|convera|gigablast|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|panscient|IOI|ips-agent|yanga|Voyager|CyberPatrol|baiduspider|postrank|page2rss|linkdex|ezooms|heritrix|findthatfile|europarchive.org|sistrix crawler|Aboundex|domaincrawler|summify|ec2linkfinder|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|wotbox|ichiro|lssrocketcrawler|drupact|webcompanycrawler|openindexspider|gnam gnam spider|backlinkcrawler|coccoc|integromedb|content crawler spider|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|proximic|changedetection|WeSEE:Search|360Spider|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|fr-crawler|binlar|SimpleCrawler|A6-Indexer|ADmantX|MegaIndex|ltx71|BUbiNG|Qwantify|crawler4j|lipperhey|y!j-asr|AddThis',
  caseSensitive: false,
);

/// Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.
bool isBotAgent(String userAgent) {
  return _botPattern.hasMatch(userAgent);
}

/// You can check if the URL path in the first argument value is matched against the second set of rules.
bool isMatchPathname(String pathname, dynamic matcher) {
  if (pathname.isEmpty ||
      matcher == null ||
      (matcher is String && matcher.isEmpty) ||
      // An empty list is just as unusable as an empty string. It used to fall through
      // and quietly return `false`, unlike the JavaScript and Python implementations.
      (matcher is Iterable && matcher.isEmpty)) {
    throw Exception('`url` and `matcher` must be set');
  }

  // Accept any iterable of values, not only `List<String>`. A `List<dynamic>` — what
  // JSON decoding produces — used to be stringified whole into `"[/a, /b]"` and never matched.
  final List<String> matcherSet = matcher is Iterable
      ? matcher.map((e) => e.toString()).toList()
      : [matcher.toString()];
  final String realPathname =
      pathname.split('?').first.replaceFirst(_trailingSlash, '');

  return matcherSet.any((matcher) {
    if (matcher == '*' || matcher == '/*') {
      return true;
    }

    final realMatcher = matcher.replaceFirst(_trailingStar, '');

    if (matcher.endsWith('*')) {
      return realPathname.startsWith(realMatcher);
    }

    return realMatcher == realPathname;
  });
}

/// (Private) Compiled once, for the same reason as [_botPattern].
final RegExp _mobilePattern1 = RegExp(
  r'(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino',
  caseSensitive: false,
);

final RegExp _mobilePattern2 = RegExp(
  r'1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ /])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-',
  caseSensitive: false,
);

/// Checks if the current user is accessing from a mobile device via the User Agent string. This function returns `false` for tablet users.
bool isMobile(String userAgent) {
  return _mobilePattern1.hasMatch(userAgent) ||
      _mobilePattern2.hasMatch(
          userAgent.substring(0, userAgent.length < 4 ? userAgent.length : 4));
}

/// Removes the first-level path from a URL or pathname. Use this when you need a locale-free path in special cases in a URL that normally uses locale prefixes. For example, `/en/hello` is converted to `/hello`.
String removeLocalePrefix(String urlOrPathname, dynamic locales) {
  final List<String> localeLists = locales is Iterable
      ? locales.map((e) => e.toString()).toList()
      : [locales.toString()];
  final String trimmed = urlOrPathname.replaceFirst(_leadingSlash, '');

  if (localeLists.contains(trimmed)) {
    return '';
  }

  if (urlOrPathname == '/') {
    return '/';
  }

  // Escape each locale: unescaped values were interpreted as patterns, so a locale
  // like `zh.CN` also matched `zhXCN`.
  final String joinLocaleLists = localeLists.map(_escapeRegExp).join('|');

  try {
    final Uri uri = Uri.parse(urlOrPathname);
    final String path = uri.path;

    if (path == '/' ||
        localeLists.contains(path.replaceFirst(_leadingSlash, ''))) {
      return uri.origin;
    }

    final String newPath =
        path.replaceFirst(RegExp('^/($joinLocaleLists)/'), '/');

    return (uri.origin + newPath).replaceAll(_trailingSlash, '');
  } catch (_) {
    String realPath = urlOrPathname;

    if (!realPath.startsWith('/')) {
      realPath = '/$realPath';
    }

    if (realPath.endsWith('/')) {
      realPath = realPath.replaceFirst(_trailingSlash, '');
    }

    if (RegExp('^/($joinLocaleLists)\$').hasMatch(realPath)) {
      return '/';
    }

    return realPath.replaceFirst(RegExp('^/($joinLocaleLists)/'), '/');
  }
}

/// Converts the given [text] into a URL slug. Whitespace and existing `-`/`_`
/// characters act as word boundaries, letters are kept, and non-Latin letters,
/// digits and special characters are gated by the named options. The result is
/// trimmed and lowercased (or uppercased). When [baseUrl] is set and the slug is
/// not empty, the slug is joined onto it to form a full URL.
String getSlug(
  String text, {
  String separator = '-',
  bool includeNumbers = true,
  bool includeSpecial = false,
  bool uppercase = false,
  bool includeNonLatin = true,
  String baseUrl = '',
}) {
  if (text.trim().isEmpty) {
    return '';
  }

  final String trimmed = text.trim();
  final String source =
      uppercase ? trimmed.toUpperCase() : trimmed.toLowerCase();

  // Both the chosen separator and any separator-like char in the source act as
  // a word boundary, so "hello-world" stays "hello-world" instead of doubling.
  bool isBoundary(String ch) =>
      _whitespace.hasMatch(ch) || ch == '-' || ch == '_';
  bool isAsciiLetter(String ch) => _asciiLetterOnly.hasMatch(ch);
  bool isLetter(String ch) => _unicodeLetter.hasMatch(ch);
  bool isDigit(String ch) =>
      ch.codeUnitAt(0) >= 0x30 && ch.codeUnitAt(0) <= 0x39;

  // Encode every special character as its uppercase UTF-8 percent sequence.
  String percentEncode(String ch) => utf8
      .encode(ch)
      .map((b) => '%${b.toRadixString(16).toUpperCase().padLeft(2, '0')}')
      .join();

  final List<String> words = [];
  String current = '';
  void flush() {
    if (current.isNotEmpty) {
      words.add(current);
      current = '';
    }
  }

  for (final int rune in source.runes) {
    final String ch = String.fromCharCode(rune);

    if (isBoundary(ch)) {
      flush();
    } else if (isAsciiLetter(ch)) {
      current += ch;
    } else if (isLetter(ch)) {
      if (includeNonLatin) current += ch;
    } else if (isDigit(ch)) {
      if (includeNumbers) current += ch;
    } else if (includeSpecial) {
      current += percentEncode(ch);
    }
  }
  flush();

  final String slug = words.join(separator);

  if (slug.isEmpty) {
    return '';
  }

  // Prepend the base URL as-is (no protocol required) when one is provided.
  final String base = baseUrl.trim();

  if (base.isEmpty) {
    return slug;
  }

  return '${base.replaceAll(_trailingSlashes, '')}/$slug';
}

/// The result of [getParsedInfoFromAddress]. Missing values are `null`. [error] is `true`
/// only when the input cannot be parsed, not when a value is simply absent.
class ParsedAddress {
  final bool error;
  final String? protocol;
  final String? host;
  final int? port;
  final String? user;
  final String? pass;

  ParsedAddress({
    required this.error,
    this.protocol,
    this.host,
    this.port,
    this.user,
    this.pass,
  });
}

/// Parses an address string (URL / host / SSH-style connection string) into its
/// parts. Handles an optional `scheme://`, `user:pass@` userinfo, IPv4, bare or
/// bracketed IPv6, and a port. Absent parts are `null`; the protocol is not
/// defaulted and ports are not inferred from the protocol.
ParsedAddress getParsedInfoFromAddress(String url) {
  if (url.trim().isEmpty) {
    return ParsedAddress(error: true);
  }

  bool error = false;
  String? protocol;
  String? host;
  int? port;
  String? user;
  String? pass;

  String rest = url.trim();

  // Extract the scheme only when it is followed by `://` (e.g. `ssh://`,
  // `https://`). A bare `host:1234` must not be treated as a `host` scheme.
  final RegExpMatch? schemeMatch = _schemePrefix.firstMatch(rest);

  if (schemeMatch != null) {
    protocol = schemeMatch.group(1)!.toUpperCase();
    rest = rest.substring(schemeMatch.group(0)!.length);
  }

  // Drop the path/query/fragment. Only the authority part is analyzed.
  final String authority = rest.split(_authorityDelimiter).first;

  if (authority.isEmpty) {
    return ParsedAddress(error: error, protocol: protocol);
  }

  // Split userinfo from host by the last `@` so `@` inside the password stays.
  String hostPort = authority;
  final int atIndex = authority.lastIndexOf('@');

  if (atIndex != -1) {
    final String userInfo = authority.substring(0, atIndex);

    hostPort = authority.substring(atIndex + 1);

    // Split user from password by the first `:` so `:` inside the password stays.
    final int colonIndex = userInfo.indexOf(':');
    final String u =
        colonIndex != -1 ? userInfo.substring(0, colonIndex) : userInfo;
    final String p = colonIndex != -1 ? userInfo.substring(colonIndex + 1) : '';

    user = u.isEmpty ? null : u;
    pass = p.isEmpty ? null : p;
  }

  void parsePort(String portString) {
    if (portString.isEmpty) {
      return;
    }

    final int? parsed = int.tryParse(portString);

    if (!_digitsOnly.hasMatch(portString) || parsed == null || parsed > 65535) {
      error = true;

      return;
    }

    port = parsed;
  }

  if (hostPort.startsWith('[')) {
    // Bracketed IPv6. Keep the brackets as part of the host.
    final int closeIndex = hostPort.indexOf(']');

    if (closeIndex == -1) {
      return ParsedAddress(
        error: true,
        protocol: protocol,
        user: user,
        pass: pass,
      );
    }

    host = hostPort.substring(0, closeIndex + 1);

    final String after = hostPort.substring(closeIndex + 1);

    if (after.isEmpty) {
      // No port.
    } else if (after.startsWith(':')) {
      parsePort(after.substring(1));
    } else {
      error = true;
    }
  } else {
    final int colonCount = ':'.allMatches(hostPort).length;

    if (colonCount >= 2) {
      // Bare IPv6 without brackets (e.g. `::1`). It cannot carry a port.
      host = hostPort;
    } else if (colonCount == 1) {
      final List<String> parts = hostPort.split(':');

      host = parts[0].isEmpty ? null : parts[0];
      parsePort(parts[1]);
    } else {
      host = hostPort.isEmpty ? null : hostPort;
    }
  }

  return ParsedAddress(
    error: error,
    protocol: protocol,
    host: host,
    port: port,
    user: user,
    pass: pass,
  );
}

/// (Private) Compiled once. Building a `RegExp` inside a function recompiles the pattern
/// on every call.
final RegExp _unescapedHtmlCharacters = RegExp(r'''[&<>"']''');

/// (Private) `'` is written as `&#39;` rather than `&apos;`, which HTML 4 did not define
/// and which therefore does not survive every parser.
const Map<String, String> _htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/// Escapes the five characters that carry meaning in HTML (`&`, `<`, `>`, `"` and `'`), so a value can be dropped into a page as text rather than read as markup.
/// `'` is written as `&#39;` rather than `&apos;`, which HTML 4 never defined and which therefore does not survive every parser.
/// Everything else is left alone. `&` is part of the escaped set, which means an already-escaped string is escaped again: `escapeHtml('&lt;')` returns `'&amp;lt;'`.
/// [unescapeHtml] turns the result back.
String escapeHtml(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  return str.replaceAllMapped(
      _unescapedHtmlCharacters, (Match m) => _htmlEscapes[m[0]]!);
}
