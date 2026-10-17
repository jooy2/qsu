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

      // Counted in code points, so an astral character is one and is never cut in half.
      expect(truncate('a\u{1F44B}b', 2), 'a\u{1F44B}');
      expect(truncate('\u{1F44B}\u{1F44B}\u{1F44B}', 2, ellipsis: '...'),
          '\u{1F44B}\u{1F44B}...');
      expect(truncate('\u{1F44B}\u{1F44B}', 2), '\u{1F44B}\u{1F44B}');
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
          truncateExpect('abc. def. ghi.', 6, endStringChar: '.'), 'abc. def.');
      expect(truncateExpect('abc. def. ghi.', 20, endStringChar: '.'),
          'abc. def. ghi.');
      expect(
          truncateExpect('hello-this-is-test-string-bye', 14,
              endStringChar: '-'),
          'hello-this-is-');

      // The default covers the full stop as every script writes it.
      expect(truncateExpect('안녕하세요。반갑습니다。좋은 하루。', 8), '안녕하세요。반갑습니다。');
      expect(truncateExpect('これはテストです。よろしくお願いします。さようなら。', 10),
          'これはテストです。よろしくお願いします。');
      expect(truncateExpect('你好。这是测试。再见。', 5), '你好。这是测试。');
      expect(truncateExpect('テストです｡もう一度｡', 4), 'テストです｡');
      expect(truncateExpect('ａｂ．ｃｄ．ｅｆ．', 3), 'ａｂ．');
      expect(truncateExpect('hello. こんにちは。bye.', 8), 'hello. こんにちは。');

      // An explicit ending character still means only that one.
      expect(
          truncateExpect('안녕。하세요。반가워.', 3, endStringChar: '.'), '안녕。하세요。반가워.');

      // A list accepts several at once, and the longest one is matched first.
      expect(
          truncateExpect('a. b! c? d.', 4,
              endStringChar: <String>['.', '!', '?']),
          'a. b!');
      expect(truncateExpect('a...b.c', 2, endStringChar: <String>['.', '...']),
          'a...');
      expect(
          truncateExpect('hello. this is test', 3, endStringChar: <String>[]),
          'hello. this is test');

      // The expected length is counted in code points, so an astral character is one.
      expect(truncateExpect('\u{1F44B}\u{1F44B}.ab.cd.', 5, endStringChar: '.'),
          '\u{1F44B}\u{1F44B}.ab.');
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

    test('strToSnakeCase', () {
      expect(strToSnakeCase(''), '');
      expect(strToSnakeCase(null), '');
      expect(strToSnakeCase('foo bar'), 'foo_bar');
      expect(strToSnakeCase('--foo-bar--'), 'foo_bar');
      expect(strToSnakeCase('__FOO_BAR__'), 'foo_bar');
      expect(strToSnakeCase('camelCase'), 'camel_case');
      expect(strToSnakeCase('XMLHttpRequest'), 'xml_http_request');
      expect(strToSnakeCase('abc12def'), 'abc_12_def');
      expect(strToSnakeCase('한글English혼합'), '한글_english_혼합');
    });

    test('strToKebabCase', () {
      expect(strToKebabCase(''), '');
      expect(strToKebabCase(null), '');
      expect(strToKebabCase('foo bar'), 'foo-bar');
      expect(strToKebabCase('--foo-bar--'), 'foo-bar');
      expect(strToKebabCase('__FOO_BAR__'), 'foo-bar');
      expect(strToKebabCase('camelCase'), 'camel-case');
      expect(strToKebabCase('XMLHttpRequest'), 'xml-http-request');
      expect(strToKebabCase('abc12def'), 'abc-12-def');
      expect(strToKebabCase('한글English혼합'), '한글-english-혼합');
    });

    test('strToPascalCase', () {
      expect(strToPascalCase(''), '');
      expect(strToPascalCase(null), '');
      expect(strToPascalCase('foo bar'), 'FooBar');
      expect(strToPascalCase('--foo-bar--'), 'FooBar');
      expect(strToPascalCase('__FOO_BAR__'), 'FooBar');
      expect(strToPascalCase('camelCase'), 'CamelCase');
      expect(strToPascalCase('XMLHttpRequest'), 'XmlHttpRequest');
      expect(strToPascalCase('abc12def'), 'Abc12Def');
      expect(strToPascalCase('한글English혼합'), '한글English혼합');
    });

    test('strToConstantCase', () {
      expect(strToConstantCase(''), '');
      expect(strToConstantCase(null), '');
      expect(strToConstantCase('foo bar'), 'FOO_BAR');
      expect(strToConstantCase('--foo-bar--'), 'FOO_BAR');
      expect(strToConstantCase('__FOO_BAR__'), 'FOO_BAR');
      expect(strToConstantCase('camelCase'), 'CAMEL_CASE');
      expect(strToConstantCase('XMLHttpRequest'), 'XML_HTTP_REQUEST');
      expect(strToConstantCase('abc12def'), 'ABC_12_DEF');
      expect(strToConstantCase('한글English혼합'), '한글_ENGLISH_혼합');
    });

    test('pad', () {
      // `both` is the default, and the extra character goes to the end.
      expect(pad('abc', 8), '  abc   ');
      expect(pad('abc', 8, char: '_-'), '_-abc_-_');
      expect(pad('abc', 8, position: 'start'), '     abc');
      expect(pad('abc', 8, position: 'end'), 'abc     ');
      expect(pad('5', 3, position: 'start', char: '0'), '005');
      // Already long enough, so it is returned untouched.
      expect(pad('abcdefgh', 8), 'abcdefgh');
      expect(pad('abcdefghi', 8), 'abcdefghi');
      expect(pad('abc', 0), 'abc');
      // An empty padding character has nothing to pad with.
      expect(pad('abc', 8, char: ''), 'abc');
      expect(pad('', 4, char: '-'), '----');
      expect(pad(null, 4, char: '-'), '----');
      // Counted in code points, so an emoji is one character.
      expect(pad('😀', 3, position: 'end', char: '-'), '😀--');
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

    test('detectLanguage', () {
      List<(String, double)> detect(String? text) => [
            for (final DetectedLanguage item in detectLanguage(text))
              (item.language, item.ratio)
          ];

      List<(String, double)> only(String language) => [(language, 1.0)];

      // Nothing to count: no input, or no letter of a script the function knows.
      expect(detect(''), []);
      expect(detect(null), []);
      expect(detect('   '), []);
      expect(detect('12345'), []);
      expect(detect('!!! ???'), []);
      expect(detect('\u{1f389}'), []);

      // A script only one language writes names that language.
      const List<(String, String)> scripts = [
        ('안녕하세요', 'ko'),
        ('ㅋㅋㅋ', 'ko'),
        ('こんにちは', 'ja'),
        ('ﾃｽﾄ', 'ja'),
        ('你好世界', 'zh'),
        ('สวัสดีครับ', 'th'),
        ('Καλημέρα', 'el'),
        ('שלום', 'he'),
        ('नमस्ते', 'hi'),
        ('გამარჯობა', 'ka'),
        ('Բարեւ', 'hy'),
        ('নমস্কার', 'bn'),
        ('ਸਤਿ', 'pa'),
        ('નમસ્તે', 'gu'),
        ('ନମସ୍କାର', 'or'),
        ('வணக்கம்', 'ta'),
        ('నమస్కారం', 'te'),
        ('ನಮಸ್ಕಾರ', 'kn'),
        ('നമസ്കാരം', 'ml'),
        ('ආයුබෝවන්', 'si'),
        ('ສະບາຍດີ', 'lo'),
        ('བཀྲ་ཤིས', 'bo'),
        ('မင်္ဂလာပါ', 'my'),
        ('ሰላም', 'am'),
        ('សួស្តី', 'km'),
        ('ᠮᠣᠩᠭᠣᠯ', 'mn'),
      ];

      for (final (String, String) row in scripts) {
        expect(detect(row.$1), only(row.$2), reason: row.$1);
      }

      // Languages that share a script are told apart by their common words and letters.
      const List<(String, String)> sentences = [
        ('The weather is nice today, so we are going to the park.', 'en'),
        ('El tiempo está muy bien hoy, así que vamos al parque.', 'es'),
        ("Il fait beau aujourd'hui, alors nous allons au parc.", 'fr'),
        ('Das Wetter ist heute schön, also gehen wir in den Park.', 'de'),
        ('O tempo está bom hoje, então vamos ao parque.', 'pt'),
        ('Oggi il tempo è bello, quindi andiamo al parco.', 'it'),
        ('Avui fa bon temps, així que anem al parc.', 'ca'),
        ('Het weer is vandaag mooi, dus we gaan naar het park.', 'nl'),
        ('Vädret är fint idag, så vi går till parken.', 'sv'),
        ('Vejret er godt i dag, så vi går i parken.', 'da'),
        ('Hun sa at toget var forsinket igjen.', 'no'),
        ('Sää on tänään kaunis, joten menemme puistoon.', 'fi'),
        ('Pogoda jest dzisiaj ładna, więc idziemy do parku.', 'pl'),
        ('Počasí je dnes hezké, takže jdeme do parku.', 'cs'),
        ('Na tomto projekte pracujem už tri mesiace.', 'sk'),
        ('Danas je lijepo vrijeme, pa idemo u park.', 'hr'),
        ('Vremea este frumoasă astăzi, așa că mergem în parc.', 'ro'),
        ('Ma szép az idő, ezért elmegyünk a parkba.', 'hu'),
        ('Bugün hava çok güzel, bu yüzden parka gidiyoruz.', 'tr'),
        ('Hôm nay trời đẹp, vì vậy chúng tôi đi công viên.', 'vi'),
        ('Cuaca hari ini cerah, jadi kami pergi ke taman.', 'id'),
        ('Сегодня хорошая погода, поэтому мы идём в парк.', 'ru'),
        ('Сьогодні гарна погода, тому ми йдемо в парк.', 'uk'),
        ('Днес времето е хубаво, затова отиваме в парка.', 'bg'),
        ('Данас је лепо време, па идемо у парк.', 'sr'),
        ('الطقس جميل اليوم، لذلك سنذهب إلى الحديقة.', 'ar'),
        ('امروز هوا خوب است، پس به پارک می\u200cرویم.', 'fa'),
        ('آج موسم اچھا ہے، اس لیے ہم پارک جا رہے ہیں۔', 'ur'),
      ];

      for (final (String, String) row in sentences) {
        expect(detect(row.$1), only(row.$2), reason: row.$1);
      }

      // A single word is enough when it belongs to one language.
      const List<(String, String)> greetings = [
        ('Hello', 'en'),
        ('Gracias', 'es'),
        ('Bonjour', 'fr'),
        ('Danke', 'de'),
        ('Obrigado', 'pt'),
        ('Grazie', 'it'),
        ('Gràcies', 'ca'),
        ('Dank je', 'nl'),
        ('Tack', 'sv'),
        ('Takk', 'no'),
        ('Kiitos', 'fi'),
        ('Dziękuję', 'pl'),
        ('Děkuji', 'cs'),
        ('Ďakujem', 'sk'),
        ('Hvala', 'hr'),
        ('Mulțumesc', 'ro'),
        ('Köszönöm', 'hu'),
        ('Merhaba', 'tr'),
        ('Xin chào', 'vi'),
        ('Terima kasih', 'id'),
        ('Привет, как дела?', 'ru'),
        ('Привіт, як справи?', 'uk'),
        ('Здравей, как си?', 'bg'),
        ('Здраво, како си?', 'sr'),
        ('مرحبا', 'ar'),
        ('سلام، حال شما چطور است؟', 'fa'),
        ('آپ کیسے ہیں؟', 'ur'),
      ];

      for (final (String, String) row in greetings) {
        expect(detect(row.$1), only(row.$2), reason: row.$1);
      }

      // Endings and runs of letters speak for words that are on no list: `watched` and `night`
      // outweigh `we` and `die`, which Dutch shares, and `naj-` and `sj` tell Slovak from Czech
      // and Norwegian from Danish.
      expect(detect('We watched Die Hard last night.'), only('en'));
      expect(detect('Kde je najbližšia stanica?'), only('sk'));
      expect(detect('Jeg har jobbet med dette prosjektet i tre måneder.'),
          only('no'));

      // Close languages are told apart by the words that differ between them.
      const List<(String, String)> pairs = [
        ('Nevím', 'cs'),
        ('Neviem', 'sk'),
        ('Ne znam', 'hr'),
        ('Jeg ved det ikke', 'da'),
        ('Jeg vet ikke', 'no'),
        ('No lo sé', 'es'),
        ('No ho sé', 'ca'),
      ];

      for (final (String, String) row in pairs) {
        expect(detect(row.$1), only(row.$2), reason: row.$1);
      }

      // With nothing to go by, a script falls back to its first language.
      expect(detect('getUserName'), only('en'));
      expect(detect('a'), only('en'));
      expect(detect('Иван'), only('ru'));
      expect(detect('محمد'), only('ar'));

      // Han characters follow the kana or Hangul of their sentence, and are Chinese without.
      expect(detect('東京に行きます'), only('ja'));
      expect(detect('北京'), only('zh'));
      expect(detect('대한민국(大韓民國)'), only('ko'));
      expect(detect('東京に住んでいます。北京是中国的首都。'), [('ja', 9 / 17), ('zh', 8 / 17)]);
      expect(detect('도쿄는 東京です。'), [('ja', 4 / 7), ('ko', 3 / 7)]);

      // The ratio counts letters only, and a tie goes to the language that appears first.
      expect(detect('안녕 Hello'), [('en', 5 / 7), ('ko', 2 / 7)]);
      expect(detect('안녕하세요 Hello'), [('ko', 0.5), ('en', 0.5)]);
      expect(detect('Hello 안녕하세요'), [('en', 0.5), ('ko', 0.5)]);
      expect(detect('오늘 회의는 Zoom으로 진행합니다.'), [('ko', 0.75), ('en', 0.25)]);
      expect(detect('abc 123 !!! 가나'), [('en', 0.6), ('ko', 0.4)]);
      // The vowel signs of `नमस्ते` are combining marks, so it counts as four letters.
      expect(detect('नमस्ते abcd'), [('hi', 0.5), ('en', 0.5)]);
      // Counted in code points, so a character outside the Basic Multilingual Plane is one.
      expect(detect('\u{20000}\u{20001} a'), [('zh', 2 / 3), ('en', 1 / 3)]);

      // Each sentence is judged on its own.
      expect(detect("I live in Paris. C'est la vie."),
          [('en', 12 / 21), ('fr', 9 / 21)]);
      expect(detect('Das ist gut. This is good.'),
          [('en', 10 / 19), ('de', 9 / 19)]);
      // A sentence too short to decide takes the language of the rest of the text, and one
      // shared word does not move a sentence into another language.
      expect(detect('Hello. Bonjour le monde, comment ça va ?'), only('fr'));
      expect(detect('We watched Die Hard last night and it was great.'),
          only('en'));

      // Case, decomposed accents and Arabic vowel marks do not hide a word.
      expect(detect('DAS IST GUT'), only('de'));
      expect(detect("İstanbul'da hava çok güzel."), only('tr'));
      expect(detect("Cafe\u0301 au lait, s'il vous plai\u0302t."), only('fr'));
      expect(detect('Tie\u0302\u0301ng Vie\u0323\u0302t ra\u0302\u0301t hay.'),
          only('vi'));
      expect(detect('مِنْ فِي'), only('ar'));
      expect(detect('Ｈｅｌｌｏ'), only('en'));

      // The ratios add up to 1 and run from the largest to the smallest.
      final List<DetectedLanguage> mixed = detectLanguage(
          'This is a test. 안녕하세요. こんにちは。你好。Bonjour tout le monde, je suis là. Привет!');

      expect(mixed.map((DetectedLanguage item) => item.language).toList(),
          ['fr', 'en', 'ru', 'ko', 'ja', 'zh']);
      expect(
          mixed.fold(
              0.0, (double sum, DetectedLanguage item) => sum + item.ratio),
          closeTo(1, 1e-9));

      for (int i = 1; i < mixed.length; i += 1) {
        expect(mixed[i - 1].ratio, greaterThanOrEqualTo(mixed[i].ratio));
      }
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

    test('strBlindRandom', () {
      final String masked = strBlindRandom('abcdefghij', 4);

      expect(masked.length, 10);
      expect('*'.allMatches(masked).length, 4);
      expect(strBlindRandom('', 3), '');
      // Only letters are masked, so the punctuation survives.
      expect(strBlindRandom('...', 3), '...');
      expect(strBlindRandom('abcd', 2, blindStr: '#').contains('#'), isTrue);
    });

    test('getGroupKeys', () {
      expect(getGroupKeys('Hello {name}, you are {age}', '{', '}'),
          <String>['name', 'age']);
      // A backslash escapes the pair, and a doubled delimiter is the template
      // writing the delimiter itself.
      expect(
          getGroupKeys('Escaped \\{skip} and {{literal}} and {ok}', '{', '}'),
          <String>['ok']);
      expect(getGroupKeys('no keys here', '{', '}'), <String>[]);
      expect(getGroupKeys('', '{', '}'), <String>[]);
      // A key may hold letters, digits, `_`, `$` and `-` and nothing else.
      expect(
          getGroupKeys('{bad key} and {good-1}', '{', '}'), <String>['good-1']);
      expect(getGroupKeys('{bad key}', '{', '}', ignoreValidation: true),
          <String>['bad key']);
      expect(getGroupKeys(r'a ${one} b ${two}', r'${', '}}'), <String>[]);
      expect(() => getGroupKeys('a', '{', '{'), throwsArgumentError);
      expect(() => getGroupKeys('a', '', '}'), throwsArgumentError);
      // A multi-character delimiter may not be paired with a single one.
      expect(() => getGroupKeys('a', r'${', '}'), throwsArgumentError);
    });
  });
}
