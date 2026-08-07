import re

# Compiled once. One pass over the whole string, not five sequential replacements: turning
# `&amp;` into `&` first and `&lt;` into `<` afterwards would read `&amp;lt;` as `<`, where
# it has to come back as the literal text `&lt;`.
_escapedHtmlEntities = re.compile(r'&(?:amp|lt|gt|quot|#39);')

_htmlUnescapes = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'",
}


def unescapeHtml(str: str) -> str:
	if not str:
		return ''

	return _escapedHtmlEntities.sub(lambda m: _htmlUnescapes[m.group(0)], str)
