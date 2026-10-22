import assert from 'assert';
import { describe, it } from 'node:test';
import {
	collapseWhitespace,
	removeSpecialChars,
	removeNewlines,
	replaceEnclosed,
	capitalizeFirst,
	capitalizeEachSentence,
	capitalizeEachWord,
	strByteLength,
	getPlaceholderKeys,
	strCount,
	strShuffle,
	strRandom,
	strMaskRandom,
	truncate,
	truncateSentence,
	split,
	strUnique,
	strToCharCodes,
	joinUrl,
	words,
	deburr,
	detectLanguages,
	escapeRegExp,
	uncapitalizeFirst,
	strToCamelCase,
	strToSnakeCase,
	strToKebabCase,
	strToPascalCase,
	strToConstantCase,
	pad
} from '../dist';

describe('String', () => {
	it('collapseWhitespace', () => {
		assert.strictEqual(collapseWhitespace(null), null);
		assert.strictEqual(collapseWhitespace(''), '');
		assert.strictEqual(collapseWhitespace(' hello world '), 'hello world');
		assert.strictEqual(collapseWhitespace(' h e l l o  wo     rld  '), 'h e l l o wo rld');
		assert.strictEqual(collapseWhitespace(' H ello World'), 'H ello World');
		assert.strictEqual(collapseWhitespace('  Hell    o    World'), 'Hell o World');
	});

	it('removeSpecialChars', () => {
		assert.strictEqual(removeSpecialChars('1　2！3☆4＠5＋6─🌍'), '123456');
		assert.strictEqual(removeSpecialChars('Hello, World!'), 'HelloWorld');
		assert.strictEqual(removeSpecialChars('12 34-56,78=90'), '1234567890');
		assert.strictEqual(
			removeSpecialChars('ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'),
			'ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'
		);
		assert.strictEqual(removeSpecialChars('Hello World!', ' '), 'Hello World');
		assert.strictEqual(removeSpecialChars('Hello-qsu & World!', '-&!'), 'Hello-qsu&World!');
	});

	it('removeNewlines', () => {
		assert.strictEqual(
			removeNewlines(`te
st`),
			'test'
		);
		assert.strictEqual(removeNewlines('te\rst'), 'test');
		assert.strictEqual(removeNewlines('te\nst'), 'test');
		assert.strictEqual(removeNewlines('te\r\nst'), 'test');
		assert.strictEqual(removeNewlines('te\r\nst', '|'), 'te|st');
		assert.strictEqual(removeNewlines('t\ne\r\ns\rt', '-'), 't-e-s-t');
	});

	it('replaceEnclosed', () => {
		assert.strictEqual(replaceEnclosed('hello[world]', '[', ']'), 'hello');
		assert.strictEqual(replaceEnclosed("hello'test'world'test2'!!", "'", "'"), 'helloworld!!');
		assert.strictEqual(replaceEnclosed('hello[w]o[r][[l]][[d]]!!', '[', ']'), 'helloo]]!!');
		assert.strictEqual(replaceEnclosed('abc[hello]def[world]g[!!!]', '[', ']'), 'abcdefg');
		assert.strictEqual(replaceEnclosed('abc<<def>>ghi<<jkl>>mn', '<<', '>>'), 'abcghimn');
		assert.strictEqual(replaceEnclosed('hell1o2~', '1', '2', 'o!'), 'hello!~');
	});

	it('capitalizeFirst', () => {
		assert.strictEqual(capitalizeFirst('t'), 'T');
		assert.strictEqual(capitalizeFirst('test'), 'Test');
		assert.strictEqual(capitalizeFirst('tEST'), 'TEST');
		assert.strictEqual(capitalizeFirst('testWords'), 'TestWords');
	});

	it('uncapitalizeFirst', () => {
		assert.strictEqual(uncapitalizeFirst(''), '');
		assert.strictEqual(uncapitalizeFirst('T'), 't');
		assert.strictEqual(uncapitalizeFirst('Test'), 'test');
		assert.strictEqual(uncapitalizeFirst('TEST'), 'tEST');
		assert.strictEqual(uncapitalizeFirst('TestWords'), 'testWords');
		assert.strictEqual(uncapitalizeFirst('test'), 'test');
		assert.strictEqual(uncapitalizeFirst('한글'), '한글');
	});

	it('capitalizeEachSentence', () => {
		assert.strictEqual(capitalizeEachSentence('hello. world'), 'Hello. World');
		assert.strictEqual(capitalizeEachSentence('hello. 1world'), 'Hello. 1World');
		assert.strictEqual(capitalizeEachSentence('HeLLO,world'), 'HeLLO,world');
		assert.strictEqual(capitalizeEachSentence('H. e. l. l. o.'), 'H. E. L. L. O.');
		assert.strictEqual(capitalizeEachSentence('hello!world!', '!'), 'Hello!World!');
	});

	it('capitalizeEachWord', () => {
		assert.strictEqual(capitalizeEachWord('hello, world!'), 'Hello, World!');
		assert.strictEqual(capitalizeEachWord('test'), 'Test');
		assert.strictEqual(capitalizeEachWord('testWords'), 'TestWords');
		assert.strictEqual(capitalizeEachWord('testWords', true), 'Testwords');
		assert.strictEqual(
			capitalizeEachWord('this is the test sentence.', true),
			'This is the Test Sentence.'
		);
	});

	it('strCount', () => {
		assert.strictEqual(strCount('hello', 'l'), 2);
		assert.strictEqual(strCount('abcdABCD', 'a'), 1);
		assert.strictEqual(strCount('aaaaaa', 'a'), 6);
		assert.strictEqual(strCount('hello', 'll'), 1);
	});

	it('strShuffle', () => {
		assert(strShuffle('hi'));
		assert(strShuffle('abc def ghi'));
	});

	it('strRandom', () => {
		assert(strRandom(5));
		assert(strRandom(10));
	});

	it('strMaskRandom', () => {
		assert(strMaskRandom('test', 2));
		assert(strMaskRandom('test', 2, '#'));
	});

	it('truncate', () => {
		assert.strictEqual(truncate('test', 2), 'te');
		assert.strictEqual(truncate('hello', 5, '...'), 'hello');
		assert.strictEqual(truncate('test', 1, '...'), 't...');

		// Counted in code points, so an astral character is one and is never cut in half.
		assert.strictEqual(truncate('a\u{1F44B}b', 2), 'a\u{1F44B}');
		assert.strictEqual(truncate('\u{1F44B}\u{1F44B}\u{1F44B}', 2, '...'), '\u{1F44B}\u{1F44B}...');
		assert.strictEqual(truncate('\u{1F44B}\u{1F44B}', 2), '\u{1F44B}\u{1F44B}');
	});

	it('truncateSentence', () => {
		assert.strictEqual(
			truncateSentence('hello. this is test string.', 10, '.'),
			'hello. this is test string.'
		);
		assert.strictEqual(
			truncateSentence('hello. this is test. bye.', 20, '.'),
			'hello. this is test.'
		);
		assert.strictEqual(truncateSentence('hello.. this is test', 20, '.'), 'hello.. this is test');
		assert.strictEqual(truncateSentence('abc. def. ghi.', 6, '.'), 'abc. def.');
		assert.strictEqual(truncateSentence('abc. def. ghi.', 20, '.'), 'abc. def. ghi.');
		assert.strictEqual(truncateSentence('hello.. this is test', 21, '.'), 'hello.. this is test');
		assert.strictEqual(truncateSentence('hello.. this is test', 19, '.'), 'hello.. this is test');
		assert.strictEqual(
			truncateSentence('hello-this-is-test-string-bye', 14, '-'),
			'hello-this-is-'
		);

		// The default covers the full stop as every script writes it.
		assert.strictEqual(
			truncateSentence('안녕하세요。반갑습니다。좋은 하루。', 8),
			'안녕하세요。반갑습니다。'
		);
		assert.strictEqual(
			truncateSentence('これはテストです。よろしくお願いします。さようなら。', 10),
			'これはテストです。よろしくお願いします。'
		);
		assert.strictEqual(truncateSentence('你好。这是测试。再见。', 5), '你好。这是测试。');
		assert.strictEqual(truncateSentence('テストです｡もう一度｡', 4), 'テストです｡');
		assert.strictEqual(truncateSentence('ａｂ．ｃｄ．ｅｆ．', 3), 'ａｂ．');
		assert.strictEqual(truncateSentence('hello. こんにちは。bye.', 8), 'hello. こんにちは。');

		// An explicit ending character still means only that one.
		assert.strictEqual(truncateSentence('안녕。하세요。반가워.', 3, '.'), '안녕。하세요。반가워.');

		// An array accepts several at once, and the longest one is matched first.
		assert.strictEqual(truncateSentence('a. b! c? d.', 4, ['.', '!', '?']), 'a. b!');
		assert.strictEqual(truncateSentence('a...b.c', 2, ['.', '...']), 'a...');
		assert.strictEqual(truncateSentence('hello. this is test', 3, []), 'hello. this is test');

		// The expected length is counted in code points, so an astral character is one.
		assert.strictEqual(
			truncateSentence('\u{1F44B}\u{1F44B}.ab.cd.', 5, '.'),
			'\u{1F44B}\u{1F44B}.ab.'
		);
	});

	it('split', () => {
		assert.deepStrictEqual(split('hello,js world', ['']), ['hello,js world']);
		assert.deepStrictEqual(split('hello,js world', [',', ' ']), ['hello', 'js', 'world']);
		assert.deepStrictEqual(split('hello,js world', ',', ' '), ['hello', 'js', 'world']);
		assert.deepStrictEqual(split('hello, js world', ', '), ['hello', 'js world']);
		assert.deepStrictEqual(split('hello, js world', 'hello', ' js ', 'w'), ['', ',', '', 'orld']);
		assert.deepStrictEqual(split('hello+js.world', '+', '.'), ['hello', 'js', 'world']);
		assert.deepStrictEqual(split('hello+?js world', '+?'), ['hello', 'js world']);
		assert.deepStrictEqual(split('hello j\\s world', '\\s'), ['hello j', ' world']);
	});

	it('strUnique', () => {
		assert.strictEqual(strUnique('ababcdcd'), 'abcd');
		assert.strictEqual(strUnique('abc--11111'), 'abc-1');
	});

	it('strToCharCodes', () => {
		assert.deepStrictEqual(
			strToCharCodes('hello-world.'),
			[104, 101, 108, 108, 111, 45, 119, 111, 114, 108, 100, 46]
		);
		assert.deepStrictEqual(strToCharCodes('1 2 3 4 5'), [49, 32, 50, 32, 51, 32, 52, 32, 53]);
	});

	it('joinUrl', () => {
		assert.strictEqual(joinUrl('https://example.com'), 'https://example.com');
		assert.strictEqual(joinUrl('https://example.com', null, 'world/'), 'https://example.com/world');
		assert.strictEqual(joinUrl(null, 'https://example.com', 'world/'), 'https://example.com/world');
		assert.strictEqual(
			joinUrl('https://example.com', 'hello', '#fragment'),
			'https://example.com/hello/#fragment'
		);
		assert.strictEqual(
			joinUrl('https://example.com', 'hello', 'world'),
			'https://example.com/hello/world'
		);
		assert.strictEqual(
			joinUrl('https://example.com', '/hello', '/world', 'bye'),
			'https://example.com/hello/world/bye'
		);
		assert.strictEqual(
			joinUrl('https://example.com', '/hello', '/world', '?text=bye&a=b'),
			'https://example.com/hello/world?text=bye&a=b'
		);
		assert.strictEqual(
			joinUrl('example.com', '/hello', '/world', 'bye'),
			'example.com/hello/world/bye'
		);
		assert.strictEqual(joinUrl('hello', '/world', 'bye'), 'hello/world/bye');
	});

	it('strByteLength', () => {
		assert.strictEqual(strByteLength(''), 0);
		assert.strictEqual(strByteLength('abcde'), 5);
		assert.strictEqual(strByteLength('a1b2c3 d4e5f6'), 13);
		assert.strictEqual(strByteLength('ㄱㄴㄷ'), 9);
		assert.strictEqual(strByteLength('가나다123'), 12);
		assert.strictEqual(strByteLength('😀😀😀'), 12);
		assert.strictEqual(strByteLength('😀'), 4);
		assert.strictEqual(strByteLength('123 ABcd 가나다😀'), 22);
	});

	it('getPlaceholderKeys', () => {
		assert.deepStrictEqual(getPlaceholderKeys('', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{  }', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{  }', '{', '}', true), ['  ']);
		assert.deepStrictEqual(getPlaceholderKeys('}{}', '{', '}'), ['']);
		assert.deepStrictEqual(getPlaceholderKeys('{a}', '{', '}'), ['a']);
		assert.deepStrictEqual(getPlaceholderKeys('{a-b_c$d$}', '{', '}'), ['a-b_c$d$']);
		assert.deepStrictEqual(getPlaceholderKeys('{a-b_ c$d$}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{a] [b} [c] {d}', '{', ']'), ['a']);
		assert.deepStrictEqual(getPlaceholderKeys('{{a}}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{{a}}', '{{', '}}'), ['a']);
		assert.deepStrictEqual(getPlaceholderKeys('{{aaa}} {bbb}', '{', '}'), ['bbb']);
		assert.deepStrictEqual(getPlaceholderKeys('{a{a{a}}}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{a{a{a} }}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{a}}}}}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{{{a}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{{}{{}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('{{aaa}} {{bbb}} {{}}', '{{', '}}'), [
			'aaa',
			'bbb',
			''
		]);
		assert.deepStrictEqual(getPlaceholderKeys('abc {def} ghi', '{', '}'), ['def']);
		assert.deepStrictEqual(getPlaceholderKeys('abc {def}{def} ghi\n\n{def}{{def}}', '{', '}'), [
			'def',
			'def',
			'def'
		]);
		assert.deepStrictEqual(getPlaceholderKeys('abc {} {} {def} ghi', '{', '}'), ['', '', 'def']);
		assert.deepStrictEqual(getPlaceholderKeys('abc {def}{g}{hi}jk', '{', '}'), ['def', 'g', 'hi']);
		assert.deepStrictEqual(getPlaceholderKeys('abc \\{def} {ghi\\}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('abc \\{def}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('abc {d{ef}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('abc {{def}}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('abcdefghi', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('abc[def][ghi] [] [] []', '[', ']'), [
			'def',
			'ghi',
			'',
			'',
			''
		]);
		assert.deepStrictEqual(getPlaceholderKeys('abc {d\nef}', '{', '}'), []);
		assert.deepStrictEqual(getPlaceholderKeys('abc {def}\n\n{ghi}\n\n{a\n}', '{', '}'), [
			'def',
			'ghi'
		]);
	});

	it('strToCamelCase', () => {
		assert.strictEqual(strToCamelCase(''), '');
		assert.strictEqual(strToCamelCase('foo bar'), 'fooBar');
		assert.strictEqual(strToCamelCase('--foo-bar--'), 'fooBar');
		assert.strictEqual(strToCamelCase('__FOO_BAR__'), 'fooBar');
		assert.strictEqual(strToCamelCase('camelCase'), 'camelCase');
		assert.strictEqual(strToCamelCase('PascalCase'), 'pascalCase');
		assert.strictEqual(strToCamelCase('XMLHttpRequest'), 'xmlHttpRequest');
		assert.strictEqual(strToCamelCase('abc12def'), 'abc12Def');
		assert.strictEqual(strToCamelCase('한글English혼합'), '한글English혼합');
	});

	it('strToSnakeCase', () => {
		assert.strictEqual(strToSnakeCase(''), '');
		assert.strictEqual(strToSnakeCase('foo bar'), 'foo_bar');
		assert.strictEqual(strToSnakeCase('--foo-bar--'), 'foo_bar');
		assert.strictEqual(strToSnakeCase('__FOO_BAR__'), 'foo_bar');
		assert.strictEqual(strToSnakeCase('camelCase'), 'camel_case');
		assert.strictEqual(strToSnakeCase('XMLHttpRequest'), 'xml_http_request');
		assert.strictEqual(strToSnakeCase('abc12def'), 'abc_12_def');
		assert.strictEqual(strToSnakeCase('한글English혼합'), '한글_english_혼합');
	});

	it('strToKebabCase', () => {
		assert.strictEqual(strToKebabCase(''), '');
		assert.strictEqual(strToKebabCase('foo bar'), 'foo-bar');
		assert.strictEqual(strToKebabCase('--foo-bar--'), 'foo-bar');
		assert.strictEqual(strToKebabCase('__FOO_BAR__'), 'foo-bar');
		assert.strictEqual(strToKebabCase('camelCase'), 'camel-case');
		assert.strictEqual(strToKebabCase('XMLHttpRequest'), 'xml-http-request');
		assert.strictEqual(strToKebabCase('abc12def'), 'abc-12-def');
		assert.strictEqual(strToKebabCase('한글English혼합'), '한글-english-혼합');
	});

	it('strToPascalCase', () => {
		assert.strictEqual(strToPascalCase(''), '');
		assert.strictEqual(strToPascalCase('foo bar'), 'FooBar');
		assert.strictEqual(strToPascalCase('--foo-bar--'), 'FooBar');
		assert.strictEqual(strToPascalCase('__FOO_BAR__'), 'FooBar');
		assert.strictEqual(strToPascalCase('camelCase'), 'CamelCase');
		assert.strictEqual(strToPascalCase('XMLHttpRequest'), 'XmlHttpRequest');
		assert.strictEqual(strToPascalCase('abc12def'), 'Abc12Def');
		assert.strictEqual(strToPascalCase('한글English혼합'), '한글English혼합');
	});

	it('strToConstantCase', () => {
		assert.strictEqual(strToConstantCase(''), '');
		assert.strictEqual(strToConstantCase('foo bar'), 'FOO_BAR');
		assert.strictEqual(strToConstantCase('--foo-bar--'), 'FOO_BAR');
		assert.strictEqual(strToConstantCase('__FOO_BAR__'), 'FOO_BAR');
		assert.strictEqual(strToConstantCase('camelCase'), 'CAMEL_CASE');
		assert.strictEqual(strToConstantCase('XMLHttpRequest'), 'XML_HTTP_REQUEST');
		assert.strictEqual(strToConstantCase('abc12def'), 'ABC_12_DEF');
		assert.strictEqual(strToConstantCase('한글English혼합'), '한글_ENGLISH_혼합');
	});

	it('pad', () => {
		// `both` is the default, and the extra character goes to the end.
		assert.strictEqual(pad('abc', 8), '  abc   ');
		assert.strictEqual(pad('abc', 8, { char: '_-' }), '_-abc_-_');
		assert.strictEqual(pad('abc', 8, { position: 'start' }), '     abc');
		assert.strictEqual(pad('abc', 8, { position: 'end' }), 'abc     ');
		assert.strictEqual(pad('5', 3, { position: 'start', char: '0' }), '005');
		// Already long enough, so it is returned untouched.
		assert.strictEqual(pad('abcdefgh', 8), 'abcdefgh');
		assert.strictEqual(pad('abcdefghi', 8), 'abcdefghi');
		assert.strictEqual(pad('abc', 0), 'abc');
		// An empty padding character has nothing to pad with.
		assert.strictEqual(pad('abc', 8, { char: '' }), 'abc');
		assert.strictEqual(pad('', 4, { char: '-' }), '----');
		// Counted in code points, so an emoji is one character.
		assert.strictEqual(pad('😀', 3, { position: 'end', char: '-' }), '😀--');
	});

	it('words', () => {
		assert.deepStrictEqual(words(''), []);
		assert.deepStrictEqual(words('   '), []);
		assert.deepStrictEqual(words('hello world'), ['hello', 'world']);
		assert.deepStrictEqual(words('fred, barney, & pebbles'), ['fred', 'barney', 'pebbles']);
		assert.deepStrictEqual(words('--foo-bar--'), ['foo', 'bar']);
		assert.deepStrictEqual(words('constant_case_VALUE'), ['constant', 'case', 'VALUE']);
		// camelCase and PascalCase boundaries.
		assert.deepStrictEqual(words('camelCase'), ['camel', 'Case']);
		assert.deepStrictEqual(words('PascalCase'), ['Pascal', 'Case']);
		// The last capital of a run of capitals opens the next word.
		assert.deepStrictEqual(words('XMLHttpRequest'), ['XML', 'Http', 'Request']);
		assert.deepStrictEqual(words('ABC'), ['ABC']);
		assert.deepStrictEqual(words('ABCd'), ['AB', 'Cd']);
		// Digits are their own words.
		assert.deepStrictEqual(words('abc12def'), ['abc', '12', 'def']);
		assert.deepStrictEqual(words('version 2 of qsu'), ['version', '2', 'of', 'qsu']);
		// Uncased scripts have no camelCase boundary, and switch words on a cased letter.
		assert.deepStrictEqual(words('한글English혼합'), ['한글', 'English', '혼합']);
		assert.deepStrictEqual(words('안녕하세요 반갑습니다'), ['안녕하세요', '반갑습니다']);
		// Accents stay attached, whether precomposed or decomposed.
		assert.deepStrictEqual(words('Déjà Vu'), ['Déjà', 'Vu']);
		assert.deepStrictEqual(words('De\u0301ja\u0300 Vu'), ['De\u0301ja\u0300', 'Vu']);
		assert.deepStrictEqual(words("don't"), ['don', 't']);
		// `ß` is a lowercase letter even though it upper-cases to two characters.
		assert.deepStrictEqual(words('Straße'), ['Straße']);
	});

	it('deburr', () => {
		assert.strictEqual(deburr(''), '');
		assert.strictEqual(deburr('hello'), 'hello');
		assert.strictEqual(deburr('déjà vu'), 'deja vu');
		assert.strictEqual(deburr('Łódź'), 'Lodz');
		assert.strictEqual(deburr('Ærøskøbing'), 'Aeroskobing');
		assert.strictEqual(deburr('Þór'), 'Thor');
		assert.strictEqual(deburr('Straße'), 'Strasse');
		assert.strictEqual(deburr('Ĳsselmeer'), 'IJsselmeer');
		assert.strictEqual(deburr('Œuvre'), 'Oeuvre');
		// A decomposed accent is dropped along with the precomposed ones.
		assert.strictEqual(deburr('Cafe\u0301'), 'Cafe');
		assert.strictEqual(deburr('De\u0301ja\u0300 Vu'), 'Deja Vu');
		// Anything outside Latin-1 Supplement and Latin Extended-A is left as it is.
		assert.strictEqual(deburr('한글'), '한글');
		assert.strictEqual(deburr('Ti\u1ebfng Vi\u1ec7t'), 'Ti\u1ebfng Vi\u1ec7t');
	});

	it('detectLanguages', () => {
		const only = (language: string) => [{ language, ratio: 1 }];

		// Nothing to count: no input, or no letter of a script the function knows.
		assert.deepStrictEqual(detectLanguages(''), []);
		assert.deepStrictEqual(detectLanguages(null), []);
		assert.deepStrictEqual(detectLanguages('   '), []);
		assert.deepStrictEqual(detectLanguages('12345'), []);
		assert.deepStrictEqual(detectLanguages('!!! ???'), []);
		assert.deepStrictEqual(detectLanguages('\u{1f389}'), []);

		// A script only one language writes names that language.
		const scripts: [string, string][] = [
			['안녕하세요', 'ko'],
			['ㅋㅋㅋ', 'ko'],
			['こんにちは', 'ja'],
			['ﾃｽﾄ', 'ja'],
			['你好世界', 'zh'],
			['สวัสดีครับ', 'th'],
			['Καλημέρα', 'el'],
			['שלום', 'he'],
			['नमस्ते', 'hi'],
			['გამარჯობა', 'ka'],
			['Բարեւ', 'hy'],
			['নমস্কার', 'bn'],
			['ਸਤਿ', 'pa'],
			['નમસ્તે', 'gu'],
			['ନମସ୍କାର', 'or'],
			['வணக்கம்', 'ta'],
			['నమస్కారం', 'te'],
			['ನಮಸ್ಕಾರ', 'kn'],
			['നമസ്കാരം', 'ml'],
			['ආයුබෝවන්', 'si'],
			['ສະບາຍດີ', 'lo'],
			['བཀྲ་ཤིས', 'bo'],
			['မင်္ဂလာပါ', 'my'],
			['ሰላም', 'am'],
			['សួស្តី', 'km'],
			['ᠮᠣᠩᠭᠣᠯ', 'mn']
		];

		for (const [text, language] of scripts) {
			assert.deepStrictEqual(detectLanguages(text), only(language), text);
		}

		// Languages that share a script are told apart by their common words and letters.
		const sentences: [string, string][] = [
			['The weather is nice today, so we are going to the park.', 'en'],
			['El tiempo está muy bien hoy, así que vamos al parque.', 'es'],
			["Il fait beau aujourd'hui, alors nous allons au parc.", 'fr'],
			['Das Wetter ist heute schön, also gehen wir in den Park.', 'de'],
			['O tempo está bom hoje, então vamos ao parque.', 'pt'],
			['Oggi il tempo è bello, quindi andiamo al parco.', 'it'],
			['Avui fa bon temps, així que anem al parc.', 'ca'],
			['Het weer is vandaag mooi, dus we gaan naar het park.', 'nl'],
			['Vädret är fint idag, så vi går till parken.', 'sv'],
			['Vejret er godt i dag, så vi går i parken.', 'da'],
			['Hun sa at toget var forsinket igjen.', 'no'],
			['Sää on tänään kaunis, joten menemme puistoon.', 'fi'],
			['Pogoda jest dzisiaj ładna, więc idziemy do parku.', 'pl'],
			['Počasí je dnes hezké, takže jdeme do parku.', 'cs'],
			['Na tomto projekte pracujem už tri mesiace.', 'sk'],
			['Danas je lijepo vrijeme, pa idemo u park.', 'hr'],
			['Vremea este frumoasă astăzi, așa că mergem în parc.', 'ro'],
			['Ma szép az idő, ezért elmegyünk a parkba.', 'hu'],
			['Bugün hava çok güzel, bu yüzden parka gidiyoruz.', 'tr'],
			['Hôm nay trời đẹp, vì vậy chúng tôi đi công viên.', 'vi'],
			['Cuaca hari ini cerah, jadi kami pergi ke taman.', 'id'],
			['Сегодня хорошая погода, поэтому мы идём в парк.', 'ru'],
			['Сьогодні гарна погода, тому ми йдемо в парк.', 'uk'],
			['Днес времето е хубаво, затова отиваме в парка.', 'bg'],
			['Данас је лепо време, па идемо у парк.', 'sr'],
			['الطقس جميل اليوم، لذلك سنذهب إلى الحديقة.', 'ar'],
			['امروز هوا خوب است، پس به پارک می\u200cرویم.', 'fa'],
			['آج موسم اچھا ہے، اس لیے ہم پارک جا رہے ہیں۔', 'ur']
		];

		for (const [text, language] of sentences) {
			assert.deepStrictEqual(detectLanguages(text), only(language), text);
		}

		// A single word is enough when it belongs to one language.
		const greetings: [string, string][] = [
			['Hello', 'en'],
			['Gracias', 'es'],
			['Bonjour', 'fr'],
			['Danke', 'de'],
			['Obrigado', 'pt'],
			['Grazie', 'it'],
			['Gràcies', 'ca'],
			['Dank je', 'nl'],
			['Tack', 'sv'],
			['Takk', 'no'],
			['Kiitos', 'fi'],
			['Dziękuję', 'pl'],
			['Děkuji', 'cs'],
			['Ďakujem', 'sk'],
			['Hvala', 'hr'],
			['Mulțumesc', 'ro'],
			['Köszönöm', 'hu'],
			['Merhaba', 'tr'],
			['Xin chào', 'vi'],
			['Terima kasih', 'id'],
			['Привет, как дела?', 'ru'],
			['Привіт, як справи?', 'uk'],
			['Здравей, как си?', 'bg'],
			['Здраво, како си?', 'sr'],
			['مرحبا', 'ar'],
			['سلام، حال شما چطور است؟', 'fa'],
			['آپ کیسے ہیں؟', 'ur']
		];

		for (const [text, language] of greetings) {
			assert.deepStrictEqual(detectLanguages(text), only(language), text);
		}

		// Endings and runs of letters speak for words that are on no list: `watched` and `night`
		// outweigh `we` and `die`, which Dutch shares, and `naj-` and `sj` tell Slovak from Czech
		// and Norwegian from Danish.
		assert.deepStrictEqual(detectLanguages('We watched Die Hard last night.'), only('en'));
		assert.deepStrictEqual(detectLanguages('Kde je najbližšia stanica?'), only('sk'));
		assert.deepStrictEqual(
			detectLanguages('Jeg har jobbet med dette prosjektet i tre måneder.'),
			only('no')
		);

		// Close languages are told apart by the words that differ between them.
		const pairs: [string, string][] = [
			['Nevím', 'cs'],
			['Neviem', 'sk'],
			['Ne znam', 'hr'],
			['Jeg ved det ikke', 'da'],
			['Jeg vet ikke', 'no'],
			['No lo sé', 'es'],
			['No ho sé', 'ca']
		];

		for (const [text, language] of pairs) {
			assert.deepStrictEqual(detectLanguages(text), only(language), text);
		}

		// With nothing to go by, a script falls back to its first language.
		assert.deepStrictEqual(detectLanguages('getUserName'), only('en'));
		assert.deepStrictEqual(detectLanguages('a'), only('en'));
		assert.deepStrictEqual(detectLanguages('Иван'), only('ru'));
		assert.deepStrictEqual(detectLanguages('محمد'), only('ar'));

		// Han characters follow the kana or Hangul of their sentence, and are Chinese without.
		assert.deepStrictEqual(detectLanguages('東京に行きます'), only('ja'));
		assert.deepStrictEqual(detectLanguages('北京'), only('zh'));
		assert.deepStrictEqual(detectLanguages('대한민국(大韓民國)'), only('ko'));
		assert.deepStrictEqual(detectLanguages('東京に住んでいます。北京是中国的首都。'), [
			{ language: 'ja', ratio: 9 / 17 },
			{ language: 'zh', ratio: 8 / 17 }
		]);
		assert.deepStrictEqual(detectLanguages('도쿄는 東京です。'), [
			{ language: 'ja', ratio: 4 / 7 },
			{ language: 'ko', ratio: 3 / 7 }
		]);

		// The ratio counts letters only, and a tie goes to the language that appears first.
		assert.deepStrictEqual(detectLanguages('안녕 Hello'), [
			{ language: 'en', ratio: 5 / 7 },
			{ language: 'ko', ratio: 2 / 7 }
		]);
		assert.deepStrictEqual(detectLanguages('안녕하세요 Hello'), [
			{ language: 'ko', ratio: 0.5 },
			{ language: 'en', ratio: 0.5 }
		]);
		assert.deepStrictEqual(detectLanguages('Hello 안녕하세요'), [
			{ language: 'en', ratio: 0.5 },
			{ language: 'ko', ratio: 0.5 }
		]);
		assert.deepStrictEqual(detectLanguages('오늘 회의는 Zoom으로 진행합니다.'), [
			{ language: 'ko', ratio: 0.75 },
			{ language: 'en', ratio: 0.25 }
		]);
		assert.deepStrictEqual(detectLanguages('abc 123 !!! 가나'), [
			{ language: 'en', ratio: 0.6 },
			{ language: 'ko', ratio: 0.4 }
		]);
		// The vowel signs of `नमस्ते` are combining marks, so it counts as four letters.
		assert.deepStrictEqual(detectLanguages('नमस्ते abcd'), [
			{ language: 'hi', ratio: 0.5 },
			{ language: 'en', ratio: 0.5 }
		]);
		// Counted in code points, so a character outside the Basic Multilingual Plane is one.
		assert.deepStrictEqual(detectLanguages('\u{20000}\u{20001} a'), [
			{ language: 'zh', ratio: 2 / 3 },
			{ language: 'en', ratio: 1 / 3 }
		]);

		// Each sentence is judged on its own.
		assert.deepStrictEqual(detectLanguages("I live in Paris. C'est la vie."), [
			{ language: 'en', ratio: 12 / 21 },
			{ language: 'fr', ratio: 9 / 21 }
		]);
		assert.deepStrictEqual(detectLanguages('Das ist gut. This is good.'), [
			{ language: 'en', ratio: 10 / 19 },
			{ language: 'de', ratio: 9 / 19 }
		]);
		// A sentence too short to decide takes the language of the rest of the text, and one
		// shared word does not move a sentence into another language.
		assert.deepStrictEqual(detectLanguages('Hello. Bonjour le monde, comment ça va ?'), only('fr'));
		assert.deepStrictEqual(
			detectLanguages('We watched Die Hard last night and it was great.'),
			only('en')
		);

		// Case, decomposed accents and Arabic vowel marks do not hide a word.
		assert.deepStrictEqual(detectLanguages('DAS IST GUT'), only('de'));
		assert.deepStrictEqual(detectLanguages("İstanbul'da hava çok güzel."), only('tr'));
		assert.deepStrictEqual(
			detectLanguages("Cafe\u0301 au lait, s'il vous plai\u0302t."),
			only('fr')
		);
		assert.deepStrictEqual(
			detectLanguages('Tie\u0302\u0301ng Vie\u0323\u0302t ra\u0302\u0301t hay.'),
			only('vi')
		);
		assert.deepStrictEqual(detectLanguages('مِنْ فِي'), only('ar'));
		assert.deepStrictEqual(detectLanguages('Ｈｅｌｌｏ'), only('en'));

		// The ratios add up to 1 and run from the largest to the smallest.
		const mixed = detectLanguages(
			'This is a test. 안녕하세요. こんにちは。你好。Bonjour tout le monde, je suis là. Привет!'
		);

		assert.deepStrictEqual(
			mixed.map((item) => item.language),
			['fr', 'en', 'ru', 'ko', 'ja', 'zh']
		);
		assert.ok(Math.abs(mixed.reduce((sum, item) => sum + item.ratio, 0) - 1) < 1e-9);

		for (let i = 1; i < mixed.length; i += 1) {
			assert.ok(mixed[i - 1].ratio >= mixed[i].ratio);
		}
	});

	it('escapeRegExp', () => {
		assert.strictEqual(escapeRegExp(''), '');
		assert.strictEqual(escapeRegExp('hello'), 'hello');
		assert.strictEqual(escapeRegExp('1 + 1 = 2'), '1 \\+ 1 = 2');
		assert.strictEqual(
			escapeRegExp('[qsu](https://qsu.cdget.com/)'),
			'\\[qsu\\]\\(https://qsu\\.cdget\\.com/\\)'
		);
		assert.strictEqual(
			escapeRegExp('^$.*+?()[]{}|\\'),
			'\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\'
		);
		// `-`, `#`, `/` and whitespace are not special outside a character class.
		assert.strictEqual(escapeRegExp('a-z #1 / b'), 'a-z #1 / b');
		// The escaped value matches itself literally.
		assert.strictEqual(new RegExp(escapeRegExp('a.b')).test('a.b'), true);
		assert.strictEqual(new RegExp(escapeRegExp('a.b')).test('axb'), false);
	});
});
