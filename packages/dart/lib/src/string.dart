import 'dart:collection';
import 'dart:math';

import 'package:qsu/src/math.dart';
import 'package:qsu/src/verify.dart';
import 'package:unorm_dart/unorm_dart.dart';

/// (Private) A single generator, reused. Creating a `Random` per call is far more
/// expensive than drawing from an existing one.
final Random _random = Random();

/// (Private) Compiled once. Building a `RegExp` inside a function recompiles the
/// pattern on every call.
final RegExp _repeatedWhitespace = RegExp(r'\s{2,}');
final RegExp _asciiLetter = RegExp(r'[a-zA-Z]');
final RegExp _regExpSpecialCharactersInClass =
    RegExp(r'[.*+?^$(){}|\[\]\\\-/]');

/// (Private) Escape every regular expression metacharacter so the value is matched
/// literally. Unlike the public [escapeRegExp] this also escapes `-` and `/`, because the
/// result may land inside a character class, where `'a-z'` would become a range and `']'`
/// would close the class early.
String _escapeRegExpInClass(String str) {
  return str.replaceAllMapped(
      _regExpSpecialCharactersInClass, (m) => '\\${m[0]}');
}

/// Removes all whitespace before and after a string. Unlike JavaScript's `trim` function, it converts two or more spaces between sentences into a single space.
String collapseWhitespace(String str) {
  if (str.isEmpty) {
    return '';
  }

  return str.trim().replaceAll(_repeatedWhitespace, ' ');
}

/// Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.
String removeSpecialChars(String str, {String? allowedCharacters}) {
  final String exception =
      allowedCharacters == null ? '' : _escapeRegExpInClass(allowedCharacters);

  return str.replaceAll(
      RegExp(
          '[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f$exception]'),
      '');
}

/// Replaces text within a range starting and ending with a specific character in a given string with another string. For example, given the string `abc<DEF>ghi`, to change `<DEF>` to `def`, use `replaceEnclosed('abc<DEF>ghi', '<', '>', 'def')`. The result would be `abcdefghi`.
/// Deletes strings in the range if `replaceWith` is not specified.
String replaceEnclosed(String str, String start, String end,
    [String replaceWith = '']) {
  if (str.isEmpty) {
    return '';
  }

  // Escape the whole delimiter. Prefixing a single backslash only worked for
  // one-character delimiters and produced an invalid pattern for longer ones.
  return str.replaceAll(
      RegExp('${_escapeRegExpInClass(start)}.*?${_escapeRegExpInClass(end)}'),
      replaceWith);
}

/// Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.
List<String> split(String str, [List<String>? separators]) {
  if (str.isEmpty) {
    return [];
  }

  final List<String> splitters =
      (separators != null && separators.isNotEmpty) ? separators : [];

  if (splitters.isEmpty) {
    return [str];
  }

  final int splitterLength = splitters.length;
  String charPattern = '';
  String strPattern = '';

  for (var i = 0; i < splitterLength; i++) {
    final String spl = splitters[i];

    if (spl.length > 1) {
      final String escaped = spl
          .replaceAll(r'\', r'\\')
          .replaceAll('[', r'\[')
          .replaceAll(']', r'\]')
          .replaceAll('?', r'\?')
          .replaceAll('.', r'\.')
          .replaceAll('{', r'\{')
          .replaceAll('}', r'\}')
          .replaceAll('+', r'\+');
      strPattern += '${strPattern.isEmpty ? '' : '|'}$escaped';
    } else if (spl == '-' || spl == '[' || spl == ']') {
      charPattern += r'\' + spl;
    } else {
      charPattern += spl;
    }
  }

  if (charPattern.isEmpty && strPattern.isEmpty) {
    return [str];
  }

  if (charPattern.isNotEmpty) {
    charPattern = '[$charPattern]';
    if (strPattern.isNotEmpty) {
      strPattern = '|$strPattern';
    }
  }

  return str.split(RegExp('$charPattern$strPattern+', caseSensitive: false));
}

/// Removes `\n`, `\r` characters or replaces them with specified characters.
String removeNewlines(String str, {String replaceWith = ''}) {
  return str
      .replaceAll(RegExp(r'(\r\n|\n|\r)', multiLine: true), replaceWith)
      .trim();
}

/// Converts the first letter of the entire string to uppercase and returns.
String capitalizeFirst(String str) {
  // Indexing an empty string threw a RangeError. JavaScript and Python return ''.
  if (str.isEmpty) {
    return '';
  }

  return '${str[0].toUpperCase()}${str.substring(1)}';
}

/// Converts the first letter of the entire string to lowercase and returns. This is the inverse of [capitalizeFirst].
/// Only the first character is touched, so the rest of the string keeps its case.
String uncapitalizeFirst(String str) {
  if (str.isEmpty) {
    return '';
  }

  return '${str[0].toLowerCase()}${str.substring(1)}';
}

/// Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `separator` argument.
String capitalizeEachSentence(String str, {String? separator}) {
  final String splitter = separator ?? '.';
  final List<String> splitStr = str.split(splitter);
  String resultStr = '';
  List<String> sentenceChars = <String>[];

  for (int i = 0, iLen = splitStr.length; i < iLen; i += 1) {
    sentenceChars = [...splitStr[i].split('')];

    for (int j = 0, jLen = sentenceChars.length; j < jLen; j += 1) {
      if (_asciiLetter.hasMatch(splitStr[i][j])) {
        sentenceChars[j] = splitStr[i][j].toUpperCase();
        break;
      }
    }

    resultStr += '${sentenceChars.join('')}${i < iLen - 1 ? splitter : ''}';
  }

  return resultStr;
}

/// Converts every word with spaces to uppercase. If [titleCase] is `true`, only some special cases (such as prepositions) are kept lowercase.
String capitalizeEachWord(String str, {bool titleCase = false}) {
  String tempStr = str.trim();

  if (titleCase == true) {
    tempStr = tempStr.toLowerCase();
  }

  final List<String> splitStr = tempStr.split(' ');

  for (int i = 0, iLen = splitStr.length; i < iLen; i += 1) {
    if (!titleCase ||
        !contains(
            splitStr[i],
            [
              'in',
              'on',
              'the',
              'at',
              'and',
              'or',
              'of',
              'for',
              'to',
              'that',
              'a',
              'by',
              'it',
              'is',
              'as',
              'are',
              'were',
              'was',
              'nor',
              'an'
            ],
            exact: true)) {
      splitStr[i] = capitalizeFirst(splitStr[i]);
    }
  }

  return capitalizeFirst(splitStr.join(' '));
}

/// (Private) Whether `target` sits at `index`, both already split into code points.
bool _isMatchAt(List<int> runes, List<int> target, int index) {
  if (index + target.length > runes.length) {
    return false;
  }

  for (int i = 0; i < target.length; i += 1) {
    if (runes[index + i] != target[i]) {
      return false;
    }
  }

  return true;
}

/// Truncates a long string to a specified length, optionally appending an ellipsis after the string.
String truncate(String str, int length, {String? ellipsis}) {
  // Counted in code points. A Dart string is indexed in UTF-16 units, so a character outside
  // the Basic Multilingual Plane would count as two here and as one in Python, and cutting
  // between the two halves would leave a broken character behind.
  final List<int> runes = str.runes.toList();

  if (runes.length > length) {
    return String.fromCharCodes(runes.take(length)) + (ellipsis ?? '');
  }

  return str;
}

/// The full stop as each script writes it: ASCII, the CJK ideographic full stop and its
/// fullwidth and halfwidth forms. `!` and `?` are deliberately left out — an ASCII `!` has
/// never ended a sentence here, so accepting `！` would split the same text differently
/// depending on the script it is written in. Pass them explicitly to opt in.
const List<String> _defaultEndStringChars = <String>['.', '。', '．', '｡'];

/// The string ignores truncation until the ending character (`sentenceEnds`). If [minLength] is reached, return the truncated string until after the ending character.
///
/// `sentenceEnds` accepts a single `String` or a `List<String>`.
String truncateSentence(String str, int minLength, {dynamic sentenceEnds}) {
  if (str.isEmpty) {
    return '';
  }

  // Counted in code points. A Dart string is indexed in UTF-16 units, so a character outside
  // the Basic Multilingual Plane would count as two here and as one in Python, and the two
  // languages would stop at different sentences.
  final List<int> runes = str.runes.toList();
  final int runesLength = runes.length;

  if (runesLength <= minLength) {
    return str;
  }

  final List<String> given = sentenceEnds == null
      ? _defaultEndStringChars
      : (sentenceEnds is List
          ? sentenceEnds.map((dynamic value) => '$value').toList()
          : <String>['$sentenceEnds']);
  // Longest first, so an ending character that starts with another one (`.` next to `...`)
  // is matched whole instead of being cut short by the shorter one.
  final List<List<int>> endStrings = given
      .where((String endString) => endString.isNotEmpty)
      .map((String endString) => endString.runes.toList())
      .toList()
    ..sort((List<int> left, List<int> right) => right.length - left.length);

  if (endStrings.isEmpty) {
    return str;
  }

  int index = 0;

  while (index < runesLength) {
    final int matchIndex = endStrings.indexWhere(
      (List<int> endString) => _isMatchAt(runes, endString, index),
    );

    if (matchIndex == -1) {
      index += 1;
      continue;
    }

    index += endStrings[matchIndex].length;

    // The sentence that crosses the expected length is still kept whole.
    if (index >= minLength) {
      return String.fromCharCodes(runes.take(index));
    }
  }

  // Every sentence fit within the expected length, so whatever trails the last ending
  // character is kept as well.
  return str;
}

/// Returns the number of times the second String argument is contained in the first String argument.
int strCount(String str, String search) {
  int count = 0;
  int pos = str.indexOf(search);

  while (pos > -1) {
    count += 1;
    pos = str.indexOf(search, (pos += search.length));
  }

  return count;
}

/// Randomly shuffles the received string and returns it.
String strShuffle(String str) {
  final List<int> codePoints = str.runes.toList();

  for (int i = codePoints.length - 1; i > 0; i--) {
    int j = _random.nextInt(i + 1);
    int temp = codePoints[i];
    codePoints[i] = codePoints[j];
    codePoints[j] = temp;
  }

  return String.fromCharCodes(codePoints);
}

/// Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12.
String strRandom(int length, {String? additionalCharacters}) {
  // Return an empty string for a non-positive length, like JavaScript and Python.
  if (length <= 0) {
    return '';
  }

  final String availCharacters =
      'abcdefghijklmnopqrstuvwxyz0123456789${additionalCharacters ?? ''}';
  final StringBuffer result = StringBuffer();

  for (int i = 0; i < length; i++) {
    String newChar = availCharacters[_random.nextInt(availCharacters.length)];

    if (_random.nextBool()) {
      newChar = newChar.toUpperCase();
    }

    result.write(newChar);
  }

  return result.toString();
}

/// Remove duplicate characters from a given string and output only one.
String strUnique(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  // Deduplicate by code point. Splitting into UTF-16 code units broke characters
  // outside the BMP: two emoji sharing a high surrogate lost one half.
  return String.fromCharCodes(LinkedHashSet<int>.from(str.runes));
}

/// Converts the given string to ascii code and returns it as an array.
List<int> strToCharCodes(String str) {
  List<int> arr = [];

  for (int i = 0; i < str.length; i += 1) {
    arr.add(str.codeUnitAt(i));
  }

  return arr;
}

/// Merges the given list argument (the beginning of the URL), joining it so that the slash (`/`) symbol is correctly included.
String joinUrl(List<String?> args) {
  if (args.isEmpty) {
    return '';
  }

  String urlResult = '';
  int joinCount = 0;

  for (var arg in args) {
    if (arg != null) {
      if (joinCount == 0 ||
          arg.startsWith('/') ||
          arg.startsWith('?') ||
          arg.startsWith('&')) {
        urlResult += arg;
      } else {
        urlResult += '/$arg';
      }
      joinCount += 1;
    }
  }

  return urlResult.replaceAll(RegExp(r'/$'), '');
}

/// Returns the number of bytes in the given string.
int strByteLength(String? str) {
  if (str == null || str.isEmpty) {
    return 0;
  }

  int bytes = 0;

  for (int i = 0; i < str.length; i++) {
    int codeUnit = str.codeUnitAt(i);

    if (codeUnit >= 0xD800 && codeUnit <= 0xDBFF && i + 1 < str.length) {
      int next = str.codeUnitAt(i + 1);

      if (next >= 0xDC00 && next <= 0xDFFF) {
        bytes += 4;
        i++;
        continue;
      }
    }

    if (codeUnit <= 0x7F) {
      bytes += 1;
    } else if (codeUnit <= 0x7FF) {
      bytes += 2;
    } else {
      bytes += 3;
    }
  }

  return bytes;
}

/// (Private) Compiled once, for [words]. Building a `RegExp` inside a function recompiles
/// the pattern on every call.
final RegExp _letter = RegExp(r'\p{L}', unicode: true);
final RegExp _mark = RegExp(r'\p{M}', unicode: true);

/// (Private) Case is read out of the Unicode general category rather than out of
/// `toUpperCase`. Dart maps `ß` to itself where JavaScript and Python map it to `SS`, so
/// asking whether the mapped form differs answered differently per language and split
/// `ßtraße` into four words.
final RegExp _upper = RegExp(r'\p{Lu}|\p{Lt}', unicode: true);
final RegExp _lower = RegExp(r'\p{Ll}', unicode: true);

bool _isDigit(String char) =>
    char.length == 1 &&
    char.codeUnitAt(0) >= 0x30 &&
    char.codeUnitAt(0) <= 0x39;

bool _isLetter(String char) => _letter.hasMatch(char);

/// (Private) A combining mark belongs to the letter in front of it, so a decomposed `é`
/// (`e` plus U+0301) is not cut in two.
bool _isMark(String char) => _mark.hasMatch(char);

bool _isUpper(String char) => _upper.hasMatch(char);

bool _isLower(String char) => _lower.hasMatch(char);

bool _hasCase(String char) => _isUpper(char) || _isLower(char);

/// Splits a string into the words it is made of and returns them as an array.
/// Anything that is neither a letter nor a digit separates words, so spaces, punctuation, `-` and `_` never appear in the result.
/// A run of digits is its own word, a camelCase boundary splits, and the last capital of a run of capitals opens the next word (`XMLHttpRequest` is `XML`, `Http`, `Request`).
/// Scripts without upper and lower case have no camelCase boundary, but they do change word when a cased letter appears.
List<String> words(String? str) {
  if (str == null || str.isEmpty) {
    return [];
  }

  // Walk code points. Indexing a Dart string walks UTF-16 units, which would cut a
  // surrogate pair in half and disagree with the JavaScript and Python implementations.
  final List<String> chars =
      str.runes.map((int rune) => String.fromCharCode(rune)).toList();
  final int charsLength = chars.length;
  final List<String> result = [];
  int i = 0;

  while (i < charsLength) {
    final String char = chars[i];
    int end = i + 1;

    if (_isDigit(char)) {
      while (end < charsLength && _isDigit(chars[end])) {
        end++;
      }

      result.add(chars.sublist(i, end).join());
      i = end;
      continue;
    }

    if (!_isLetter(char)) {
      i++;
      continue;
    }

    if (!_hasCase(char)) {
      // Hangul, CJK, Thai and the like carry no case, so no camelCase boundary applies.
      while (end < charsLength &&
          (_isMark(chars[end]) ||
              (_isLetter(chars[end]) && !_hasCase(chars[end])))) {
        end++;
      }
    } else if (_isUpper(char)) {
      while (
          end < charsLength && _isLetter(chars[end]) && _isUpper(chars[end])) {
        end++;
      }

      if (end - i > 1) {
        // `XMLHttp` is `XML` plus `Http`: the last capital of a run of capitals opens
        // the next word instead of closing this one.
        if (end < charsLength &&
            _isLetter(chars[end]) &&
            _isLower(chars[end])) {
          end--;
        }
      } else {
        while (end < charsLength &&
            (_isMark(chars[end]) ||
                (_isLetter(chars[end]) && _isLower(chars[end])))) {
          end++;
        }
      }
    } else {
      while (end < charsLength &&
          (_isMark(chars[end]) ||
              (_isLetter(chars[end]) && _isLower(chars[end])))) {
        end++;
      }
    }

    result.add(chars.sublist(i, end).join());
    i = end;
  }

  return result;
}

/// (Private) Every character of the key maps to the value. The set covers the Latin-1
/// Supplement and Latin Extended-A blocks, which is what can be expressed as a plain table
/// in all three languages: Dart has no Unicode normalization, so a decomposing step that
/// would also reach Latin Extended Additional (Vietnamese and the like) is not available.
const Map<String, String> _deburredGroups = {
  'ÀÁÂÃÄÅĀĂĄ': 'A',
  'àáâãäåāăą': 'a',
  'ÇĆĈĊČ': 'C',
  'çćĉċč': 'c',
  'ÐĎĐ': 'D',
  'ðďđ': 'd',
  'ÈÉÊËĒĔĖĘĚ': 'E',
  'èéêëēĕėęě': 'e',
  'ĜĞĠĢ': 'G',
  'ĝğġģ': 'g',
  'ĤĦ': 'H',
  'ĥħ': 'h',
  'ÌÍÎÏĨĪĬĮİ': 'I',
  'ìíîïĩīĭįı': 'i',
  'Ĵ': 'J',
  'ĵ': 'j',
  'Ķ': 'K',
  'ķĸ': 'k',
  'ĹĻĽĿŁ': 'L',
  'ĺļľŀł': 'l',
  'ÑŃŅŇŊ': 'N',
  'ñńņňŋ': 'n',
  'ÒÓÔÕÖØŌŎŐ': 'O',
  'òóôõöøōŏő': 'o',
  'ŔŖŘ': 'R',
  'ŕŗř': 'r',
  'ŚŜŞŠ': 'S',
  'śŝşšſ': 's',
  'ŢŤŦ': 'T',
  'ţťŧ': 't',
  'ÙÚÛÜŨŪŬŮŰŲ': 'U',
  'ùúûüũūŭůűų': 'u',
  'Ŵ': 'W',
  'ŵ': 'w',
  'ÝŶŸ': 'Y',
  'ýÿŷ': 'y',
  'ŹŻŽ': 'Z',
  'źżž': 'z',
  'Æ': 'Ae',
  'æ': 'ae',
  'Þ': 'Th',
  'þ': 'th',
  'ß': 'ss',
  'Ĳ': 'IJ',
  'ĳ': 'ij',
  'Œ': 'Oe',
  'œ': 'oe',
  'ŉ': "'n",
};

/// (Private) Built once from [_deburredGroups], so each call is a plain lookup.
final Map<int, String> _deburredLetters = () {
  final Map<int, String> letters = {};

  _deburredGroups.forEach((String chars, String replacement) {
    for (final int rune in chars.runes) {
      letters[rune] = replacement;
    }
  });

  return letters;
}();

/// (Private) Combining diacritical marks, combining marks for symbols and combining half
/// marks. These carry the accent of a decomposed character, so dropping them handles input
/// that was not written with a precomposed letter.
bool _isCombiningMark(int code) =>
    (code >= 0x0300 && code <= 0x036f) ||
    (code >= 0x20d0 && code <= 0x20f0) ||
    (code >= 0xfe20 && code <= 0xfe2f);

/// Replaces accented Latin letters with their unaccented equivalents, so `déjà vu` becomes `deja vu`.
/// Letters that have no single-letter equivalent are spelled out (`Æ` becomes `Ae`, `ß` becomes `ss`, `Þ` becomes `Th`).
/// Combining marks are removed as well, so text written in a decomposed form is handled too.
/// The mapping covers the Latin-1 Supplement and Latin Extended-A blocks; anything else is returned as it is.
String deburr(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  final StringBuffer result = StringBuffer();

  // Walk code points, not UTF-16 units, so a surrogate pair is never cut in half.
  for (final int rune in str.runes) {
    if (_isCombiningMark(rune)) {
      continue;
    }

    result.write(_deburredLetters[rune] ?? String.fromCharCode(rune));
  }

  return result.toString();
}

/// (Private) Compiled once. The set is the union of the characters that are special
/// *outside* a character class in JavaScript, Dart and Python.
final RegExp _regExpSpecialCharacters = RegExp(r'[\\^$.*+?()\[\]{}|]');

/// Escapes every regular expression metacharacter in the given string, so the value can be dropped into a pattern and matched literally.
/// The escaped set is `^ $ . * + ? ( ) [ ] { } |` and `\`, the union of what JavaScript, Dart and Python all read as syntax outside a character class.
/// `-` and `#` are left alone: they are special only inside a character class or in Python's verbose mode.
String escapeRegExp(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  return str.replaceAllMapped(_regExpSpecialCharacters, (m) => '\\${m[0]}');
}

/// (Private) Uppercases the first character of a word and lowercases the rest, so `XML`
/// becomes `Xml`.
///
/// The word is split by code point rather than indexed, because indexing a Dart string
/// walks UTF-16 units and would cut a surrogate pair in half, disagreeing with the
/// JavaScript and Python implementations. This is not the same as the public
/// [capitalizeFirst], which leaves the rest of the string alone.
String _capitalizeWord(String word) {
  if (word.isEmpty) {
    return '';
  }

  final List<String> chars =
      word.runes.map((int rune) => String.fromCharCode(rune)).toList();

  return chars[0].toUpperCase() + chars.sublist(1).join().toLowerCase();
}

/// Converts a string to `camelCase`: the first word is lowercased and every word after it gets an uppercase first letter, with all separators removed.
/// The string is split with [words], so spaces, punctuation, `-` and `_` all act as delimiters, an acronym stays whole (`XMLHttpRequest` becomes `xmlHttpRequest`) and a run of digits is its own word (`abc12def` becomes `abc12Def`).
/// Scripts without upper and lower case are passed through unchanged.
String strToCamelCase(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  final List<String> list = words(str);
  final StringBuffer result = StringBuffer();

  for (int i = 0; i < list.length; i++) {
    result.write(i == 0 ? list[i].toLowerCase() : _capitalizeWord(list[i]));
  }

  return result.toString();
}

/// Converts a string to `snake_case`: every word is lowercased and joined with an underscore.
/// The string is split with [words], so spaces, punctuation, `-` and `_` all act as delimiters, an acronym is separated from the word after it (`XMLHttpRequest` becomes `xml_http_request`) and a run of digits is its own word (`abc12def` becomes `abc_12_def`).
String strToSnakeCase(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  return words(str).map((String word) => word.toLowerCase()).join('_');
}

/// Converts a string to `kebab-case`: every word is lowercased and joined with a hyphen.
/// The string is split with [words], so spaces, punctuation, `-` and `_` all act as delimiters, an acronym is separated from the word after it (`XMLHttpRequest` becomes `xml-http-request`) and a run of digits is its own word (`abc12def` becomes `abc-12-def`).
/// This is a general-purpose case conversion. For a URL-friendly slug use [getSlug] instead, which also strips accents and non-Latin characters.
String strToKebabCase(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  return words(str).map((String word) => word.toLowerCase()).join('-');
}

/// Converts a string to `PascalCase`: every word gets an uppercase first letter and a lowercase rest, with all separators removed.
/// The string is split with [words], so an acronym is separated from the word after it (`XMLHttpRequest` becomes `XmlHttpRequest`) and a run of digits is its own word (`abc12def` becomes `Abc12Def`).
/// This is [strToCamelCase] with the first word capitalized as well, and it is not [capitalizeEachWord], which keeps the original separators.
String strToPascalCase(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  return words(str).map(_capitalizeWord).join();
}

/// Converts a string to `CONSTANT_CASE`: every word is uppercased and joined with an underscore.
/// The string is split with [words], so an acronym is separated from the word after it (`XMLHttpRequest` becomes `XML_HTTP_REQUEST`) and a run of digits is its own word (`abc12def` becomes `ABC_12_DEF`).
/// Dart applies the simple Unicode case mapping where JavaScript and Python apply the full one, so `straße` becomes `STRAßE` here and `STRASSE` there. Matching them would need a copy of the Unicode special-casing table, so the difference is documented instead.
String strToConstantCase(String? str) {
  if (str == null || str.isEmpty) {
    return '';
  }

  return words(str).map((String word) => word.toUpperCase()).join('_');
}

/// (Private) Repeats the padding characters and cuts them off at [count], so a
/// multi-character `char` is used whole where it fits and truncated where it does not.
String _buildPad(String char, int count) {
  if (count <= 0) {
    return '';
  }

  final List<String> chars =
      char.runes.map((int rune) => String.fromCharCode(rune)).toList();
  final StringBuffer result = StringBuffer();

  for (int i = 0; i < count; i++) {
    result.write(chars[i % chars.length]);
  }

  return result.toString();
}

/// Pads a string until it reaches the given length. One function covers all three directions through the [position] option, so it replaces Lodash's `pad`, `padStart` and `padEnd`.
/// Padding is added on both sides by default. When the two sides cannot be equal the extra character goes to the end, so `pad('abc', 8)` returns `'  abc   '`.
/// A [char] longer than one character is repeated and cut off where it no longer fits: `pad('abc', 8, char: '_-')` returns `'_-abc_-_'`.
/// The string is returned untouched when it is already at least [length] long, and when [char] is empty. Length is counted in code points, so a character outside the Basic Multilingual Plane counts as one in every language.
String pad(String? str, int length,
    {String? position = 'both', String? char = ' '}) {
  final String text = str ?? '';
  final String padChar = char ?? ' ';
  // Counted in code points. A Dart string is indexed in UTF-16 units, so an emoji would
  // count as two here and as one in Python, and the result would differ per language.
  final int textLength = text.runes.length;

  if (textLength >= length || padChar.isEmpty) {
    return text;
  }

  final int total = length - textLength;
  int startLength = total ~/ 2;

  if (position == 'start') {
    startLength = total;
  } else if (position == 'end') {
    startLength = 0;
  }

  return _buildPad(padChar, startLength) +
      text +
      _buildPad(padChar, total - startLength);
}

/// Replace [maskCount] letters of [str] with [maskChar], picked at random.
/// Only letters are masked, so punctuation and spaces keep the shape of the
/// text. Nothing is masked past the end of the string.
String strMaskRandom(String? str, int maskCount, {String maskChar = '*'}) {
  if (str == null || str.isEmpty) {
    return '';
  }

  final RegExp maskable = RegExp(r'[a-zA-Z가-힣]');
  final int totalLength = str.length;

  String current = str;
  int hidden = 0;
  int checked = 0;

  while (hidden < maskCount && checked < totalLength) {
    final int index = numRandom(0, totalLength - 1);

    if (maskable.hasMatch(current.substring(index, index + 1))) {
      current =
          current.substring(0, index) + maskChar + current.substring(index + 1);
      hidden += 1;
    }

    checked += 1;
  }

  return current;
}

/// Collect the keys a template holds between [groupStart] and [groupEnd], such
/// as the `name` in `Hello {name}`. A pair that is escaped with a backslash is
/// skipped, and so is a doubled delimiter, which is how a template writes the
/// delimiter itself.
///
/// A key may hold letters, digits, `_`, `$` and `-`; anything else is passed
/// over unless [allowAnyKey] is set.
List<String> getPlaceholderKeys(String? str, String groupStart, String groupEnd,
    {bool allowAnyKey = false}) {
  if (str == null || str.isEmpty) {
    return <String>[];
  }

  if (groupStart.isEmpty || groupEnd.isEmpty) {
    throw ArgumentError('`groupStart` and `groupEnd` must be non-empty.');
  }

  if (groupStart == groupEnd) {
    throw ArgumentError('`groupStart` and `groupEnd` must be different.');
  }

  if (groupStart.length == 1 && groupEnd.length != 1) {
    throw ArgumentError('When `groupStart` is a single character, '
        '`groupEnd` must also be a single character.');
  }

  if (groupEnd.length == 1 && groupStart.length != 1) {
    throw ArgumentError('When `groupEnd` is a single character, '
        '`groupStart` must also be a single character.');
  }

  final List<String> found = <String>[];
  final int length = str.length;
  final int startLength = groupStart.length;
  final int endLength = groupEnd.length;
  final bool single = startLength == 1 && endLength == 1;
  final RegExp validKey = RegExp(r'^[A-Za-z0-9_$-]*$');

  bool escapedAt(int index) {
    int slashes = 0;

    for (int at = index - 1; at >= 0 && str[at] == r'\'; at -= 1) {
      slashes += 1;
    }

    return slashes.isOdd;
  }

  bool delimiterAt(int index, String delimiter) {
    final int width = delimiter.length;

    if (index < 0 || index + width > length) {
      return false;
    }

    if (str.substring(index, index + width) != delimiter || escapedAt(index)) {
      return false;
    }

    // A doubled delimiter is the template writing the delimiter itself.
    if (single) {
      if (index > 0 && str[index - 1] == delimiter) {
        return false;
      }

      if (index + 1 < length && str[index + 1] == delimiter) {
        return false;
      }
    }

    return true;
  }

  bool keyIsValid(String key) {
    if (key.contains('\n') || key.contains('\r')) {
      return false;
    }

    if (key.contains(groupStart) || key.contains(groupEnd)) {
      return false;
    }

    return allowAnyKey || validKey.hasMatch(key);
  }

  for (int index = 0; index <= length - startLength; index += 1) {
    if (!delimiterAt(index, groupStart)) {
      continue;
    }

    final int begin = index + startLength;
    int endAt = -1;

    for (int at = begin; at <= length - endLength; at += 1) {
      if (delimiterAt(at, groupEnd)) {
        endAt = at;
        break;
      }
    }

    if (endAt == -1) {
      continue;
    }

    final String key = str.substring(begin, endAt);

    if (keyIsValid(key)) {
      found.add(key);
    }

    index = endAt + endLength - 1;
  }

  return found;
}

/// One language found by [detectLanguages].
class DetectedLanguage {
  /// The ISO 639-1 code of the language, such as `en` or `ko`.
  final String language;

  /// The share of the counted letters that are written in [language], above 0 and up to 1.
  final double ratio;

  const DetectedLanguage({required this.language, required this.ratio});
}

/// (Private) A script several languages share is named by its group, and the language is
/// decided from the words written in it. Han is shared by Chinese, Japanese and Korean, and
/// kana is Japanese.
const String _latinScript = 'latin';
const String _cyrillicScript = 'cyrillic';
const String _arabicScript = 'arabic';
const String _hanScript = 'han';
const String _kanaScript = 'kana';

/// (Private) Code point ranges of the scripts [detectLanguages] knows, as (first, last,
/// script), sorted by the first code point. A script only one language writes names that
/// language. Characters in a range that are not letters, such as digits and punctuation, are
/// skipped by the caller.
///
/// Each language of a shared script is (code, words, letters, shapes): its ISO 639-1 code, its
/// most common words, the letters it writes that only some of the languages of its script do,
/// and the shapes its words take. A shape written `-x` is an ending, `x-` a beginning and `x` a
/// sequence anywhere in the word. Words and shapes are separated by spaces, and the order of a
/// list is the order a tie is settled in.
const List<(int, int, String)> _languageRanges = [
  (0x0041, 0x005a, _latinScript),
  (0x0061, 0x007a, _latinScript),
  (0x00c0, 0x02af, _latinScript),
  (0x0370, 0x03ff, 'el'),
  (0x0400, 0x052f, _cyrillicScript),
  (0x0530, 0x058f, 'hy'),
  (0x0590, 0x05ff, 'he'),
  (0x0600, 0x06ff, _arabicScript),
  (0x0750, 0x077f, _arabicScript),
  (0x0870, 0x08ff, _arabicScript),
  (0x0900, 0x097f, 'hi'),
  (0x0980, 0x09ff, 'bn'),
  (0x0a00, 0x0a7f, 'pa'),
  (0x0a80, 0x0aff, 'gu'),
  (0x0b00, 0x0b7f, 'or'),
  (0x0b80, 0x0bff, 'ta'),
  (0x0c00, 0x0c7f, 'te'),
  (0x0c80, 0x0cff, 'kn'),
  (0x0d00, 0x0d7f, 'ml'),
  (0x0d80, 0x0dff, 'si'),
  (0x0e00, 0x0e7f, 'th'),
  (0x0e80, 0x0eff, 'lo'),
  (0x0f00, 0x0fff, 'bo'),
  (0x1000, 0x109f, 'my'),
  (0x10a0, 0x10ff, 'ka'),
  (0x1100, 0x11ff, 'ko'),
  (0x1200, 0x139f, 'am'),
  (0x1780, 0x17ff, 'km'),
  (0x1800, 0x18af, 'mn'),
  (0x1c80, 0x1c8f, _cyrillicScript),
  (0x1c90, 0x1cbf, 'ka'),
  (0x1e00, 0x1eff, _latinScript),
  (0x1f00, 0x1fff, 'el'),
  (0x2c60, 0x2c7f, _latinScript),
  (0x2d00, 0x2d2f, 'ka'),
  (0x2d80, 0x2ddf, 'am'),
  (0x3005, 0x3005, _hanScript),
  (0x3040, 0x30ff, _kanaScript),
  (0x3100, 0x312f, 'zh'),
  (0x3130, 0x318f, 'ko'),
  (0x31a0, 0x31bf, 'zh'),
  (0x31f0, 0x31ff, _kanaScript),
  (0x3400, 0x4dbf, _hanScript),
  (0x4e00, 0x9fff, _hanScript),
  (0xa640, 0xa69f, _cyrillicScript),
  (0xa720, 0xa7ff, _latinScript),
  (0xa8e0, 0xa8ff, 'hi'),
  (0xa960, 0xa97f, 'ko'),
  (0xa9e0, 0xa9ff, 'my'),
  (0xaa60, 0xaa7f, 'my'),
  (0xac00, 0xd7ff, 'ko'),
  (0xf900, 0xfaff, _hanScript),
  (0xfb00, 0xfb06, _latinScript),
  (0xfb13, 0xfb17, 'hy'),
  (0xfb1d, 0xfb4f, 'he'),
  (0xfb50, 0xfdff, _arabicScript),
  (0xfe70, 0xfeff, _arabicScript),
  (0xff21, 0xff3a, _latinScript),
  (0xff41, 0xff5a, _latinScript),
  (0xff66, 0xff9f, _kanaScript),
  (0xffa0, 0xffdc, 'ko'),
  (0x1b000, 0x1b16f, _kanaScript),
  (0x20000, 0x323af, _hanScript),
];

const List<(String, String, String, String)> _latinLanguages = [
  (
    'en',
    'a about after again all also always an and any are aren as at be '
        'because been but by can come could couldn did didn do does doesn don '
        'for from get go going good got had has have he hello her here him his '
        'how i if in into is isn it its just know like ll make me more my '
        'never no not nothing now of on only or other our out over people '
        'please really see she so some something sorry still take than thank '
        'thanks that the their them then there these they think this time to '
        'today tomorrow up very want was wasn we well were what when which who '
        'will with would wouldn yes yesterday you your',
    '',
    'th wh sh ght ough tch -ing -ed -ly -ness -ful -ious -ity -tion -ment',
  ),
  (
    'es',
    'a ahora al algo aquí ayer bien buena buenas bueno buenos como con '
        'cosa cuando de del donde día días el ella ellos en entre era es esa '
        'ese eso esta estaba este esto está favor fue gracias había hace hay '
        'hola hoy la las le les lo los mañana me mi mucha muchas mucho muy más '
        'nada no nos nunca o para pero por porque puede puedo que quiero qué '
        'se ser si siempre sin sobre son su sus sé sí también te tengo tiene '
        'todo tu un una uno vamos voy y ya yo',
    'áéíñóúü',
    'll- -ción -ciones -idad -iendo -aban -ado -ada -ados -adas -mente',
  ),
  (
    'fr',
    'a ai allons alors au aujourd aussi aux avec avez avons beaucoup bien '
        'bon bonjour bonne bonsoir c ce cela ces cette chose comme d dans de '
        'demain des donc du elle elles en encore est et fais fait ici il ils j '
        'jamais je l la le les leur lui maintenant mais me merci moi même n ne '
        'non nous on ont ou oui où par parce pas peux plus pour pourquoi qu '
        'quand que qui quoi rien sa sais salut sans se ses sommes son sont '
        'suis sur toujours trop très tu un une vais veux vous y à était été '
        'êtes être',
    'àâæçèéêëîïôùûüÿœ',
    'eau -eux -euse -aient -ait -oir -eur -ment -tion -ique -aux',
  ),
  (
    'de',
    'alles als am an auch auf aus bei bin bis bist bitte da danke dann das '
        'dass dem den denn der des die dir doch du ein eine einem einen einer '
        'er es etwas für geht gerne gestern gibt gut guten habe hallo hast hat '
        'heute hier ich ihr im immer in ist ja jetzt kann kein keine macht mal '
        'man mein meine mich mir mit morgen möchte nach nein nicht nichts nie '
        'noch nur oder sehr sich sie sind so um und uns viel viele von wann '
        'war warum was weil weiß werden wie wieder will wir wird wurde zu zum '
        'zur über',
    'ßäöü',
    'sch tz pf cht -ung -ungen -lich -keit -heit -chen -isch -ieren -tion',
  ),
  (
    'pt',
    'a agora ainda amanhã antes ao aos aqui as até bem bom coisa com como '
        'da das de depois dia do dos e ela ele em então essa esse está eu '
        'favor faz foi hoje isso já mais mas me muita muito muitos na nada nas '
        'no nos nunca não o obrigada obrigado oi olá ontem os ou para pela '
        'pelo pode por porque posso quando que quero se sei sem sempre ser seu '
        'sim sua são também tchau tem tenho tudo um uma vamos você vou é',
    'àáâãçéêíóôõú',
    'lh nh -dade -dades -inho -inha -agem -ado -ada -ados -adas -mente',
  ),
  (
    'it',
    'a abbiamo adesso ai al alla allora anche ancora andiamo bene buona '
        'buongiorno buono c che ci ciao come con cosa da dal dei del della '
        'delle di domani dopo dove e faccio fare gli grazie ha hai ho i ieri '
        'il in io l la le lei lo loro lui ma mai mi molto ne nel nella niente '
        'non oggi ora per perché più posso prego prima può qualcosa quando '
        'quella quello questa questo qui sai scusa se sempre si siamo siete so '
        'sono stata stato su sua suo sì tanto troppo tutti tutto un una uno va '
        'vado voglio è',
    'àèéìíîòóùú',
    'gli zz cch -zione -zioni -ità -etto -etta -iamo -ggio -mente',
  ),
  (
    'ca',
    'a abans adéu ahir així al alguna als amb anar anem aquest aquesta '
        'aquí ara avui bon bona bé com cosa d de del dels demà després dia '
        'doncs el ella ells els en encara era estic està ets fa fem fer fins '
        'gràcies ha han he hem hi ho hola i ja jo l la les li mai me meu meva '
        'molt nit no nosaltres o on per perquè però plau pot puc quan que què '
        'res saps sempre seu seva si som sou sé sí sóc són també teu teva tinc '
        'tot tothom tots tu un una va vaig vull és',
    'àçèéíïòóúü',
    'tx aix eix ll- -ció -cions -tat -tats -ment',
  ),
  (
    'nl',
    'aan al alles als alstublieft altijd ben bent bij dan dank dat de die '
        'dit door een eens en er ga gaan gaat geen gisteren goed graag had '
        'hallo heb hebben heeft heel hem het hier hij hoe iets ik in is ja je '
        'jullie kan komt maar met mij mijn moet mooi naar nee niet niets nog '
        'nooit nu of om ons onze ook op over straks te toch tot uit van '
        'vandaag veel voor waarom wanneer was wat we weet wel werd wie wij wil '
        'worden wordt zal ze zich zijn zou',
    'éëï',
    'ij oe aa uu sch cht -heid -lijk -lijke -tje -tjes -ing -isch',
  ),
  (
    'sv',
    'aldrig alla allt alltid att av bara blir bra de den det din ditt du '
        'där efter eller en ett finns från för gärna går gör har hej hon hur '
        'här i idag igen igår imorgon ingenting inget inte jag kan kanske '
        'kommer man med men mig min mina mitt morgon mycket måste nej nu när '
        'något och också okej om oss på redan sa ses sig ska skulle som säger '
        'så tack till under upp ut vad var vara varför vem vet vi vid vill vår '
        'är',
    'äåéö',
    'sj -ning -ningen -het -lig -liga -ligt -tion -arna -orna -erna',
  ),
  (
    'da',
    'af aldrig alle allerede alt altid at bare blev bliver da de dem den '
        'der det dig din dit du efter eller en er et for fra gerne god godt '
        'går gør gøre har havde hej hendes hun hvad hvem hvor hvorfor i igen '
        'ikke ingenting jeg kan kommer lidt man med meget men mig min mine mit '
        'morgen måske nej nogen noget nogle nu når næste og også om op os på '
        'sagde senere ses sig siger skal som så sådan tak til ud under var ved '
        'vi vil vores være',
    'åæéø',
    'øj -hed -else -ede -lig -lige -ligt -tion -ning -ningen',
  ),
  (
    'no',
    'aldri alle allerede alltid alt at av bare ble blir da de deg dem den '
        'der det din ditt du eller en er et etter for fra gjerne gjør gjøre '
        'god godt greit går hadde har hei hennes hun hva hvem hvor hvorfor i '
        'igjen ikke ingenting jeg kan kanskje kommer litt man med meg men min '
        'mine mitt morgen mye nei neste noe noen nå når og også om opp oss på '
        'sa seg senere ses sier skal som så sånn takk til under ut var veldig '
        'vet vi vil vår vårt være å',
    'åæéø',
    'sj kj gj øy -sjon -sjonen -het -else -lig -lige -ligt -ning -ningen',
  ),
  (
    'fi',
    'aina ehkä ei eilen en ennen et että haluan hei heidän huomenna hyvin '
        'hyvä hyvää hän hänen ja jo joka joo jos jotain jotka kaikki kanssa '
        'kiitos koska koskaan kuin kuinka kuka kun kyllä meidän menen miksi '
        'mikä minun minä missä mitä mitään moi mutta myös ne niin nyt olemme '
        'olen olet olette oli olla on onko ovat paljon paljonko se sen siitä '
        'sinä sitten tai teidän tiedä tiedän tulee tuo tämä tänään vain vielä '
        'voi voin voit vähän',
    'äåö',
    'aa ää ii uu yy öö -aa -uu -yy -inen -ssä -stä -llä -ksi -kin',
  ),
  (
    'pl',
    'a ale bardzo bez być był była było chcę coś cześć czy dla dlaczego do '
        'dobra dobry dobrze dzisiaj dziękuję dziś gdy gdzie go i ich idziemy '
        'idę ile ja jak jego jej jest jestem jesteś jesteśmy jeszcze jutro już '
        'kiedy kto która które który ma mam mamy masz mi mnie mogę moja moje '
        'może mój na nasz nic nie nigdy o od oraz po potem proszę przed przez '
        'się są ta tak te ten teraz też to tu twój tylko w wczoraj we wiem '
        'wszystko z za zawsze że',
    'óąćęłńśźż',
    'sz cz rz dz naj- -ych -ego -ami -ów -ość -ać -ić',
  ),
  (
    'cs',
    'a ahoj ale ani ano asi bez by byl byla bylo být chci co dnes do dobrý '
        'dobře děkuji dělám i jak jako jde jdeme jdu je jeho jen již jsem jsi '
        'jsme jsou jste já k kde kdo kdy když kolik která které který mezi mi '
        'moje má mám máme máš mě můj může můžu na naše ne nebo není nevím nic '
        'nikdy náš něco o od pak po potom pro prosím protože proč před při s '
        'se si tady tak taky také tato ten teď to toto u už v ve vím včera '
        'všechno vždy z za zítra že',
    'áéíóúýčďěňřšťůž',
    'nej- -ení -ovat -ost -uji -ého -ých',
  ),
  (
    'sk',
    'a ahoj aj ako ale alebo ani bez bol bola bolo by byť chcem dnes do '
        'dobre dobrý ešte ho i ich ide idem ideme ja je jeho jej k kde kedy '
        'keď koľko kto ktorá ktoré ktorý lebo len medzi mi moja moje má mám '
        'máme máš môj môže môžem na naša neviem nie niečo nikdy nič náš o od '
        'po potom pre pred prečo pri prosím robím sa si sme som ste sú tak tam '
        'ten tento teraz tiež to toto tu táto už v veľmi viem vo včera všetko '
        'vždy z za zajtra áno čo ďakujem že',
    'áäéíóôúýčďĺľňŕšťž',
    'dz naj- -enie -ovať -osť -ť -ujem -ov -ého -ých',
  ),
  (
    'hr',
    'a ako ali bez bi bila bilo bio biti bok da danas do dobar dobro gde '
        'gdje hoću hvala i idem idemo ili ima imam imaš iz ja je jer jesam '
        'jesi još jutro jučer kad kada kako kao koja koje koji koliko mogu moj '
        'moja moje molim može na naš naša ne nema nešto nije nikad nikada '
        'ništa o od ona oni ova ovde ovdje ovo pa posle poslije pre pred prije '
        'radim sa sad sada sam samo se si smo ste su sutra sve svi ta taj '
        'također tko to treba tvoj u uvek uvijek već za zašto zbog zdravo znam '
        'šta što želim',
    'ćčđšž',
    'lj nj ije dž naj- -nje -ija -ost -ujem',
  ),
  (
    'ro',
    'a aceasta această acest acesta acum ai aici al ale am are astăzi au '
        'avem azi bine bun bună ca care ce cea cel ceva cine cu când că da '
        'dacă dar de din după e ea ei el este eu eşti ești fac fi foarte fost '
        'fără ieri la le lui mai mea mereu merg mergem meu mulţumesc mulțumesc '
        'mâine ne niciodată nimic noastră nostru nu o pe pentru poate pot prin '
        'salut sau se spune sunt suntem să tot totul tău un una unde unei unui '
        'va vreau în înainte încă şi ştiu și știu',
    'âîăşţșț',
    '-ul -ului -ilor -ii',
  ),
  (
    'hu',
    'a ahol akarok aki akkor ami amit az be csak de egy el előtt este ez '
        'ezen ezt fel ha hogy hol holnap igen is itt jó jól kell ki köszi '
        'köszönöm lehet lesz ma majd meg megyek megyünk mert mi mikor minden '
        'mindig mint mit miért mondja most már még nagyon nekem neki nem nincs '
        'nélkül ott pedig reggel sem semmi soha szeretnék szia tegnap tudok '
        'tudom után vagy vagyok vagyunk valami van vannak volt voltak én ő ők',
    'áéíóöúüőű',
    'sz zs gy cs -ság -ség -ban -nak -nek -unk -ünk',
  ),
  (
    'tr',
    'ama ben benim bir biz bizim bu bugün bunu burada da daha de değil '
        'diye dün en evet gibi güzel hayır her hiç ile ise iyi için kadar ki '
        'kim lütfen merhaba mi mu mü mı nasıl ne nerede o olan olarak olduğu '
        'onu sağol sen senin siz sonra tamam teşekkür teşekkürler var ve veya '
        'ya yarın yok zaman çok çünkü önce şey şimdi şu',
    'âçîöûüğış',
    'iyor ıyor uyor üyor -mak -mek -lik',
  ),
  (
    'vi',
    'anh biết bạn cho chào chúng các cái còn có cũng cảm của dạ em gì hay '
        'hôm hơn khi không là làm lại lắm muốn mình một nay ngày người nhé '
        'nhưng những nào này nó nói nữa quá ra rất rồi sao sẽ ta thì thích '
        'trong tôi tốt từ và vâng về với xin đi đâu đây đã đó được để ơn ạ ở',
    'àáâãèéêìíòóôõùúýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ',
    'ngh -nh',
  ),
  (
    'id',
    'ada adalah akan aku apa atau bagaimana bagus bahwa baik banyak baru '
        'belum besok bilang bisa dalam dan dapat dari dengan di dia dimana '
        'dulu halo hanya hari harus ingin ini itu jadi jika juga kalau kami '
        'kamu kapan karena kasih ke kemarin kenapa kita lagi lebih maaf makan '
        'malam mana masih mau mengapa mereka nanti nggak oleh pada pagi pergi '
        'punya saja sama sana sangat saya sebagai sebelum sedang sejak sekali '
        'sekarang selalu selamat semua seperti sesuatu setelah siapa sini '
        'sudah tak tapi telah terima tersebut tidak tolong untuk ya yang',
    '',
    'meng- meny- peng- pem- -kan -nya',
  ),
];

const List<(String, String, String, String)> _cyrillicLanguages = [
  (
    'ru',
    'а без будет бы был была были было в вам вас все всегда всё вчера вы '
        'где да для до его если есть ещё её же за завтра здесь знаю и иду из '
        'или им их к как когда кто ли мне могу может мой моя мы на надо наш не '
        'нет никогда ничего но нужно о он она они от очень перед по пожалуйста '
        'после потом потому почему при привет с сегодня сейчас сколько спасибо '
        'так также твой то тоже только ты у уже хорошо хочу что чтобы это я',
    'ъыэё',
    '',
  ),
  (
    'uk',
    'або але без був будь була були було бути в вже ви вона вони все вчора '
        'від він де для до добре дуже дякую же з за завжди завтра зараз знаю й '
        'йду йому коли ласка ми може можу моя мій на наш не ну ні ніколи '
        'нічого перед по потрібно потім привіт про після скільки сьогодні та '
        'так також твій те теж ти то тому треба тут у хочу хто це цей чому ще '
        'що щоб щось я як які є і із їх її',
    'єіїґ',
    '-ння',
  ),
  (
    'bg',
    'аз ако бе без беше бил била било благодаря в вече винаги все всички '
        'всичко вчера да днес до добре е за защо защото здравей знам и или им '
        'има искам казва как като кога когато което които кой който колко '
        'която къде ли ме ми много мога може мой моля моя на наш нашия не нещо '
        'никога нищо но няма от отивам още по после правя преди при с са се '
        'сега си след сме със също та така твой те ти то това този той трябва '
        'тук тя утре че ще',
    'ъ',
    '-ът -ата -ото -ята',
  ),
  (
    'sr',
    'а ако без била било био важи већ ви га где да данас до добро желим за '
        'зато зашто здраво знам и идем из или им има ка кад када каже као ко '
        'колико ли ми могу може молим мој моја на наш не него нема нешто никад '
        'ништа овде од он она они по после пре радим са сада све сви се си смо '
        'су сутра та тако такође твој ти то треба у увек хвала хоћу што ја је '
        'још јуче ће',
    'ђјљњћџ',
    '',
  ),
];

const List<(String, String, String, String)> _arabicLanguages = [
  (
    'ar',
    'أريد أعرف أمس أن أنا أنت أو أين إلى إن الآن التي الذي الذين اليوم بعد '
        'بين ثم جدا جيد حتى دائما ذلك شكرا على عن عند غدا غير فضلك في قبل قد '
        'كان كانت كل كيف لا لم لماذا لن ما ماذا متى مرحبا مع من نحن نعم هذا '
        'هذه هل هم هنا هو هي و يمكن',
    'أإةكىي',
    'ال-',
  ),
  (
    'fa',
    'آن آنها است الان اما امروز او اگر این اینجا با باید بر برای بله به '
        'بود تا تو خوب خود خیلی دارم در دیروز را سلام شد شده شما فردا لطفا ما '
        'ممنون من می نه نیست ها هر هست هم همه همیشه هیچ و چرا چطور چه چیزی کجا '
        'کرد کند که یا یعنی یک',
    'پچژکگی',
    '',
  ),
  (
    'ur',
    'آج آپ اب ابھی اس ان اور اپنے اچھا ایک بعد بھی بہت تو تھا تھی تھے جب '
        'جو جی سب سلام سے شکریہ لیے میرا میری میں نہیں نے وہ پر پہلے کا کب '
        'کبھی کر کو کون کچھ کہ کہاں کی کیا کیوں کے گیا ہاں ہم ہمارا ہمیشہ ہو '
        'ہیں ہے یہ یہاں',
    'ٹپچڈڑژکگںھہیے',
    '',
  ),
];

/// (Private) Where a sentence ends. Each sentence is judged on its own, so one text can hold
/// several languages of the same script.
final Set<String> _sentenceTerminators = {
  for (final int rune in '.!?\n\r…。！．？｡؟۔'.runes) String.fromCharCode(rune)
};

/// (Private) The score a sentence needs before its own words decide its language. One word
/// shared by several languages, such as `a` or `die`, is not enough to move a sentence out of
/// the language the rest of the text is in.
const int _minLanguageScore = 2;

/// (Private) The languages of a shared script, read into lookups.
class _LanguageTable {
  final List<String> codes;
  final List<Set<String>> words;
  final List<Set<String>> letters;

  /// Every letter any language of the script marks.
  final Set<String> marked;

  /// Each shape, without its `-`, and the indexes of the languages it belongs to.
  final Map<String, List<int>> endings;
  final Map<String, List<int>> beginnings;
  final Map<String, List<int>> sequences;
  final int longest;

  const _LanguageTable({
    required this.codes,
    required this.words,
    required this.letters,
    required this.marked,
    required this.endings,
    required this.beginnings,
    required this.sequences,
    required this.longest,
  });
}

Set<String> _charactersOf(String text) =>
    {for (final int rune in text.runes) String.fromCharCode(rune)};

_LanguageTable _readLanguageTable(
    List<(String, String, String, String)> languages) {
  final Map<String, List<int>> endings = {};
  final Map<String, List<int>> beginnings = {};
  final Map<String, List<int>> sequences = {};
  int longest = 0;

  for (int index = 0; index < languages.length; index += 1) {
    for (final String shape in languages[index].$4.split(' ')) {
      if (shape.isEmpty) {
        continue;
      }

      Map<String, List<int>> target = sequences;
      String text = shape;

      if (shape.startsWith('-')) {
        target = endings;
        text = shape.substring(1);
      } else if (shape.endsWith('-')) {
        target = beginnings;
        text = shape.substring(0, shape.length - 1);
      }

      target.putIfAbsent(text, () => []).add(index);

      if (text.length > longest) {
        longest = text.length;
      }
    }
  }

  return _LanguageTable(
    codes: [
      for (final (String, String, String, String) language in languages)
        language.$1
    ],
    words: [
      for (final (String, String, String, String) language in languages)
        language.$2.split(' ').toSet()
    ],
    letters: [
      for (final (String, String, String, String) language in languages)
        _charactersOf(language.$3)
    ],
    marked: {
      for (final (String, String, String, String) language in languages)
        ..._charactersOf(language.$3)
    },
    endings: endings,
    beginnings: beginnings,
    sequences: sequences,
    longest: longest,
  );
}

/// (Private) Reading the lists into lookups is only worth doing once, and only for callers
/// that actually reach [detectLanguages]. A top-level `final` is initialized on first use, so
/// it is built then and reused.
final Map<String, _LanguageTable> _languageTables = {
  _latinScript: _readLanguageTable(_latinLanguages),
  _cyrillicScript: _readLanguageTable(_cyrillicLanguages),
  _arabicScript: _readLanguageTable(_arabicLanguages),
};

/// (Private) The script a code point belongs to, or `null` when no range holds it.
String? _scriptOf(int code) {
  int low = 0;
  int high = _languageRanges.length - 1;

  while (low <= high) {
    final int middle = (low + high) >> 1;
    final (int, int, String) range = _languageRanges[middle];

    if (code < range.$1) {
      high = middle - 1;
    } else if (code > range.$2) {
      low = middle + 1;
    } else {
      return range.$3;
    }
  }

  return null;
}

bool _isLanguageLetter(int rune, String char) {
  if (rune < 0x80) {
    return (rune >= 0x41 && rune <= 0x5a) || (rune >= 0x61 && rune <= 0x7a);
  }

  return _isLetter(char);
}

/// (Private) `İ` is the one letter whose lowercase is two characters, an `i` and a combining
/// dot, and the packages do not all produce it, so it is mapped here.
String _toLanguageLower(String char) => char == 'İ' ? 'i' : char.toLowerCase();

/// (Private) The languages whose word shapes [word] has. An ending or a beginning has to be
/// shorter than the word, so a word is never only its own ending. Every letter of a shared
/// script is in the Basic Multilingual Plane, so slicing by UTF-16 unit here slices by
/// character, as Python does.
Set<int> _shapesOf(_LanguageTable table, String word) {
  final Set<int> found = {};
  final int length = word.length;
  final int affixLast = table.longest < length - 1 ? table.longest : length - 1;

  for (int size = 1; size <= affixLast; size += 1) {
    found.addAll(table.endings[word.substring(length - size)] ?? const []);
    found.addAll(table.beginnings[word.substring(0, size)] ?? const []);
  }

  for (int start = 0; start < length; start += 1) {
    final int sequenceLast =
        table.longest < length - start ? table.longest : length - start;

    for (int size = 1; size <= sequenceLast; size += 1) {
      found.addAll(
          table.sequences[word.substring(start, start + size)] ?? const []);
    }
  }

  return found;
}

/// (Private) Adds what [word] says about each language of its script to [scores].
void _scoreLanguageWord(_LanguageTable table, String word, List<int> scores) {
  final Set<String> letters = {
    for (final String char in _charactersOf(word))
      if (table.marked.contains(char)) char
  };
  final Set<int> shapes = _shapesOf(table, word);

  for (int i = 0; i < table.codes.length; i += 1) {
    if (table.words[i].contains(word)) {
      scores[i] += 1;
    }

    // A word written with letters only some of the languages use counts for each of them
    // that has every one of those letters.
    if (letters.isNotEmpty && table.letters[i].containsAll(letters)) {
      scores[i] += 1;
    }

    if (shapes.contains(i)) {
      scores[i] += 1;
    }
  }
}

/// (Private) The language of a sentence its own words could not decide.
///
/// A sentence that ties at the minimum score or above stays with the languages it tied
/// between. A weaker one takes the language the rest of the text was decided to be in, unless
/// nothing was, in which case its own best score is all there is to go by. Among the
/// candidates, the one with the most letters decided elsewhere wins, and then the one listed
/// first.
String _settleLanguage(
    _LanguageTable table, List<int> scores, Map<String, int> decided) {
  final int top = scores.reduce((int a, int b) => a > b ? a : b);
  final bool anyDecided =
      table.codes.any((String code) => (decided[code] ?? 0) > 0);
  final bool narrow = top >= _minLanguageScore || !anyDecided;
  String best = '';
  int bestCount = -1;

  for (int i = 0; i < table.codes.length; i += 1) {
    if (narrow && scores[i] != top) {
      continue;
    }

    final String code = table.codes[i];
    final int count = decided[code] ?? 0;

    if (count > bestCount) {
      best = code;
      bestCount = count;
    }
  }

  return best;
}

/// Detects the languages a string is written in and returns them from the most used to the least, each with its share of the letters.
/// Languages with a script of their own, such as Korean, Japanese, Thai or Greek, are recognized by their script. Languages that share a script, such as the Latin, Cyrillic and Arabic ones, are told apart sentence by sentence from their most common words, the letters only some of them write and the endings and letter sequences typical of each.
/// Only letters are counted: digits, spaces, punctuation, symbols and emoji are not, and an input without any letter the function knows returns an empty list.
List<DetectedLanguage> detectLanguages(String? str) {
  if (str == null || str.isEmpty) {
    return [];
  }

  // Compose accents first, so that a decomposed `é` (`e` plus U+0301) matches the words.
  final String text = nfc(str);
  final Map<String, int> counts = {};
  final Map<String, int> firsts = {};
  // (group, letters, first index, scores) of the sentences their own words did not decide.
  final List<(String, int, int, List<int>)> pending = [];
  final Map<String, int> sentenceCounts = {};
  final Map<String, int> sentenceFirsts = {};
  final Map<String, List<int>> sentenceScores = {};
  final List<String> word = [];
  String wordGroup = '';
  int index = 0;

  void add(String language, int count, int first) {
    counts[language] = (counts[language] ?? 0) + count;

    final int? known = firsts[language];

    firsts[language] = known == null || first < known ? first : known;
  }

  void endWord() {
    final _LanguageTable? table = _languageTables[wordGroup];

    if (word.isEmpty || table == null) {
      return;
    }

    final List<int> scores = sentenceScores.putIfAbsent(
        wordGroup, () => List<int>.filled(table.codes.length, 0));

    _scoreLanguageWord(table, word.join(), scores);
    word.clear();
  }

  void closeSentence() {
    endWord();

    sentenceCounts.forEach((String key, int count) {
      final int first = sentenceFirsts[key] ?? 0;
      final _LanguageTable? table = _languageTables[key];

      if (key == _hanScript) {
        // Han characters are kanji in a sentence with kana and hanja in a sentence with
        // Hangul. Anywhere else they are read as Chinese.
        if (sentenceCounts.containsKey('ja')) {
          add('ja', count, first);
        } else if (sentenceCounts.containsKey('ko')) {
          add('ko', count, first);
        } else {
          add('zh', count, first);
        }
      } else if (table != null) {
        final List<int> scores =
            sentenceScores[key] ?? List<int>.filled(table.codes.length, 0);
        final int top = scores.reduce((int a, int b) => a > b ? a : b);
        final int winners = scores.where((int score) => score == top).length;

        if (top >= _minLanguageScore && winners == 1) {
          add(table.codes[scores.indexOf(top)], count, first);
        } else {
          pending.add((key, count, first, scores));
        }
      } else {
        add(key, count, first);
      }
    });

    sentenceCounts.clear();
    sentenceFirsts.clear();
    sentenceScores.clear();
  }

  // Walk code points, not UTF-16 units, so a surrogate pair is never cut in half and positions
  // are counted as the JavaScript and Python packages count them.
  for (final int rune in text.runes) {
    final int at = index;
    final String char = String.fromCharCode(rune);

    index += 1;

    if (_sentenceTerminators.contains(char)) {
      closeSentence();
      continue;
    }

    if (!_isLanguageLetter(rune, char)) {
      // A combining mark belongs to the letter in front of it and does not end a word.
      if (!_isMark(char)) {
        endWord();
      }

      continue;
    }

    String? script = _scriptOf(rune);

    if (script == null) {
      endWord();
      continue;
    }

    if (script == _kanaScript) {
      script = 'ja';
    }

    sentenceCounts[script] = (sentenceCounts[script] ?? 0) + 1;
    sentenceFirsts.putIfAbsent(script, () => at);

    if (_languageTables.containsKey(script)) {
      if (script != wordGroup) {
        endWord();
        wordGroup = script;
      }

      word.add(_toLanguageLower(char));
    } else {
      endWord();
    }
  }

  closeSentence();

  // Every undecided sentence is settled against the same counts, the ones the decided
  // sentences produced, so the order they are settled in changes nothing.
  final Map<String, int> decided = Map<String, int>.of(counts);

  for (final (String, int, int, List<int>) sentence in pending) {
    final _LanguageTable? table = _languageTables[sentence.$1];

    if (table != null) {
      add(_settleLanguage(table, sentence.$4, decided), sentence.$2,
          sentence.$3);
    }
  }

  final int total = counts.values.fold(0, (int sum, int count) => sum + count);

  if (total == 0) {
    return [];
  }

  // Every language starts at a different position, so the order is total and the sort being
  // unstable does not matter.
  final List<String> ordered = counts.keys.toList()
    ..sort((String a, String b) {
      final int byCount = (counts[b] ?? 0).compareTo(counts[a] ?? 0);

      return byCount != 0
          ? byCount
          : (firsts[a] ?? 0).compareTo(firsts[b] ?? 0);
    });

  return [
    for (final String language in ordered)
      DetectedLanguage(
          language: language, ratio: (counts[language] ?? 0) / total)
  ];
}
