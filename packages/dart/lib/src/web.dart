import 'dart:convert';

import 'package:qsu/src/web/_bots.dart';

/// (Private) Compiled once. Building a `RegExp` inside a function recompiles the
/// pattern on every call, and `getSlug` did it for every single character.
final RegExp _trailingSlash = RegExp(r'/$');
final RegExp _trailingStar = RegExp(r'\*$');
final RegExp _leadingSlash = RegExp(r'^/');
final RegExp _whitespace = RegExp(r'\s');
final RegExp _asciiLetterOnly = RegExp(r'^[a-zA-Z]$');
final RegExp _unicodeLetter = RegExp(r'\p{L}', unicode: true);
final RegExp _trailingSlashes = RegExp(r'/+$');
final RegExp _regExpSpecialCharacters = RegExp(r'[.*+?^$(){}|\[\]\\\-/]');

/// (Private) Escape regular expression metacharacters so a locale is matched literally.
String _escapeRegExp(String str) {
  return str.replaceAllMapped(_regExpSpecialCharacters, (m) => '\\${m[0]}');
}

/// Returns `true` if [text] is, or comes from, an automated client: a search engine crawler, an AI crawler or agent, an SEO tool, a link preview fetcher, an uptime monitor, an HTTP library and the like.
/// [text] can be a whole `User-Agent` header or just a bot's name as robots.txt writes it, such as `Googlebot` or `GPTBot`, and is matched without case.
/// Besides the names it knows, words such as `bot`, `crawler` and `spider` count too, so a crawler it has never seen is still caught.
bool isBot(String text) {
  // The devices and apps whose names happen to contain a generic word, such as a Cubot
  // phone, are taken out before the names are read.
  return text.isNotEmpty &&
      botPattern.hasMatch(text.replaceAll(notBotPattern, ''));
}

/// Returns `true` if [text] names a crawler that indexes pages for a search engine, such as Googlebot, Bingbot, YandexBot, Baiduspider or Naver's Yeti.
/// Crawlers that index pages for an AI product are [isAiSearchBot] instead.
bool isSearchBot(String text) {
  return text.isNotEmpty && searchBotsPattern.hasMatch(text);
}

/// Returns `true` if [text] names a crawler that indexes pages so an AI product can cite them in its answers, and whose operator says it is not used for training, such as OAI-SearchBot, Claude-SearchBot or PerplexityBot.
bool isAiSearchBot(String text) {
  return text.isNotEmpty && aiSearchBotsPattern.hasMatch(text);
}

/// Returns `true` if [text] names a fetcher that visits a page only when a person asks an AI assistant or agent to, such as ChatGPT-User, Claude-User or Perplexity-User.
bool isAiAgentBot(String text) {
  return text.isNotEmpty && aiAgentBotsPattern.hasMatch(text);
}

/// Returns `true` if [text] names a crawler that collects pages to train AI models or to build datasets for that, such as GPTBot, ClaudeBot, CCBot or Bytespider, or a robots.txt token that controls such use, such as Google-Extended.
bool isAiTrainingBot(String text) {
  return text.isNotEmpty && aiTrainingBotsPattern.hasMatch(text);
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

/// (Private) Smart TVs, set-top boxes, game consoles and headsets run a browser too, but
/// they are not a phone, a tablet or a computer. Several of them otherwise read as one: a
/// Tizen TV says `Linux`, an Xbox says `Windows NT` and a Fire TV stick says `Android`
/// without `Mobile`.
final RegExp _otherDevicePattern = RegExp(
  r'smart-?tv|\btv safari|hbbtv|netcast|web0s|appletv|apple tv|crkey|chromecast|roku|bravia|googletv|android tv|\baft[a-z]+ build|playstation|xbox|nintendo|oculus|quest \d|picobrowser',
  caseSensitive: false,
);

/// (Private) `Tablet PC` is left out: Internet Explorer printed it on ordinary Windows
/// laptops.
final RegExp _tabletPattern = RegExp(
  r'ipad|tablet(?! pc)|playbook|kindle|silk\/|\bkf[a-z]{2,6} build',
  caseSensitive: false,
);

/// (Private) The patterns of detectmobilebrowsers.com (public domain under the Unlicense),
/// unchanged, as `isMobile` used them. The second one is only matched against the first
/// four characters, where old feature phones put their maker. `kindle` in the first is
/// never reached, [_tabletPattern] having claimed it already.
final RegExp _mobilePattern = RegExp(
  r'(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino',
  caseSensitive: false,
);

final RegExp _mobilePrefixPattern = RegExp(
  r'1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ /])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-',
  caseSensitive: false,
);

/// (Private) MDN's advice for telling a phone from everything else is to look for `Mobi`
/// anywhere.
final RegExp _mobiPattern = RegExp(r'mobi', caseSensitive: false);
final RegExp _androidPattern = RegExp(r'android', caseSensitive: false);
final RegExp _desktopPattern = RegExp(
  r'windows nt|windows (?:9[58x]|xp|2000|me)|win(?:9[58x]|16|32|64)|macintosh|mac os x|mac_powerpc|x11|cros|linux|(?:free|open|net)bsd|sunos|haiku',
  caseSensitive: false,
);

/// (Private) The kind of device a User-Agent string names: `mobile`, `tablet`, `desktop`,
/// or `null` when it names none of them, as `curl/8.0` and most crawlers do.
///
/// The checks run in order and the first one that answers wins, so the three public
/// functions can never all agree on one string: a tablet is tested before a phone because
/// an iPad's Safari also says `Mobile`, and an Android string that names no phone is a
/// tablet only after every phone pattern has had its turn.
String? _deviceType(String userAgent) {
  if (userAgent.isEmpty || _otherDevicePattern.hasMatch(userAgent)) {
    return null;
  }

  if (_tabletPattern.hasMatch(userAgent)) {
    return 'tablet';
  }

  if (_mobilePattern.hasMatch(userAgent) ||
      _mobilePrefixPattern.hasMatch(userAgent.substring(
          0, userAgent.length < 4 ? userAgent.length : 4)) ||
      _mobiPattern.hasMatch(userAgent)) {
    return 'mobile';
  }

  // Chrome and the stock browser leave `Mobile` out on an Android tablet.
  if (_androidPattern.hasMatch(userAgent)) {
    return 'tablet';
  }

  if (_desktopPattern.hasMatch(userAgent)) {
    return 'desktop';
  }

  return null;
}

/// Returns `true` if the User-Agent string comes from a phone. A tablet is not a phone, so an iPad or an Android tablet returns `false`; use [isTabletDeviceFromUA] for those.
bool isMobileDeviceFromUA(String userAgent) {
  return _deviceType(userAgent) == 'mobile';
}

/// Returns `true` if the User-Agent string comes from a tablet: an iPad, an Android tablet, a Kindle or a Fire tablet.
/// iPadOS 13 and later sends the same string as a Mac by default, so Safari on a current iPad is reported by [isDesktopDeviceFromUA] instead.
bool isTabletDeviceFromUA(String userAgent) {
  return _deviceType(userAgent) == 'tablet';
}

/// Returns `true` if the User-Agent string comes from a desktop or laptop computer running Windows, macOS, Linux, ChromeOS or a BSD.
/// A string that names no operating system, such as most crawlers and HTTP clients send, returns `false`, as do smart TVs and game consoles.
bool isDesktopDeviceFromUA(String userAgent) {
  return _deviceType(userAgent) == 'desktop';
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

/// (Private) Compiled once. One pass over the whole string, not five sequential
/// replacements: turning `&amp;` into `&` first and `&lt;` into `<` afterwards would read
/// `&amp;lt;` as `<`, where it has to come back as the literal text `&lt;`.
final RegExp _escapedHtmlEntities = RegExp(r'&(?:amp|lt|gt|quot|#39);');

const Map<String, String> _htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

/// Turns the five HTML entities that [escapeHtml] produces (`&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;`) back into the characters they stand for.
/// The string is walked once, not replaced five times in a row, so `&amp;lt;` comes back as the literal text `&lt;` instead of being unescaped twice.
/// Only these five entities are recognised, so anything else (`&apos;`, `&nbsp;`, `&#x27;`, a numeric entity) is left exactly as it is, and `unescapeHtml(escapeHtml(text))` always returns the original text.
String unescapeHtml(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  return str.replaceAllMapped(
      _escapedHtmlEntities, (Match m) => _htmlUnescapes[m[0]]!);
}

/// (Private) The GNU licenses are too long to generate, so the notice each of them asks to
/// be put at the top of every source file is returned instead. The three notices differ
/// only in the name.
String _gnuNotice(String name) {
  return 'This program is free software: you can redistribute it and/or modify\nit under the terms of the GNU $name as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU $name for more details.\n\nYou should have received a copy of the GNU $name\nalong with this program.  If not, see <https://www.gnu.org/licenses/>.';
}

const String _bsdConditions =
    'Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\n\n1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\n\n2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.';
const String _bsdDisclaimer =
    'THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.';

/// (Private) The copyright line's opening words and the text after it, for each type. The
/// short permissive licenses are returned whole. Apache 2.0, MPL 2.0 and the GNU licenses
/// are returned as the notice their own text asks to be attached to each file.
final Map<String, (String, String)> _licenses = {
  'mit': (
    'Copyright (c)',
    'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
  ),
  'isc': (
    'Copyright (c)',
    'Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.\n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.'
  ),
  'apache20': (
    'Copyright',
    'Licensed under the Apache License, Version 2.0 (the "License");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an "AS IS" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.'
  ),
  'bsd2': ('Copyright', '$_bsdConditions\n\n$_bsdDisclaimer'),
  'bsd3': (
    'Copyright',
    '$_bsdConditions\n\n3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.\n\n$_bsdDisclaimer'
  ),
  'mpl20': (
    'Copyright (c)',
    'This Source Code Form is subject to the terms of the Mozilla Public\nLicense, v. 2.0. If a copy of the MPL was not distributed with this\nfile, You can obtain one at https://mozilla.org/MPL/2.0/.'
  ),
  'gpl3': ('Copyright (C)', _gnuNotice('General Public License')),
  'lgpl3': ('Copyright (C)', _gnuNotice('Lesser General Public License')),
  'agpl3': ('Copyright (C)', _gnuNotice('Affero General Public License')),
};

/// (Private) An SPDX identifier loses its punctuation the same way, so `BSD-3-Clause` and
/// `GPL-3.0-or-later` arrive as `bsd3clause` and `gpl30orlater`.
const Map<String, String> _spdxAliases = {
  'bsd2clause': 'bsd2',
  'bsd3clause': 'bsd3',
  'gpl30orlater': 'gpl3',
  'lgpl30orlater': 'lgpl3',
  'agpl30orlater': 'agpl3',
};

final RegExp _licenseTypePunctuation = RegExp(r'[.\-_,\s]');
final RegExp _htmlTextSpecialCharacters = RegExp(r'[&<>]');
const Map<String, String> _htmlTextEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

/// Return the text of a software license with the copyright line filled in.
/// [type] is one of `mit`, `isc`, `apache20`, `bsd2`, `bsd3`, `mpl20`, `gpl3`, `lgpl3` and `agpl3`, or the SPDX identifier of one of them, such as `BSD-3-Clause` or `GPL-3.0-or-later`; case and punctuation are ignored, and any other value throws an [ArgumentError].
/// The short permissive licenses are returned whole, and Apache 2.0, MPL 2.0 and the GNU licenses as the notice to attach to each file.
/// [yearStart] defaults to the current year, and [yearEnd] is left out when it is the same year.
/// Set [htmlBr] to separate the lines with `<br/>` rather than with a newline; `&`, `<` and `>` are then escaped as well.
String generateLicense({
  required String author,
  required String type,
  Object? yearStart,
  Object? yearEnd,
  String? email,
  bool htmlBr = false,
}) {
  final String key = type.replaceAll(_licenseTypePunctuation, '').toLowerCase();
  final (String, String)? license = _licenses[_spdxAliases[key] ?? key];

  // Falling back to MIT turned a typo into a different license without a word.
  if (license == null) {
    throw ArgumentError.value(type, 'type', 'Unknown license type');
  }

  final Object start = yearStart ?? DateTime.now().year;
  final String yearString =
      yearEnd != null && '$yearEnd'.isNotEmpty && '$yearEnd' != '$start'
          ? '$start-$yearEnd'
          : '$start';
  final String authorString =
      '$author${email != null && email.isNotEmpty ? ' <$email>' : ''}';
  final String text =
      '${license.$1} $yearString $authorString\n\n${license.$2}';

  if (!htmlBr) {
    return text;
  }

  // The text is going into HTML, where `<user@example.com>` would be read as a tag.
  return text
      .replaceAllMapped(
          _htmlTextSpecialCharacters, (Match m) => _htmlTextEscapes[m[0]]!)
      .replaceAll('\n', '<br/>');
}
