import re

# Compiled once. The set is the union of the characters that are special *outside* a
# character class in JavaScript, Dart and Python: all three read `^ $ . * + ? ( ) [ ] { } |`
# and `\` as syntax. `-` and `#` are special only inside a character class or in verbose
# mode, and `\-` outside a class is a syntax error in JavaScript's unicode mode, so they are
# left alone. This is why `re.escape` is not used: it escapes those as well.
_REGEXP_SPECIAL_CHARACTERS = re.compile(r'[\\^$.*+?()\[\]{}|]')


def escapeRegExp(str: str) -> str:
	if not str:
		return ''

	return _REGEXP_SPECIAL_CHARACTERS.sub(lambda match: '\\' + match.group(0), str)
