from qsu import (
	capitalizeEachWords,
	capitalizeEverySentence,
	capitalizeFirst,
	getGroupKeys,
	getStrBytes,
	removeNewLine,
	removeSpecialChar,
	replaceBetween,
	split,
	strBlindRandom,
	strCount,
	strRandom,
	strShuffle,
	strToAscii,
	strUnique,
	trim,
	truncate,
	truncateExpect,
	urlJoin,
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
