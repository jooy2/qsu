def _buildPad(char: str, count: int) -> str:
	"""(Private) Repeat the padding characters and cut them off at `count`, so a
	multi-character `char` is used whole where it fits and truncated where it does not.
	"""
	if count <= 0:
		return ''

	return ''.join(char[i % len(char)] for i in range(count))


def pad(str, length, options=None, **kwargs):
	opts = {**(options or {}), **kwargs}
	text = str or ''
	padChar = opts.get('char', ' ')
	# Counted in code points, which is what Python does natively. JavaScript and Dart index
	# in UTF-16 units, so they walk the string by code point to answer the same way.
	textLength = len(text)

	if textLength >= length or not padChar:
		return text

	total = length - textLength
	position = opts.get('position', 'both')
	startLength = total // 2

	if position == 'start':
		startLength = total
	elif position == 'end':
		startLength = 0

	return _buildPad(padChar, startLength) + text + _buildPad(padChar, total - startLength)
