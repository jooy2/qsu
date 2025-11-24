/// Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.
bool isBotAgent(String userAgent) {
  final RegExp botPattern = RegExp(
    r'bot|naverbot|google|Googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Chrome-Lighthouse|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis',
    caseSensitive: false,
  );

  return botPattern.hasMatch(userAgent);
}

/// You can check if the URL path in the first argument value is matched against the second set of rules.
bool isMatchPathname(String pathname, dynamic matcher) {
  if (pathname.isEmpty ||
      matcher == null ||
      (matcher is String && matcher.isEmpty)) {
    throw Exception('`url` and `matcher` must be set');
  }

  final List<String> matcherSet =
      matcher is List<String> ? matcher : [matcher.toString()];
  final String realPathname =
      pathname.split('?').first.replaceFirst(RegExp(r'/$'), '');

  return matcherSet.any((matcher) {
    if (matcher == '*' || matcher == '/*') {
      return true;
    }

    final realMatcher = matcher.replaceFirst(RegExp(r'\*$'), '');

    if (matcher.endsWith('*')) {
      return realPathname.startsWith(realMatcher);
    }

    return realMatcher == realPathname;
  });
}

/// Removes the first-level path from a URL or pathname. Use this when you need a locale-free path in special cases in a URL that normally uses locale prefixes. For example, `/en/hello` is converted to `/hello`.
String removeLocalePrefix(String urlOrPathname, dynamic locales) {
  final List<String> localeLists =
      locales is List<String> ? locales : [locales.toString()];
  final String trimmed = urlOrPathname.replaceFirst(RegExp(r'^/'), '');

  if (localeLists.contains(trimmed)) {
    return '';
  }

  if (urlOrPathname == '/') {
    return '/';
  }

  final String joinLocaleLists = localeLists.join('|');

  try {
    final Uri uri = Uri.parse(urlOrPathname);
    final String path = uri.path;

    if (path == '/' ||
        localeLists.contains(path.replaceFirst(RegExp(r'^/'), ''))) {
      return uri.origin;
    }

    final String newPath =
        path.replaceFirst(RegExp('^/($joinLocaleLists)/'), '/');

    return (uri.origin + newPath).replaceAll(RegExp(r'/$'), '');
  } catch (_) {
    String realPath = urlOrPathname;

    if (!realPath.startsWith('/')) {
      realPath = '/$realPath';
    }

    if (realPath.endsWith('/')) {
      realPath = realPath.replaceFirst(RegExp(r'/$'), '');
    }

    if (RegExp('^/($joinLocaleLists)\$').hasMatch(realPath)) {
      return '/';
    }

    return realPath.replaceFirst(RegExp('^/($joinLocaleLists)/'), '/');
  }
}
