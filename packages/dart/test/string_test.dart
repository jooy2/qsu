import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('String', () {
    test('trim', () {
      expect(trim(''), '');
      expect(trim(' hello world '), 'hello world');
      expect(trim(' h e l l o  wo     rld  '), 'h e l l o wo rld');
      expect(trim(' H ello World'), 'H ello World');
      expect(trim('  Hell    o    World'), 'Hell o World');
    });

    test('removeSpecialChar', () {
      expect(removeSpecialChar('1　2！3☆4＠5＋6─🌍'), '123456');
      expect(removeSpecialChar('Hello, World!'), 'HelloWorld');
      expect(removeSpecialChar('12 34-56,78=90'), '1234567890');
      expect(removeSpecialChar('ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'), 'ABC가나다ㄱㄴㄷㅏㅑㅓ天地人');
      expect(removeSpecialChar('Hello World!', exceptionCharacters: ' '),
          'Hello World');
      expect(
          removeSpecialChar('Hello-qsu & World!', exceptionCharacters: '-&!'),
          'Hello-qsu&World!');
    });

    test('replaceBetween', () {
      expect(replaceBetween('hello[world]', '[', ']', ''), 'hello');
      expect(replaceBetween("hello'test'world'test2'!!", "'", "'", ''),
          'helloworld!!');
      expect(replaceBetween('hello[w]o[r][[l]][[d]]!!', '[', ']', ''),
          'helloo]]!!');
      expect(replaceBetween('abc[hello]def[world]g[!!!]', '[', ']', ''),
          'abcdefg');
      expect(
          replaceBetween('abc<<def>>ghi<<jkl>>mn', '<<', '>>', ''), 'abcghimn');
      expect(replaceBetween('hell1o2~', '1', '2', 'o!'), 'hello!~');
    });

    test('split', () {
      expect(split('hello,js world', ['']), ['hello,js world']);
      expect(split('hello,js world', [',', ' ']), ['hello', 'js', 'world']);
      expect(split('hello, js world', [', ']), ['hello', 'js world']);
      expect(split('hello, js world', ['hello', ' js ', 'w']),
          ['', ',', '', 'orld']);
      expect(split('hello+js.world', ['+', '.']), ['hello', 'js', 'world']);
      expect(split('hello+?js world', ['+?']), ['hello', 'js world']);
      expect(split('hello j\\s world', ['\\s']), ['hello j', ' world']);
    });

    test('removeNewLine', () {
      expect(removeNewLine('''te

st'''), 'test');
      expect(removeNewLine('te\rst'), 'test');
      expect(removeNewLine('te\nst'), 'test');
      expect(removeNewLine('te\r\nst'), 'test');
      expect(removeNewLine('te\r\nst', replaceTo: '|'), 'te|st');
      expect(removeNewLine('t\ne\r\ns\rt', replaceTo: '-'), 't-e-s-t');
    });

    test('capitalizeFirst', () {
      expect(capitalizeFirst('t'), 'T');
      expect(capitalizeFirst('test'), 'Test');
      expect(capitalizeFirst('tEST'), 'TEST');
    });

    test('uncapitalizeFirst', () {
      expect(uncapitalizeFirst(''), '');
      expect(uncapitalizeFirst('T'), 't');
      expect(uncapitalizeFirst('Test'), 'test');
      expect(uncapitalizeFirst('TEST'), 'tEST');
      expect(uncapitalizeFirst('TestWords'), 'testWords');
      expect(uncapitalizeFirst('test'), 'test');
      expect(uncapitalizeFirst('한글'), '한글');
    });

    test('capitalizeEverySentence', () {
      expect(capitalizeEverySentence('hello. world'), 'Hello. World');
      expect(capitalizeEverySentence('hello. 1world'), 'Hello. 1World');
      expect(capitalizeEverySentence('HeLLO,world'), 'HeLLO,world');
      expect(capitalizeEverySentence('H. e. l. l. o.'), 'H. E. L. L. O.');
      expect(capitalizeEverySentence('hello!world!', splitChar: '!'),
          'Hello!World!');
    });

    test('capitalizeEachWords', () {
      expect(capitalizeEachWords('hello, world!'), 'Hello, World!');
      expect(capitalizeEachWords('test'), 'Test');
      expect(capitalizeEachWords('testWords'), 'TestWords');
      expect(capitalizeEachWords('testWords', natural: true), 'Testwords');
      expect(capitalizeEachWords('this is the test sentence.', natural: true),
          'This is the Test Sentence.');
    });

    test('truncate', () {
      expect(truncate('test', 2), 'te');
      expect(truncate('hello', 5), 'hello');
      expect(truncate('test', 1, ellipsis: '...'), 't...');
    });

    test('truncateExpect', () {
      expect(
          truncateExpect('hello. this is test string.', 10, endStringChar: '.'),
          'hello. this is test string.');
      expect(
          truncateExpect('hello. this is test. bye.', 20, endStringChar: '.'),
          'hello. this is test.');
      expect(truncateExpect('hello.. this is test', 20, endStringChar: '.'),
          'hello.. this is test');
      expect(truncateExpect('hello.. this is test', 21, endStringChar: '.'),
          'hello.. this is test');
      expect(truncateExpect('hello.. this is test', 19, endStringChar: '.'),
          'hello.. this is test');
      expect(
          truncateExpect('hello-this-is-test-string-bye', 14,
              endStringChar: '-'),
          'hello-this-is-');
    });

    test('strCount', () {
      expect(strCount('hello', 'l'), 2);
      expect(strCount('abcdABCD', 'a'), 1);
      expect(strCount('aaaaaa', 'a'), 6);
      expect(strCount('hello', 'll'), 1);
    });

    test('strShuffle', () {
      expect(strShuffle('hi'), hasLength(2));
      expect(strShuffle('abc def ghi'), hasLength(11));
    });

    test('strRandom', () {
      expect(strRandom(4), hasLength(4));
      expect(strRandom(6), hasLength(6));
      expect(strRandom(10, additionalCharacters: '[]{}()'), hasLength(10));
    });

    test('strUnique', () {
      expect(strUnique('123'), '123');
      expect(strUnique('ababcdcd'), 'abcd');
      expect(strUnique('abc--11111'), 'abc-1');
    });

    test('strToAscii', () {
      expect(strToAscii('hello-world.'),
          [104, 101, 108, 108, 111, 45, 119, 111, 114, 108, 100, 46]);
      expect(strToAscii('1 2 3 4 5'), [49, 32, 50, 32, 51, 32, 52, 32, 53]);
    });

    test('urlJoin', () {
      expect(strToAscii('hello-world.'),
          [104, 101, 108, 108, 111, 45, 119, 111, 114, 108, 100, 46]);
      expect(strToAscii('1 2 3 4 5'), [49, 32, 50, 32, 51, 32, 52, 32, 53]);
    });

    test('urlJoin', () {
      expect(urlJoin(['https://example.com']), 'https://example.com');
      expect(urlJoin(['https://example.com', null, 'world/']),
          'https://example.com/world');
      expect(urlJoin([null, 'https://example.com', 'world/']),
          'https://example.com/world');
      expect(urlJoin(['https://example.com', 'hello', '#fragment']),
          'https://example.com/hello/#fragment');
      expect(urlJoin(['https://example.com', 'hello', 'world']),
          'https://example.com/hello/world');
      expect(urlJoin(['https://example.com', '/hello', '/world', 'bye']),
          'https://example.com/hello/world/bye');
      expect(
          urlJoin(['https://example.com', '/hello', '/world', '?text=bye&a=b']),
          'https://example.com/hello/world?text=bye&a=b');
      expect(urlJoin(['example.com', '/hello', '/world', 'bye']),
          'example.com/hello/world/bye');
      expect(urlJoin(['hello', '/world', 'bye']), 'hello/world/bye');
    });

    test('getStrBytes', () {
      expect(getStrBytes(''), 0);
      expect(getStrBytes('abcde'), 5);
      expect(getStrBytes('a1b2c3 d4e5f6'), 13);
      expect(getStrBytes('ㄱㄴㄷ'), 9);
      expect(getStrBytes('가나다123'), 12);
      expect(getStrBytes('😀😀😀'), 12);
      expect(getStrBytes('😀'), 4);
      expect(getStrBytes('123 ABcd 가나다😀'), 22);
    });

    test('strToCamelCase', () {
      expect(strToCamelCase(''), '');
      expect(strToCamelCase(null), '');
      expect(strToCamelCase('foo bar'), 'fooBar');
      expect(strToCamelCase('--foo-bar--'), 'fooBar');
      expect(strToCamelCase('__FOO_BAR__'), 'fooBar');
      expect(strToCamelCase('camelCase'), 'camelCase');
      expect(strToCamelCase('PascalCase'), 'pascalCase');
      expect(strToCamelCase('XMLHttpRequest'), 'xmlHttpRequest');
      expect(strToCamelCase('abc12def'), 'abc12Def');
      expect(strToCamelCase('한글English혼합'), '한글English혼합');
    });

    test('words', () {
      expect(words(''), []);
      expect(words(null), []);
      expect(words('   '), []);
      expect(words('hello world'), ['hello', 'world']);
      expect(words('fred, barney, & pebbles'), ['fred', 'barney', 'pebbles']);
      expect(words('--foo-bar--'), ['foo', 'bar']);
      expect(words('constant_case_VALUE'), ['constant', 'case', 'VALUE']);
      // camelCase and PascalCase boundaries.
      expect(words('camelCase'), ['camel', 'Case']);
      expect(words('PascalCase'), ['Pascal', 'Case']);
      // The last capital of a run of capitals opens the next word.
      expect(words('XMLHttpRequest'), ['XML', 'Http', 'Request']);
      expect(words('ABC'), ['ABC']);
      expect(words('ABCd'), ['AB', 'Cd']);
      // Digits are their own words.
      expect(words('abc12def'), ['abc', '12', 'def']);
      expect(words('version 2 of qsu'), ['version', '2', 'of', 'qsu']);
      // Uncased scripts have no camelCase boundary, and switch words on a cased letter.
      expect(words('한글English혼합'), ['한글', 'English', '혼합']);
      // Accents stay attached, whether precomposed or decomposed.
      expect(words('D\u00E9j\u00E0 Vu'), ['D\u00E9j\u00E0', 'Vu']);
      expect(words('De\u0301ja\u0300 Vu'), ['De\u0301ja\u0300', 'Vu']);
      expect(words("don't"), ['don', 't']);
      // `ß` is a lowercase letter even though it upper-cases to two characters.
      expect(words('Straße'), ['Straße']);
    });

    test('deburr', () {
      expect(deburr(''), '');
      expect(deburr(null), '');
      expect(deburr('hello'), 'hello');
      expect(deburr('déjà vu'), 'deja vu');
      expect(deburr('Łódź'), 'Lodz');
      expect(deburr('Ærøskøbing'), 'Aeroskobing');
      expect(deburr('Þór'), 'Thor');
      expect(deburr('Straße'), 'Strasse');
      expect(deburr('Ĳsselmeer'), 'IJsselmeer');
      expect(deburr('Œuvre'), 'Oeuvre');
      // A decomposed accent is dropped along with the precomposed ones.
      expect(deburr('Cafe\u0301'), 'Cafe');
      expect(deburr('De\u0301ja\u0300 Vu'), 'Deja Vu');
      // Anything outside Latin-1 Supplement and Latin Extended-A is left as it is.
      expect(deburr('한글'), '한글');
      expect(deburr('Ti\u1ebfng Vi\u1ec7t'), 'Ti\u1ebfng Vi\u1ec7t');
    });

    test('escapeRegExp', () {
      expect(escapeRegExp(''), '');
      expect(escapeRegExp(null), '');
      expect(escapeRegExp('hello'), 'hello');
      expect(escapeRegExp('1 + 1 = 2'), r'1 \+ 1 = 2');
      expect(escapeRegExp('[qsu](https://qsu.cdget.com/)'),
          r'\[qsu\]\(https://qsu\.cdget\.com/\)');
      expect(escapeRegExp(r'^$.*+?()[]{}|\'), r'\^\$\.\*\+\?\(\)\[\]\{\}\|\\');
      // `-`, `#`, `/` and whitespace are not special outside a character class.
      expect(escapeRegExp('a-z #1 / b'), 'a-z #1 / b');
      // The escaped value matches itself literally.
      expect(RegExp(escapeRegExp('a.b')).hasMatch('a.b'), true);
      expect(RegExp(escapeRegExp('a.b')).hasMatch('axb'), false);
    });
  });
}
