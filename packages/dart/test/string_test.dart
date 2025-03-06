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
      expect(capitalizeEachWords('this is the test sentence.', natural: true),
          'This is the Test Sentence.');
    });

    test('truncate', () {
      expect(truncate('test', 2), 'te');
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
  });
}
