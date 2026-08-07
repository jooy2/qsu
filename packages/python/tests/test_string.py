import re

from qsu import (
	capitalizeEachWords,
	capitalizeEverySentence,
	capitalizeFirst,
	deburr,
	escapeRegExp,
	getGroupKeys,
	getStrBytes,
	pad,
	removeNewLine,
	removeSpecialChar,
	replaceBetween,
	split,
	strBlindRandom,
	strCount,
	strRandom,
	strShuffle,
	strToAscii,
	strToCamelCase,
	strToConstantCase,
	strToKebabCase,
	strToPascalCase,
	strToSnakeCase,
	strUnique,
	trim,
	truncate,
	truncateExpect,
	uncapitalizeFirst,
	urlJoin,
	words,
)


def test_trim():
	assert trim(None) is None
	assert trim('') == ''
	assert trim(' hello world ') == 'hello world'
	assert trim(' h e l l o  wo     rld  ') == 'h e l l o wo rld'
	assert trim(' H ello World') == 'H ello World'
	assert trim('  Hell    o    World') == 'Hell o World'


def test_removeSpecialChar():
	assert removeSpecialChar('1　2！3☆4＠5＋6─🌍') == '123456'
	assert removeSpecialChar('Hello, World!') == 'HelloWorld'
	assert removeSpecialChar('12 34-56,78=90') == '1234567890'
	assert removeSpecialChar('ABC가나다ㄱㄴㄷㅏㅑㅓ天地人') == 'ABC가나다ㄱㄴㄷㅏㅑㅓ天地人'
	assert removeSpecialChar('Hello World!', ' ') == 'Hello World'
	assert removeSpecialChar('Hello-qsu & World!', '-&!') == 'Hello-qsu&World!'


def test_removeNewLine():
	assert removeNewLine('te\nst') == 'test'
	assert removeNewLine('te\rst') == 'test'
	assert removeNewLine('te\r\nst') == 'test'
	assert removeNewLine('te\r\nst', '|') == 'te|st'
	assert removeNewLine('t\ne\r\ns\rt', '-') == 't-e-s-t'


def test_replaceBetween():
	assert replaceBetween('hello[world]', '[', ']') == 'hello'
	assert replaceBetween("hello'test'world'test2'!!", "'", "'") == 'helloworld!!'
	assert replaceBetween('hello[w]o[r][[l]][[d]]!!', '[', ']') == 'helloo]]!!'
	assert replaceBetween('abc[hello]def[world]g[!!!]', '[', ']') == 'abcdefg'
	assert replaceBetween('abc<<def>>ghi<<jkl>>mn', '<<', '>>') == 'abcghimn'
	assert replaceBetween('hell1o2~', '1', '2', 'o!') == 'hello!~'


def test_capitalizeFirst():
	assert capitalizeFirst('t') == 'T'
	assert capitalizeFirst('test') == 'Test'
	assert capitalizeFirst('tEST') == 'TEST'
	assert capitalizeFirst('testWords') == 'TestWords'


def test_uncapitalizeFirst():
	assert uncapitalizeFirst('') == ''
	assert uncapitalizeFirst('T') == 't'
	assert uncapitalizeFirst('Test') == 'test'
	assert uncapitalizeFirst('TEST') == 'tEST'
	assert uncapitalizeFirst('TestWords') == 'testWords'
	assert uncapitalizeFirst('test') == 'test'
	assert uncapitalizeFirst('한글') == '한글'


def test_capitalizeEverySentence():
	assert capitalizeEverySentence('hello. world') == 'Hello. World'
	assert capitalizeEverySentence('hello. 1world') == 'Hello. 1World'
	assert capitalizeEverySentence('HeLLO,world') == 'HeLLO,world'
	assert capitalizeEverySentence('H. e. l. l. o.') == 'H. E. L. L. O.'
	assert capitalizeEverySentence('hello!world!', '!') == 'Hello!World!'


def test_capitalizeEachWords():
	assert capitalizeEachWords('hello, world!') == 'Hello, World!'
	assert capitalizeEachWords('test') == 'Test'
	assert capitalizeEachWords('testWords') == 'TestWords'
	assert capitalizeEachWords('testWords', True) == 'Testwords'
	assert (
		capitalizeEachWords('this is the test sentence.', True)
		== 'This is the Test Sentence.'
	)


def test_strCount():
	assert strCount('hello', 'l') == 2
	assert strCount('abcdABCD', 'a') == 1
	assert strCount('aaaaaa', 'a') == 6
	assert strCount('hello', 'll') == 1


def test_strShuffle():
	assert strShuffle('hi')
	assert strShuffle('abc def ghi')


def test_strRandom():
	assert strRandom(5)
	assert strRandom(10)


def test_strBlindRandom():
	assert strBlindRandom('test', 2)
	assert strBlindRandom('test', 2, '#')


def test_truncate():
	assert truncate('test', 2) == 'te'
	assert truncate('hello', 5, '...') == 'hello'
	assert truncate('test', 1, '...') == 't...'


def test_truncateExpect():
	assert (
		truncateExpect('hello. this is test string.', 10, '.')
		== 'hello. this is test string.'
	)
	assert truncateExpect('hello. this is test. bye.', 20, '.') == 'hello. this is test.'
	assert truncateExpect('hello.. this is test', 20, '.') == 'hello.. this is test'
	assert truncateExpect('abc. def. ghi.', 6, '.') == 'abc. def.'
	assert truncateExpect('abc. def. ghi.', 20, '.') == 'abc. def. ghi.'
	assert truncateExpect('hello.. this is test', 21, '.') == 'hello.. this is test'
	assert truncateExpect('hello.. this is test', 19, '.') == 'hello.. this is test'
	assert truncateExpect('hello-this-is-test-string-bye', 14, '-') == 'hello-this-is-'


def test_split():
	assert split('hello,js world', ['']) == ['hello,js world']
	assert split('hello,js world', [',', ' ']) == ['hello', 'js', 'world']
	assert split('hello,js world', ',', ' ') == ['hello', 'js', 'world']
	assert split('hello, js world', ', ') == ['hello', 'js world']
	assert split('hello, js world', 'hello', ' js ', 'w') == ['', ',', '', 'orld']
	assert split('hello+js.world', '+', '.') == ['hello', 'js', 'world']
	assert split('hello+?js world', '+?') == ['hello', 'js world']
	assert split('hello j\\s world', '\\s') == ['hello j', ' world']


def test_strUnique():
	assert strUnique('ababcdcd') == 'abcd'
	assert strUnique('abc--11111') == 'abc-1'


def test_strToAscii():
	assert strToAscii('hello-world.') == [
		104,
		101,
		108,
		108,
		111,
		45,
		119,
		111,
		114,
		108,
		100,
		46,
	]
	assert strToAscii('1 2 3 4 5') == [49, 32, 50, 32, 51, 32, 52, 32, 53]


def test_urlJoin():
	assert urlJoin('https://example.com') == 'https://example.com'
	assert urlJoin('https://example.com', None, 'world/') == 'https://example.com/world'
	assert urlJoin(None, 'https://example.com', 'world/') == 'https://example.com/world'
	assert (
		urlJoin('https://example.com', 'hello', '#fragment')
		== 'https://example.com/hello/#fragment'
	)
	assert (
		urlJoin('https://example.com', 'hello', 'world')
		== 'https://example.com/hello/world'
	)
	assert (
		urlJoin('https://example.com', '/hello', '/world', 'bye')
		== 'https://example.com/hello/world/bye'
	)
	assert (
		urlJoin('https://example.com', '/hello', '/world', '?text=bye&a=b')
		== 'https://example.com/hello/world?text=bye&a=b'
	)
	assert urlJoin('example.com', '/hello', '/world', 'bye') == 'example.com/hello/world/bye'
	assert urlJoin('hello', '/world', 'bye') == 'hello/world/bye'


def test_getStrBytes():
	assert getStrBytes('') == 0
	assert getStrBytes('abcde') == 5
	assert getStrBytes('a1b2c3 d4e5f6') == 13
	assert getStrBytes('ㄱㄴㄷ') == 9
	assert getStrBytes('가나다123') == 12
	assert getStrBytes('😀😀😀') == 12
	assert getStrBytes('😀') == 4
	assert getStrBytes('123 ABcd 가나다😀') == 22


def test_getGroupKeys():
	assert getGroupKeys('', '{', '}') == []
	assert getGroupKeys('{', '{', '}') == []
	assert getGroupKeys('{  }', '{', '}') == []
	assert getGroupKeys('{  }', '{', '}', True) == ['  ']
	assert getGroupKeys('}{}', '{', '}') == ['']
	assert getGroupKeys('{a}', '{', '}') == ['a']
	assert getGroupKeys('{a-b_c$d$}', '{', '}') == ['a-b_c$d$']
	assert getGroupKeys('{a-b_ c$d$}', '{', '}') == []
	assert getGroupKeys('{a] [b} [c] {d}', '{', ']') == ['a']
	assert getGroupKeys('{{a}}', '{', '}') == []
	assert getGroupKeys('{{a}}', '{{', '}}') == ['a']
	assert getGroupKeys('{{aaa}} {bbb}', '{', '}') == ['bbb']
	assert getGroupKeys('{a{a{a}}}', '{', '}') == []
	assert getGroupKeys('{a{a{a} }}', '{', '}') == []
	assert getGroupKeys('{a}}}}}', '{', '}') == []
	assert getGroupKeys('{{{a}', '{', '}') == []
	assert getGroupKeys('{{}{{}', '{', '}') == []
	assert getGroupKeys('{{aaa}} {{bbb}} {{}}', '{{', '}}') == ['aaa', 'bbb', '']
	assert getGroupKeys('abc {def} ghi', '{', '}') == ['def']
	assert getGroupKeys('abc {def}{def} ghi\n\n{def}{{def}}', '{', '}') == [
		'def',
		'def',
		'def',
	]
	assert getGroupKeys('abc {} {} {def} ghi', '{', '}') == ['', '', 'def']
	assert getGroupKeys('abc {def}{g}{hi}jk', '{', '}') == ['def', 'g', 'hi']
	assert getGroupKeys('abc \\{def} {ghi\\}', '{', '}') == []
	assert getGroupKeys('abc \\{def}', '{', '}') == []
	assert getGroupKeys('abc {d{ef}', '{', '}') == []
	assert getGroupKeys('abc {{def}}', '{', '}') == []
	assert getGroupKeys('abcdefghi', '{', '}') == []
	assert getGroupKeys('abc[def][ghi] [] [] []', '[', ']') == [
		'def',
		'ghi',
		'',
		'',
		'',
	]
	assert getGroupKeys('abc {d\nef}', '{', '}') == []
	assert getGroupKeys('abc {def}\n\n{ghi}\n\n{a\n}', '{', '}') == ['def', 'ghi']


def test_strToCamelCase():
	assert strToCamelCase('') == ''
	assert strToCamelCase('foo bar') == 'fooBar'
	assert strToCamelCase('--foo-bar--') == 'fooBar'
	assert strToCamelCase('__FOO_BAR__') == 'fooBar'
	assert strToCamelCase('camelCase') == 'camelCase'
	assert strToCamelCase('PascalCase') == 'pascalCase'
	assert strToCamelCase('XMLHttpRequest') == 'xmlHttpRequest'
	assert strToCamelCase('abc12def') == 'abc12Def'
	assert strToCamelCase('한글English혼합') == '한글English혼합'


def test_strToSnakeCase():
	assert strToSnakeCase('') == ''
	assert strToSnakeCase('foo bar') == 'foo_bar'
	assert strToSnakeCase('--foo-bar--') == 'foo_bar'
	assert strToSnakeCase('__FOO_BAR__') == 'foo_bar'
	assert strToSnakeCase('camelCase') == 'camel_case'
	assert strToSnakeCase('XMLHttpRequest') == 'xml_http_request'
	assert strToSnakeCase('abc12def') == 'abc_12_def'
	assert strToSnakeCase('한글English혼합') == '한글_english_혼합'


def test_strToKebabCase():
	assert strToKebabCase('') == ''
	assert strToKebabCase('foo bar') == 'foo-bar'
	assert strToKebabCase('--foo-bar--') == 'foo-bar'
	assert strToKebabCase('__FOO_BAR__') == 'foo-bar'
	assert strToKebabCase('camelCase') == 'camel-case'
	assert strToKebabCase('XMLHttpRequest') == 'xml-http-request'
	assert strToKebabCase('abc12def') == 'abc-12-def'
	assert strToKebabCase('한글English혼합') == '한글-english-혼합'


def test_strToPascalCase():
	assert strToPascalCase('') == ''
	assert strToPascalCase('foo bar') == 'FooBar'
	assert strToPascalCase('--foo-bar--') == 'FooBar'
	assert strToPascalCase('__FOO_BAR__') == 'FooBar'
	assert strToPascalCase('camelCase') == 'CamelCase'
	assert strToPascalCase('XMLHttpRequest') == 'XmlHttpRequest'
	assert strToPascalCase('abc12def') == 'Abc12Def'
	assert strToPascalCase('한글English혼합') == '한글English혼합'


def test_strToConstantCase():
	assert strToConstantCase('') == ''
	assert strToConstantCase('foo bar') == 'FOO_BAR'
	assert strToConstantCase('--foo-bar--') == 'FOO_BAR'
	assert strToConstantCase('__FOO_BAR__') == 'FOO_BAR'
	assert strToConstantCase('camelCase') == 'CAMEL_CASE'
	assert strToConstantCase('XMLHttpRequest') == 'XML_HTTP_REQUEST'
	assert strToConstantCase('abc12def') == 'ABC_12_DEF'
	assert strToConstantCase('한글English혼합') == '한글_ENGLISH_혼합'


def test_pad():
	# `both` is the default, and the extra character goes to the end.
	assert pad('abc', 8) == '  abc   '
	assert pad('abc', 8, {'char': '_-'}) == '_-abc_-_'
	assert pad('abc', 8, {'position': 'start'}) == '     abc'
	assert pad('abc', 8, {'position': 'end'}) == 'abc     '
	assert pad('5', 3, position='start', char='0') == '005'
	# Already long enough, so it is returned untouched.
	assert pad('abcdefgh', 8) == 'abcdefgh'
	assert pad('abcdefghi', 8) == 'abcdefghi'
	assert pad('abc', 0) == 'abc'
	# An empty padding character has nothing to pad with.
	assert pad('abc', 8, {'char': ''}) == 'abc'
	assert pad('', 4, {'char': '-'}) == '----'
	assert pad(None, 4, {'char': '-'}) == '----'
	# Counted in code points, so an emoji is one character.
	assert pad('😀', 3, position='end', char='-') == '😀--'


def test_words():
	assert words('') == []
	assert words(None) == []
	assert words('   ') == []
	assert words('hello world') == ['hello', 'world']
	assert words('fred, barney, & pebbles') == ['fred', 'barney', 'pebbles']
	assert words('--foo-bar--') == ['foo', 'bar']
	assert words('constant_case_VALUE') == ['constant', 'case', 'VALUE']
	# camelCase and PascalCase boundaries.
	assert words('camelCase') == ['camel', 'Case']
	assert words('PascalCase') == ['Pascal', 'Case']
	# The last capital of a run of capitals opens the next word.
	assert words('XMLHttpRequest') == ['XML', 'Http', 'Request']
	assert words('ABC') == ['ABC']
	assert words('ABCd') == ['AB', 'Cd']
	# Digits are their own words.
	assert words('abc12def') == ['abc', '12', 'def']
	assert words('version 2 of qsu') == ['version', '2', 'of', 'qsu']
	# Uncased scripts have no camelCase boundary, and switch words on a cased letter.
	assert words('한글English혼합') == ['한글', 'English', '혼합']
	assert words('안녕하세요 반갑습니다') == [
		'안녕하세요',
		'반갑습니다',
	]
	# Accents stay attached, whether precomposed or decomposed.
	assert words('D\u00e9j\u00e0 Vu') == ['D\u00e9j\u00e0', 'Vu']
	assert words('De\u0301ja\u0300 Vu') == ['De\u0301ja\u0300', 'Vu']
	assert words("don't") == ['don', 't']
	# `ß` is a lowercase letter even though it upper-cases to two characters.
	assert words('Straße') == ['Straße']


def test_deburr():
	assert deburr('') == ''
	assert deburr(None) == ''
	assert deburr('hello') == 'hello'
	assert deburr('déjà vu') == 'deja vu'
	assert deburr('Łódź') == 'Lodz'
	assert deburr('Ærøskøbing') == 'Aeroskobing'
	assert deburr('Þór') == 'Thor'
	assert deburr('Straße') == 'Strasse'
	assert deburr('Ĳsselmeer') == 'IJsselmeer'
	assert deburr('Œuvre') == 'Oeuvre'
	# A decomposed accent is dropped along with the precomposed ones.
	assert deburr('Cafe\u0301') == 'Cafe'
	assert deburr('De\u0301ja\u0300 Vu') == 'Deja Vu'
	# Anything outside Latin-1 Supplement and Latin Extended-A is left as it is.
	assert deburr('한글') == '한글'
	assert deburr('Ti\u1ebfng Vi\u1ec7t') == 'Ti\u1ebfng Vi\u1ec7t'


def test_escapeRegExp():
	assert escapeRegExp('') == ''
	assert escapeRegExp(None) == ''
	assert escapeRegExp('hello') == 'hello'
	assert escapeRegExp('1 + 1 = 2') == r'1 \+ 1 = 2'
	assert (
		escapeRegExp('[qsu](https://qsu.cdget.com/)')
		== r'\[qsu\]\(https://qsu\.cdget\.com/\)'
	)
	assert escapeRegExp(r'^$.*+?()[]{}|' + '\\') == r'\^\$\.\*\+\?\(\)\[\]\{\}\|' + '\\\\'
	# `-`, `#`, `/` and whitespace are not special outside a character class.
	assert escapeRegExp('a-z #1 / b') == 'a-z #1 / b'
	# The escaped value matches itself literally.
	assert re.search(escapeRegExp('a.b'), 'a.b') is not None
	assert re.search(escapeRegExp('a.b'), 'axb') is None
