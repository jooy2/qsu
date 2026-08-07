import re

# Compiled once. Building a pattern inside a function recompiles it on every call.
_unescapedHtmlCharacters = re.compile(r'''[&<>"']''')

# `'` is written as `&#39;` rather than `&apos;`, which HTML 4 did not define and which
# therefore does not survive every parser. The built-in `html.escape` writes `&#x27;`, so
# this is not a wrapper around it.
_htmlEscapes = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
}


def escapeHtml(str: str) -> str:
	if not str:
		return ''

	return _unescapedHtmlCharacters.sub(lambda m: _htmlEscapes[m.group(0)], str)
