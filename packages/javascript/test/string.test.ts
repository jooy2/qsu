import assert from 'assert';
import { describe, it } from 'node:test';
import {
	trim,
	removeSpecialChar,
	removeNewLine,
	replaceBetween,
	capitalizeFirst,
	capitalizeEverySentence,
	capitalizeEachWords,
	getStrBytes,
	getGroupKeys,
	strCount,
	strShuffle,
	strRandom,
	strBlindRandom,
	truncate,
	truncateExpect,
	split,
	strUnique,
	strToAscii,
	urlJoin,
	words,
	deburr,
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
	it('trim', () => {
		assert.strictEqual(trim(null), null);
		assert.strictEqual(trim(''), '');
		assert.strictEqual(trim(' hello world '), 'hello world');
		assert.strictEqual(trim(' h e l l o  wo     rld  '), 'h e l l o wo rld');
		assert.strictEqual(trim(' H ello World'), 'H ello World');
		assert.strictEqual(trim('  Hell    o    World'), 'Hell o World');
	});

	it('removeSpecialChar', () => {
		assert.strictEqual(removeSpecialChar('1　2！3☆4＠5＋6─🌍'), '123456');
		assert.strictEqual(removeSpecialChar('Hello, World!'), 'HelloWorld');
		assert.strictEqual(removeSpecialChar('12 34-56,78=90'), '1234567890');
		assert.strictEqual(
			removeSpecialChar('ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'),
			'ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'
		);
		assert.strictEqual(removeSpecialChar('Hello World!', ' '), 'Hello World');
		assert.strictEqual(removeSpecialChar('Hello-qsu & World!', '-&!'), 'Hello-qsu&World!');
	});

	it('removeNewLine', () => {
		assert.strictEqual(
			removeNewLine(`te
st`),
			'test'
		);
		assert.strictEqual(removeNewLine('te\rst'), 'test');
		assert.strictEqual(removeNewLine('te\nst'), 'test');
		assert.strictEqual(removeNewLine('te\r\nst'), 'test');
		assert.strictEqual(removeNewLine('te\r\nst', '|'), 'te|st');
		assert.strictEqual(removeNewLine('t\ne\r\ns\rt', '-'), 't-e-s-t');
	});

	it('replaceBetween', () => {
		assert.strictEqual(replaceBetween('hello[world]', '[', ']'), 'hello');
		assert.strictEqual(replaceBetween("hello'test'world'test2'!!", "'", "'"), 'helloworld!!');
		assert.strictEqual(replaceBetween('hello[w]o[r][[l]][[d]]!!', '[', ']'), 'helloo]]!!');
		assert.strictEqual(replaceBetween('abc[hello]def[world]g[!!!]', '[', ']'), 'abcdefg');
		assert.strictEqual(replaceBetween('abc<<def>>ghi<<jkl>>mn', '<<', '>>'), 'abcghimn');
		assert.strictEqual(replaceBetween('hell1o2~', '1', '2', 'o!'), 'hello!~');
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

	it('capitalizeEverySentence', () => {
		assert.strictEqual(capitalizeEverySentence('hello. world'), 'Hello. World');
		assert.strictEqual(capitalizeEverySentence('hello. 1world'), 'Hello. 1World');
		assert.strictEqual(capitalizeEverySentence('HeLLO,world'), 'HeLLO,world');
		assert.strictEqual(capitalizeEverySentence('H. e. l. l. o.'), 'H. E. L. L. O.');
		assert.strictEqual(capitalizeEverySentence('hello!world!', '!'), 'Hello!World!');
	});

	it('capitalizeEachWords', () => {
		assert.strictEqual(capitalizeEachWords('hello, world!'), 'Hello, World!');
		assert.strictEqual(capitalizeEachWords('test'), 'Test');
		assert.strictEqual(capitalizeEachWords('testWords'), 'TestWords');
		assert.strictEqual(capitalizeEachWords('testWords', true), 'Testwords');
		assert.strictEqual(
			capitalizeEachWords('this is the test sentence.', true),
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

	it('strBlindRandom', () => {
		assert(strBlindRandom('test', 2));
		assert(strBlindRandom('test', 2, '#'));
	});

	it('truncate', () => {
		assert.strictEqual(truncate('test', 2), 'te');
		assert.strictEqual(truncate('hello', 5, '...'), 'hello');
		assert.strictEqual(truncate('test', 1, '...'), 't...');
	});

	it('truncateExpect', () => {
		assert.strictEqual(
			truncateExpect('hello. this is test string.', 10, '.'),
			'hello. this is test string.'
		);
		assert.strictEqual(
			truncateExpect('hello. this is test. bye.', 20, '.'),
			'hello. this is test.'
		);
		assert.strictEqual(truncateExpect('hello.. this is test', 20, '.'), 'hello.. this is test');
		assert.strictEqual(truncateExpect('abc. def. ghi.', 6, '.'), 'abc. def.');
		assert.strictEqual(truncateExpect('abc. def. ghi.', 20, '.'), 'abc. def. ghi.');
		assert.strictEqual(truncateExpect('hello.. this is test', 21, '.'), 'hello.. this is test');
		assert.strictEqual(truncateExpect('hello.. this is test', 19, '.'), 'hello.. this is test');
		assert.strictEqual(truncateExpect('hello-this-is-test-string-bye', 14, '-'), 'hello-this-is-');
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

	it('strToAscii', () => {
		assert.deepStrictEqual(
			strToAscii('hello-world.'),
			[104, 101, 108, 108, 111, 45, 119, 111, 114, 108, 100, 46]
		);
		assert.deepStrictEqual(strToAscii('1 2 3 4 5'), [49, 32, 50, 32, 51, 32, 52, 32, 53]);
	});

	it('urlJoin', () => {
		assert.strictEqual(urlJoin('https://example.com'), 'https://example.com');
		assert.strictEqual(urlJoin('https://example.com', null, 'world/'), 'https://example.com/world');
		assert.strictEqual(urlJoin(null, 'https://example.com', 'world/'), 'https://example.com/world');
		assert.strictEqual(
			urlJoin('https://example.com', 'hello', '#fragment'),
			'https://example.com/hello/#fragment'
		);
		assert.strictEqual(
			urlJoin('https://example.com', 'hello', 'world'),
			'https://example.com/hello/world'
		);
		assert.strictEqual(
			urlJoin('https://example.com', '/hello', '/world', 'bye'),
			'https://example.com/hello/world/bye'
		);
		assert.strictEqual(
			urlJoin('https://example.com', '/hello', '/world', '?text=bye&a=b'),
			'https://example.com/hello/world?text=bye&a=b'
		);
		assert.strictEqual(
			urlJoin('example.com', '/hello', '/world', 'bye'),
			'example.com/hello/world/bye'
		);
		assert.strictEqual(urlJoin('hello', '/world', 'bye'), 'hello/world/bye');
	});

	it('getStrBytes', () => {
		assert.strictEqual(getStrBytes(''), 0);
		assert.strictEqual(getStrBytes('abcde'), 5);
		assert.strictEqual(getStrBytes('a1b2c3 d4e5f6'), 13);
		assert.strictEqual(getStrBytes('ㄱㄴㄷ'), 9);
		assert.strictEqual(getStrBytes('가나다123'), 12);
		assert.strictEqual(getStrBytes('😀😀😀'), 12);
		assert.strictEqual(getStrBytes('😀'), 4);
		assert.strictEqual(getStrBytes('123 ABcd 가나다😀'), 22);
	});

	it('getGroupKeys', () => {
		assert.deepStrictEqual(getGroupKeys('', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{  }', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{  }', '{', '}', true), ['  ']);
		assert.deepStrictEqual(getGroupKeys('}{}', '{', '}'), ['']);
		assert.deepStrictEqual(getGroupKeys('{a}', '{', '}'), ['a']);
		assert.deepStrictEqual(getGroupKeys('{a-b_c$d$}', '{', '}'), ['a-b_c$d$']);
		assert.deepStrictEqual(getGroupKeys('{a-b_ c$d$}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{a] [b} [c] {d}', '{', ']'), ['a']);
		assert.deepStrictEqual(getGroupKeys('{{a}}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{{a}}', '{{', '}}'), ['a']);
		assert.deepStrictEqual(getGroupKeys('{{aaa}} {bbb}', '{', '}'), ['bbb']);
		assert.deepStrictEqual(getGroupKeys('{a{a{a}}}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{a{a{a} }}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{a}}}}}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{{{a}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{{}{{}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('{{aaa}} {{bbb}} {{}}', '{{', '}}'), ['aaa', 'bbb', '']);
		assert.deepStrictEqual(getGroupKeys('abc {def} ghi', '{', '}'), ['def']);
		assert.deepStrictEqual(getGroupKeys('abc {def}{def} ghi\n\n{def}{{def}}', '{', '}'), [
			'def',
			'def',
			'def'
		]);
		assert.deepStrictEqual(getGroupKeys('abc {} {} {def} ghi', '{', '}'), ['', '', 'def']);
		assert.deepStrictEqual(getGroupKeys('abc {def}{g}{hi}jk', '{', '}'), ['def', 'g', 'hi']);
		assert.deepStrictEqual(getGroupKeys('abc \\{def} {ghi\\}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('abc \\{def}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('abc {d{ef}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('abc {{def}}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('abcdefghi', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('abc[def][ghi] [] [] []', '[', ']'), [
			'def',
			'ghi',
			'',
			'',
			''
		]);
		assert.deepStrictEqual(getGroupKeys('abc {d\nef}', '{', '}'), []);
		assert.deepStrictEqual(getGroupKeys('abc {def}\n\n{ghi}\n\n{a\n}', '{', '}'), ['def', 'ghi']);
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
