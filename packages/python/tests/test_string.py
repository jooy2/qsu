import re

from qsu import (
	capitalizeEachWords,
	capitalizeEverySentence,
	capitalizeFirst,
	deburr,
	detectLanguage,
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

	# Counted in code points, so an astral character is one and is never cut in half.
	assert truncate('a\U0001f44bb', 2) == 'a\U0001f44b'
	assert truncate('\U0001f44b\U0001f44b\U0001f44b', 2, '...') == '\U0001f44b\U0001f44b...'
	assert truncate('\U0001f44b\U0001f44b', 2) == '\U0001f44b\U0001f44b'


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

	# The default covers the full stop as every script writes it.
	assert truncateExpect('안녕하세요。반갑습니다。좋은 하루。', 8) == '안녕하세요。반갑습니다。'
	assert (
		truncateExpect('これはテストです。よろしくお願いします。さようなら。', 10)
		== 'これはテストです。よろしくお願いします。'
	)
	assert truncateExpect('你好。这是测试。再见。', 5) == '你好。这是测试。'
	assert truncateExpect('テストです｡もう一度｡', 4) == 'テストです｡'
	assert truncateExpect('ａｂ．ｃｄ．ｅｆ．', 3) == 'ａｂ．'
	assert truncateExpect('hello. こんにちは。bye.', 8) == 'hello. こんにちは。'

	# An explicit ending character still means only that one.
	assert truncateExpect('안녕。하세요。반가워.', 3, '.') == '안녕。하세요。반가워.'

	# A list accepts several at once, and the longest one is matched first.
	assert truncateExpect('a. b! c? d.', 4, ['.', '!', '?']) == 'a. b!'
	assert truncateExpect('a...b.c', 2, ['.', '...']) == 'a...'
	assert truncateExpect('hello. this is test', 3, []) == 'hello. this is test'

	# The expected length is counted in code points, so an astral character is one.
	assert truncateExpect('\U0001f44b\U0001f44b.ab.cd.', 5, '.') == '\U0001f44b\U0001f44b.ab.'


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


def test_detectLanguage():
	def only(language):
		return [{'language': language, 'ratio': 1}]

	# Nothing to count: no input, or no letter of a script the function knows.
	assert detectLanguage('') == []
	assert detectLanguage(None) == []
	assert detectLanguage('   ') == []
	assert detectLanguage('12345') == []
	assert detectLanguage('!!! ???') == []
	assert detectLanguage('\U0001f389') == []

	# A script only one language writes names that language.
	scripts = [
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
	]

	for text, language in scripts:
		assert detectLanguage(text) == only(language), text

	# Languages that share a script are told apart by their common words and letters.
	sentences = [
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
	]

	for text, language in sentences:
		assert detectLanguage(text) == only(language), text

	# A single word is enough when it belongs to one language.
	greetings = [
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
	]

	for text, language in greetings:
		assert detectLanguage(text) == only(language), text

	# Endings and runs of letters speak for words that are on no list: `watched` and `night`
	# outweigh `we` and `die`, which Dutch shares, and `naj-` and `sj` tell Slovak from Czech
	# and Norwegian from Danish.
	assert detectLanguage('We watched Die Hard last night.') == only('en')
	assert detectLanguage('Kde je najbližšia stanica?') == only('sk')
	assert detectLanguage('Jeg har jobbet med dette prosjektet i tre måneder.') == only('no')

	# Close languages are told apart by the words that differ between them.
	pairs = [
		('Nevím', 'cs'),
		('Neviem', 'sk'),
		('Ne znam', 'hr'),
		('Jeg ved det ikke', 'da'),
		('Jeg vet ikke', 'no'),
		('No lo sé', 'es'),
		('No ho sé', 'ca'),
	]

	for text, language in pairs:
		assert detectLanguage(text) == only(language), text

	# With nothing to go by, a script falls back to its first language.
	assert detectLanguage('getUserName') == only('en')
	assert detectLanguage('a') == only('en')
	assert detectLanguage('Иван') == only('ru')
	assert detectLanguage('محمد') == only('ar')

	# Han characters follow the kana or Hangul of their sentence, and are Chinese without.
	assert detectLanguage('東京に行きます') == only('ja')
	assert detectLanguage('北京') == only('zh')
	assert detectLanguage('대한민국(大韓民國)') == only('ko')
	assert detectLanguage('東京に住んでいます。北京是中国的首都。') == [
		{'language': 'ja', 'ratio': 9 / 17},
		{'language': 'zh', 'ratio': 8 / 17},
	]
	assert detectLanguage('도쿄는 東京です。') == [
		{'language': 'ja', 'ratio': 4 / 7},
		{'language': 'ko', 'ratio': 3 / 7},
	]

	# The ratio counts letters only, and a tie goes to the language that appears first.
	assert detectLanguage('안녕 Hello') == [
		{'language': 'en', 'ratio': 5 / 7},
		{'language': 'ko', 'ratio': 2 / 7},
	]
	assert detectLanguage('안녕하세요 Hello') == [
		{'language': 'ko', 'ratio': 0.5},
		{'language': 'en', 'ratio': 0.5},
	]
	assert detectLanguage('Hello 안녕하세요') == [
		{'language': 'en', 'ratio': 0.5},
		{'language': 'ko', 'ratio': 0.5},
	]
	assert detectLanguage('오늘 회의는 Zoom으로 진행합니다.') == [
		{'language': 'ko', 'ratio': 0.75},
		{'language': 'en', 'ratio': 0.25},
	]
	assert detectLanguage('abc 123 !!! 가나') == [
		{'language': 'en', 'ratio': 0.6},
		{'language': 'ko', 'ratio': 0.4},
	]
	# The vowel signs of `नमस्ते` are combining marks, so it counts as four letters.
	assert detectLanguage('नमस्ते abcd') == [
		{'language': 'hi', 'ratio': 0.5},
		{'language': 'en', 'ratio': 0.5},
	]
	# Counted in code points, so a character outside the Basic Multilingual Plane is one.
	assert detectLanguage('\U00020000\U00020001 a') == [
		{'language': 'zh', 'ratio': 2 / 3},
		{'language': 'en', 'ratio': 1 / 3},
	]

	# Each sentence is judged on its own.
	assert detectLanguage("I live in Paris. C'est la vie.") == [
		{'language': 'en', 'ratio': 12 / 21},
		{'language': 'fr', 'ratio': 9 / 21},
	]
	assert detectLanguage('Das ist gut. This is good.') == [
		{'language': 'en', 'ratio': 10 / 19},
		{'language': 'de', 'ratio': 9 / 19},
	]
	# A sentence too short to decide takes the language of the rest of the text, and one
	# shared word does not move a sentence into another language.
	assert detectLanguage('Hello. Bonjour le monde, comment ça va ?') == only('fr')
	assert detectLanguage('We watched Die Hard last night and it was great.') == only('en')

	# Case, decomposed accents and Arabic vowel marks do not hide a word.
	assert detectLanguage('DAS IST GUT') == only('de')
	assert detectLanguage("İstanbul'da hava çok güzel.") == only('tr')
	assert detectLanguage("Cafe\u0301 au lait, s'il vous plai\u0302t.") == only('fr')
	assert detectLanguage('Tie\u0302\u0301ng Vie\u0323\u0302t ra\u0302\u0301t hay.') == only('vi')
	assert detectLanguage('مِنْ فِي') == only('ar')
	assert detectLanguage('Ｈｅｌｌｏ') == only('en')

	# The ratios add up to 1 and run from the largest to the smallest.
	mixed = detectLanguage(
		'This is a test. 안녕하세요. こんにちは。你好。Bonjour tout le monde, je suis là. Привет!'
	)

	assert [item['language'] for item in mixed] == ['fr', 'en', 'ru', 'ko', 'ja', 'zh']
	assert abs(sum(item['ratio'] for item in mixed) - 1) < 1e-9

	for i in range(1, len(mixed)):
		assert mixed[i - 1]['ratio'] >= mixed[i]['ratio']


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
