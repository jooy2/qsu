import 'dart:collection';
import 'dart:math';

import 'package:qsu/qsu.dart';

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
String trim(String str) {
  if (str.isEmpty) {
    return '';
  }

  return str.trim().replaceAll(_repeatedWhitespace, ' ');
}

/// Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.
String removeSpecialChar(String str, {String? exceptionCharacters}) {
  final String exception = exceptionCharacters == null
      ? ''
      : _escapeRegExpInClass(exceptionCharacters);

  return str.replaceAll(
      RegExp(
          '[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f$exception]'),
      '');
}

/// Replaces text within a range starting and ending with a specific character in a given string with another string. For example, given the string `abc<DEF>ghi`, to change `<DEF>` to `def`, use `replaceBetween('abc<DEF>ghi', '<', '>', 'def')`. The result would be `abcdefghi`.
/// Deletes strings in the range if `replaceWith` is not specified.
String replaceBetween(String str, String startChar, String endChar,
    [String replaceWith = '']) {
  if (str.isEmpty) {
    return '';
  }

  // Escape the whole delimiter. Prefixing a single backslash only worked for
  // one-character delimiters and produced an invalid pattern for longer ones.
  return str.replaceAll(
      RegExp(
          '${_escapeRegExpInClass(startChar)}.*?${_escapeRegExpInClass(endChar)}'),
      replaceWith);
}

/// Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.
List<String> split(String str, [List<String>? splitter]) {
  if (str.isEmpty) {
    return [];
  }

  final List<String> splitters =
      (splitter != null && splitter.isNotEmpty) ? splitter : [];

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
String removeNewLine(String str, {String replaceTo = ''}) {
  return str
      .replaceAll(RegExp(r'(\r\n|\n|\r)', multiLine: true), replaceTo)
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

/// Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.
String capitalizeEverySentence(String str, {String? splitChar}) {
  final String splitter = splitChar ?? '.';
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

/// Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.
String capitalizeEachWords(String str, {bool natural = false}) {
  String tempStr = str.trim();

  if (natural == true) {
    tempStr = tempStr.toLowerCase();
  }

  final List<String> splitStr = tempStr.split(' ');

  for (int i = 0, iLen = splitStr.length; i < iLen; i += 1) {
    if (!natural ||
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

/// Truncates a long string to a specified length, optionally appending an ellipsis after the string.
String truncate(String str, int length, {String? ellipsis}) {
  if (str.length > length) {
    return str.substring(0, length) + (ellipsis ?? '');
  }
  return str;
}

/// The string ignores truncation until the ending character (`endStringChar`). If the expected length is reached, return the truncated string until after the ending character.
String truncateExpect(String str, int expectLength, {String? endStringChar}) {
  if (str.isEmpty) {
    return '';
  }

  // Compare and interpolate the resolved value. Using the nullable `endStringChar`
  // here made the check always fail and put the literal text 'null' in the result.
  final String endString = endStringChar ?? '.';
  final bool isEndStringCharLastSentence =
      str.substring(str.length - 1) == endString;
  final List<String> splitStr = str.split(endString);
  final int splitStrLength = splitStr.length;
  String convStr = '';
  int currentLength = 0;

  for (int i = 0; i < splitStrLength; i += 1) {
    if (currentLength < expectLength) {
      convStr +=
          '${splitStr[i]}${i != splitStrLength - 1 || isEndStringCharLastSentence ? endString : ''}';
      currentLength += splitStr[i].length + endString.length;
    } else {
      break;
    }
  }

  return convStr;
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
List<int> strToAscii(String str) {
  List<int> arr = [];

  for (int i = 0; i < str.length; i += 1) {
    arr.add(str.codeUnitAt(i));
  }

  return arr;
}

/// Merges the given list argument (the beginning of the URL), joining it so that the slash (`/`) symbol is correctly included.
String urlJoin(List<String?> args) {
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
int getStrBytes(String? str) {
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
