/// Check whether the given data is of type `Object`.
/// Returns `false` for other data types including `Array`.
bool isObject(dynamic data) {
  return data != null && data is Map;
}

/// It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.
bool isEqual(dynamic leftOperand, [dynamic right1, dynamic right2]) {
  if (right1 == null && right2 == null) {
    return true;
  }

  final List<dynamic> rightOperands;

  if (right2 == null) {
    rightOperands = (right1 is List) ? right1 : [right1];
  } else {
    rightOperands = [right1, right2];
  }

  for (var item in rightOperands) {
    if (leftOperand == item) {
      continue;
    } else if (leftOperand is num && item is String) {
      final parsed = num.tryParse(item);

      if (parsed == null || parsed != leftOperand) {
        return false;
      }
    } else if (leftOperand is String && item is num) {
      final parsed = num.tryParse(leftOperand);

      if (parsed == null || parsed != item) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

/// It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.
/// `isEqual` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.
bool isEqualStrict(dynamic leftOperand, [dynamic right1, dynamic right2]) {
  if (right1 == null && right2 == null) {
    return true;
  }

  final List<dynamic> rightOperands;

  if (right2 == null) {
    rightOperands = (right1 is List) ? right1 : [right1];
  } else {
    rightOperands = [right1, right2];
  }

  for (var item in rightOperands) {
    if (leftOperand == item) {
      continue;
    } else if (leftOperand is num && item is String ||
        leftOperand is String && item is num) {
      return false;
    } else {
      return false;
    }
  }
  return true;
}

/// Returns true if the passed data is empty or has a length of 0.
bool isEmpty(dynamic data) {
  if (data == null) {
    return true;
  }
  if (data is String) {
    return data.isEmpty;
  }
  if (data is List) {
    return data.isEmpty;
  }
  if (data is Map) {
    return data.isEmpty;
  }

  return false;
}

/// Returns `true` if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is `true`, it returns true only for an exact match.
bool contains(dynamic str, dynamic search, {bool exact = false}) {
  if (search.runtimeType == String) {
    return str.length < 1 ? false : str.indexOf(search) != -1;
  }

  for (int i = 0, iLen = search.length; i < iLen; i += 1) {
    if (exact) {
      if (str == search[i]) {
        return true;
      }
    } else if (str.indexOf(search[i]) != -1) {
      return true;
    }
  }

  return false;
}

/// Returns `true` if the given data is in the correct URL format.
/// If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist.
/// If strict is `true`, URLs without commas (`.`) return `false`.
bool isUrl(String url, {bool withProtocol = false, bool strict = false}) {
  if (strict && !url.contains('.')) {
    return false;
  }

  final formattedUrl =
      (withProtocol && !url.contains('://')) ? 'https://$url' : url;

  try {
    final uri = Uri.parse(formattedUrl);

    if (uri.scheme.isEmpty || uri.host.isEmpty) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

/// Returns `true` if the given array is a two-dimensional array.
bool is2dArray(List<dynamic> array) {
  return array.any((element) => element is List);
}

/// Checks if the given argument value is a valid email.
bool isEmail(String email, {bool onlyLowerCase = false}) {
  final String char = onlyLowerCase == true ? 'a-z' : 'a-zA-Z';
  final String pattern = '^[${char}0-9!#\$%&\'*+/=?^_`{|}~-]+'
      '(?:\\.[${char}0-9!#\$%&\'*+/=?^_`{|}~-]+)*'
      '@'
      '(?:[${char}0-9](?:[${char}0-9-]*[${char}0-9])?\\.)+'
      '[${char}0-9](?:[${char}0-9-]*[${char}0-9])?';

  return RegExp(pattern).hasMatch(email);
}

/// Returns `true` if the first argument is in the range of the second argument (`[min, max]`).
/// To allow the minimum and maximum values to be in the range, pass `true` for the third argument.
bool between(List<num> range, num number, {bool inclusive = false}) {
  final minM = range.reduce((a, b) => a < b ? a : b);
  final maxM = range.reduce((a, b) => a > b ? a : b);

  return inclusive
      ? (number >= minM && number <= maxM)
      : (number > minM && number < maxM);
}

/// Returns the length of any type of data. If the argument value is `null` or `undefined`, `0` is returned.
int len(dynamic data) {
  if (data == null) {
    return 0;
  }

  if (data is List) {
    return data.length;
  } else if (data is Map) {
    return data.keys.length;
  } else if (data is num || data is BigInt) {
    return data.toString().length;
  } else if (data is bool) {
    return data ? 4 : 5;
  } else if (data is Function) {
    return data().toString().length;
  } else if (data is String) {
    return data.length;
  } else {
    return 0;
  }
}

/// Returns `true` if the values given in the `conditions` array are true at least `minimumCount` times.
bool isTrueMinimumNumberOfTimes(List<bool> conditions, {int? minimumCount}) {
  final int conditionLength = conditions.length;
  int trueCount = 0;

  for (int i = 0; i < conditionLength; i++) {
    if (conditions[i]) {
      trueCount += 1;
    }
  }

  return trueCount >= (minimumCount ?? 1);
}

// Hangul jamo tables, used to rebuild syllables from decomposed input
// ('ㅁㅓㅇㅊㅓㅇ' -> '멍청').
const String _cho = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const String _jung = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const String _jong = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

const Map<String, String> _jungCompound = {
  'ㅗㅏ': 'ㅘ',
  'ㅗㅐ': 'ㅙ',
  'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ',
  'ㅜㅔ': 'ㅞ',
  'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ'
};

const Map<String, String> _jongCompound = {
  'ㄱㅅ': 'ㄳ',
  'ㄴㅈ': 'ㄵ',
  'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ',
  'ㄹㅁ': 'ㄻ',
  'ㄹㅂ': 'ㄼ',
  'ㄹㅅ': 'ㄽ',
  'ㄹㅌ': 'ㄾ',
  'ㄹㅍ': 'ㄿ',
  'ㄹㅎ': 'ㅀ',
  'ㅂㅅ': 'ㅄ'
};

/// Latin letters borrowed as Hangul vowels for their shape ('ㅂr보' -> '바보').
const Map<String, String> _latinJung = {'r': 'ㅏ', 'i': 'ㅣ'};

// Characters that imitate a letter are folded onto the first character of their
// group, so leetspeak, accents and Cyrillic/Greek homoglyphs all collapse onto
// the same text ('f00l' and 'foo1' both become 'fooi', just like 'fool').
const List<String> _charGroups = [
  'a4àáâãäåāăąаα',
  'b8вβ',
  'cçćčс',
  'dďđ',
  'e3èéêëēĕėęěеёε',
  'g69ğ',
  'hн',
  'i1lìíîïīįıłіι',
  'jј',
  'kкκ',
  'mм',
  'nñńň',
  'o0òóôõöøōőоο',
  'pрρ',
  's5śšşѕ',
  't7ţťтτ',
  'uùúûüūůűų',
  'xхχ',
  'yýÿу',
  'z2źżž'
];

// Symbols are ambiguous: they may stand for a letter ('a$$') or merely break a
// word up ('ad$min'), so the text is scanned once with them read as letters and
// once with them removed.
const List<String> _symbolGroups = [
  'a@',
  'c¢(',
  'e€£',
  'i!|¡/',
  's\$§',
  't+',
  'o°'
];

Map<String, String> _buildMap(List<String> groups) {
  final Map<String, String> built = {};

  for (final String group in groups) {
    for (final String ch in group.substring(1).split('')) {
      built[ch] = group[0];
    }
  }

  return built;
}

// Stylized Latin letters that keep their shape: circled ('ⓐ') and the
// Mathematical Alphanumeric blocks with no gaps ('𝐚', '𝗮', '𝘢', '𝚊'). Every
// block holds A-Z followed by a-z, so one offset per block is enough.
const List<int> _stylizedBlocks = [
  0x24B6,
  0x1D400,
  0x1D434,
  0x1D468,
  0x1D5A0,
  0x1D5D4,
  0x1D608,
  0x1D63C,
  0x1D670
];

String? _fromStylized(int code) {
  for (final int start in _stylizedBlocks) {
    if (code >= start && code <= start + 51) {
      return String.fromCharCode(0x61 + (code - start) % 26);
    }
  }

  return null;
}

final Map<String, String> _charMap = _buildMap(_charGroups);
final Map<String, String> _symbolMap = _buildMap(_symbolGroups);
final RegExp _alphanumeric = RegExp(r'[\p{L}\p{N}]', unicode: true);

String? _charAt(List<String> chars, int index) =>
    index >= 0 && index < chars.length ? chars[index] : null;

bool _isJung(String? ch) =>
    ch != null && (_jung.contains(ch) || _latinJung.containsKey(ch));

/// Puts loose jamo back together. A consonant is only taken as a final when it
/// is not the lead of the next syllable ('ㅂㅏㅂㅗ' -> '바보', not '밥ㅗ').
String _composeHangul(List<String> chars) {
  final StringBuffer out = StringBuffer();
  final int length = chars.length;
  int i = 0;

  while (i < length) {
    final int lead = _cho.indexOf(chars[i]);
    final String? nextChar = _charAt(chars, i + 1);
    int j = i + 1;
    int vowel =
        nextChar == null ? -1 : _jung.indexOf(_latinJung[nextChar] ?? nextChar);

    if (lead == -1 || vowel == -1) {
      out.write(chars[i]);
      i += 1;
      continue;
    }

    j += 1;

    final String? vowelCompound =
        j < length ? _jungCompound[_jung[vowel] + chars[j]] : null;

    if (vowelCompound != null) {
      vowel = _jung.indexOf(vowelCompound);
      j += 1;
    }

    final int finalAt = j < length && !_isJung(_charAt(chars, j + 1))
        ? _jong.indexOf(chars[j])
        : -1;
    int tail = finalAt > 0 ? finalAt : 0;

    if (tail > 0) {
      j += 1;

      final String? tailCompound =
          j < length ? _jongCompound[_jong[tail] + chars[j]] : null;

      if (tailCompound != null && !_isJung(_charAt(chars, j + 1))) {
        tail = _jong.indexOf(tailCompound);
        j += 1;
      }
    }

    out.write(String.fromCharCode(0xAC00 + (lead * 21 + vowel) * 28 + tail));
    i = j;
  }

  return out.toString();
}

String _normalizeText(String text, bool readSymbols) {
  final List<String> chars = [];

  for (final int rune in text.toLowerCase().runes) {
    String ch = String.fromCharCode(rune);

    if (rune >= 0xFF01 && rune <= 0xFF5E) {
      // Fullwidth ASCII ('ａｄｍｉｎ').
      ch = String.fromCharCode(rune - 0xFEE0).toLowerCase();
    } else if (rune >= 0x1100 && rune <= 0x1112) {
      // Conjoining jamo (decomposed Hangul) to compatibility jamo.
      ch = _cho[rune - 0x1100];
    } else if (rune >= 0x1161 && rune <= 0x1175) {
      ch = _jung[rune - 0x1161];
    } else if (rune >= 0x11A8 && rune <= 0x11C2) {
      ch = _jong[rune - 0x11A7];
    } else if (rune >= 0x24B6) {
      // Circled or Mathematical Alphanumeric letter ('ⓐ', '𝗮').
      ch = _fromStylized(rune) ?? ch;
    }

    if (_charMap.containsKey(ch)) {
      chars.add(_charMap[ch]!);
    } else if (_alphanumeric.hasMatch(ch)) {
      chars.add(ch);
    } else if (readSymbols && _symbolMap.containsKey(ch)) {
      chars.add(_symbolMap[ch]!);
    }
  }

  // 'ㅇ' sitting next to Latin letters is meant as an 'o' ('fㅇㅇl' -> 'fool'),
  // so it is read that way before it can be composed into a syllable.
  for (int i = 1, iLen = chars.length; i < iLen; i += 1) {
    final int prev = chars[i - 1].codeUnitAt(0);

    if (chars[i] == 'ㅇ' && prev >= 0x61 && prev <= 0x7A) {
      chars[i] = 'o';
    }
  }

  // Whatever 'ㅇ' is left over after composing is a lookalike of 'o' as well.
  return _composeHangul(chars).replaceAll('ㅇ', 'o');
}

// Allowed words are blanked out with a character normalization never produces,
// so a banned word can no longer be found inside them. Blanking keeps the text
// length intact, which the token positions depend on.
const String _mask = ' ';

List<String> _normalizeAll(List<String> words) {
  final List<String> normalized = [];

  for (final String word in words) {
    final String target = _normalizeText(word, true);

    if (target.isNotEmpty) {
      normalized.add(target);
    }
  }

  return normalized;
}

/// A match may run over the space between two tokens ('ad min'), but only when
/// it starts where a token starts. That keeps 'admin' out of 'read min' and, in
/// Korean, keeps '사과' out of '이거사 과일이야'.
bool _isAligned(int at, int length, List<int> starts, List<int> ends) {
  for (int i = 0, iLen = starts.length; i < iLen; i += 1) {
    if (at >= starts[i] && at < ends[i]) {
      return at == starts[i] || at + length <= ends[i];
    }
  }

  return false;
}

/// Returns `true` when the given string contains one of the banned `words`.
/// Beyond a plain match, it also catches words hidden with separators
/// (`ad___min`, `ad$min`), lookalike characters (`adm1n`, `4pp13`, fullwidth or
/// Cyrillic letters) and decomposed Hangul jamo (`ㅅㅏㄱㅗㅏ`).
/// A word spread over a space is only counted from the start of a word, so
/// unrelated neighbours (`이거사 과일이야` for `사과`) are not reported.
bool hasBadWords(String str,
    {List<String> words = const [], List<String> allowWords = const []}) {
  if (str.isEmpty || words.isEmpty) {
    return false;
  }

  final List<String> targets = _normalizeAll(words);

  if (targets.isEmpty) {
    return false;
  }

  final List<String> allowed = _normalizeAll(allowWords);
  final List<String> tokens =
      str.split(RegExp(r'\s+')).where((token) => token.isNotEmpty).toList();

  for (final bool readSymbols in [true, false]) {
    final List<int> starts = [];
    final List<int> ends = [];
    String joined = '';

    for (final String token in tokens) {
      final String normalized = _normalizeText(token, readSymbols);

      if (normalized.isEmpty) {
        continue;
      }

      starts.add(joined.length);
      joined += normalized;
      ends.add(joined.length);
    }

    for (final String term in allowed) {
      int at = joined.indexOf(term);

      while (at != -1) {
        joined = joined.substring(0, at) +
            _mask * term.length +
            joined.substring(at + term.length);
        at = joined.indexOf(term, at + term.length);
      }
    }

    for (final String target in targets) {
      int at = joined.indexOf(target);

      while (at != -1) {
        if (_isAligned(at, target.length, starts, ends)) {
          return true;
        }

        at = joined.indexOf(target, at + 1);
      }
    }
  }

  return false;
}
