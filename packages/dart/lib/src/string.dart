import 'dart:collection';
import 'dart:math';

import 'package:qsu/qsu.dart';

/// Removes all whitespace before and after a string. Unlike JavaScript's `trim` function, it converts two or more spaces between sentences into a single space.
String trim(String str) {
  if (str.isEmpty) {
    return '';
  }

  String result = str.trim();

  return result.replaceAll(RegExp(r'\s{2,}'), ' ');
}

/// Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.
String removeSpecialChar(String str, {String? exceptionCharacters}) {
  return str.replaceAll(
      RegExp(
          '[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f${exceptionCharacters ?? ''}]'),
      '');
}

/// Replaces text within a range starting and ending with a specific character in a given string with another string. For example, given the string `abc<DEF>ghi`, to change `<DEF>` to `def`, use `replaceBetween('abc<DEF>ghi', '<', '>', 'def')`. The result would be `abcdefghi`.
/// Deletes strings in the range if `replaceWith` is not specified.
String replaceBetween(
    String str, String startChar, String endChar, String replaceWith) {
  final RegExp specialCharacters = RegExp(r'[.*+?^${}()|[\]\\]');
  final String startCharRegExp =
      specialCharacters.hasMatch(startChar) ? '\\$startChar' : startChar;
  final String endCharRegExp =
      specialCharacters.hasMatch(endChar) ? '\\$endChar' : endChar;

  return str.replaceAll(
      RegExp('$startCharRegExp.*?$endCharRegExp'), replaceWith);
}

/// Removes `\n`, `\r` characters or replaces them with specified characters.
String removeNewLine(String str, {String replaceTo = ''}) {
  return str
      .replaceAll(RegExp(r'(\r\n|\n|\r)', multiLine: true), replaceTo)
      .trim();
}

/// Converts the first letter of the entire string to uppercase and returns.
String capitalizeFirst(String str) {
  return '${str[0].toUpperCase()}${str.substring(1)}';
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
      if (RegExp(r'[a-zA-Z]').hasMatch(splitStr[i][j])) {
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
  final List<String> splitStr = str.trim().toLowerCase().split(' ');

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
  final String endString = endStringChar ?? '.';
  final bool isEndStringCharLastSentence =
      str.substring(str.length - 1) == endStringChar;
  final List<String> splitStr = str.split(endString);
  final int splitStrLength = splitStr.length;
  String convStr = '';
  int currentLength = 0;

  for (int i = 0; i < splitStrLength; i += 1) {
    if (currentLength < expectLength) {
      convStr +=
          '${splitStr[i]}${i != splitStrLength - 1 || isEndStringCharLastSentence ? endStringChar : ''}';
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
  final Random random = Random();

  for (int i = codePoints.length - 1; i > 0; i--) {
    int j = random.nextInt(i + 1);
    int temp = codePoints[i];
    codePoints[i] = codePoints[j];
    codePoints[j] = temp;
  }

  return String.fromCharCodes(codePoints);
}

/// Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12.
String strRandom(int length, {String? additionalCharacters}) {
  if (length <= 0) {
    throw ArgumentError('Length must be positive');
  }

  final String availCharacters =
      'abcdefghijklmnopqrstuvwxyz0123456789${additionalCharacters ?? ''}';
  final Random random = Random();
  final StringBuffer result = StringBuffer();

  for (int i = 0; i < length; i++) {
    String newChar = availCharacters[random.nextInt(availCharacters.length)];

    if (random.nextBool()) {
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

  return LinkedHashSet<String>.from(str.split('')).join('');
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
