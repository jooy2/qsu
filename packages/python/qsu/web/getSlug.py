import re


def _is_boundary(ch: str) -> bool:
	# Both the chosen separator and any separator-like char in the source act as
	# a word boundary, so 'hello-world' stays 'hello-world' instead of doubling.
	return ch.isspace() or ch in ('-', '_')


def _is_ascii_letter(ch: str) -> bool:
	return ('a' <= ch <= 'z') or ('A' <= ch <= 'Z')


def _is_digit(ch: str) -> bool:
	return '0' <= ch <= '9'


def _percent_encode(ch: str) -> str:
	# Encode every special character as its uppercase UTF-8 percent sequence.
	return ''.join(f'%{b:02X}' for b in ch.encode('utf-8'))


def getSlug(
	text: str,
	separator: str = '-',
	includeNumbers: bool = True,
	includeSpecial: bool = False,
	uppercase: bool = False,
	includeNonLatin: bool = True,
	baseUrl: str = '',
) -> str:
	if not isinstance(text, str) or text.strip() == '':
		return ''

	trimmed = text.strip()
	source = trimmed.upper() if uppercase else trimmed.lower()

	# Build the slug word by word. Letters (incl. non-Latin like Korean) are kept
	# as-is; non-Latin letters, digits and special characters are gated by options.
	words = []
	current = ''

	for ch in source:
		if _is_boundary(ch):
			if current:
				words.append(current)
				current = ''
		elif _is_ascii_letter(ch):
			current += ch
		elif ch.isalpha():
			if includeNonLatin:
				current += ch
		elif _is_digit(ch):
			if includeNumbers:
				current += ch
		elif includeSpecial:
			current += _percent_encode(ch)

	if current:
		words.append(current)

	slug = separator.join(words)

	if not slug:
		return ''

	# Prepend the base URL as-is (no protocol required) when one is provided.
	base = baseUrl.strip()

	if not base:
		return slug

	return f'{re.sub(r"/+$", "", base)}/{slug}'
