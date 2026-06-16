from typing import Any


def _jsParseInt(s: str, radix: int) -> float:
	# Mirror JavaScript's parseInt leniency: parse the leading valid prefix,
	# ignore the rest, and return NaN-like behavior via ValueError to the caller.
	s = s.strip()
	if not s:
		raise ValueError('no digits')

	sign = 1
	index = 0
	if s[0] in ('+', '-'):
		if s[0] == '-':
			sign = -1
		index = 1

	if radix == 16 and s[index : index + 2].lower() == '0x':
		index += 2

	digits = '0123456789abcdefghijklmnopqrstuvwxyz'[:radix]
	start = index
	while index < len(s) and s[index].lower() in digits:
		index += 1

	if index == start:
		raise ValueError('no digits')

	return sign * int(s[start:index], radix)


def safeParseInt(value: Any, fallback: int = 0, radix: int = 10) -> int:
	if not value or len(str(value)) < 1:
		return fallback

	try:
		return _jsParseInt(str(value).split('.')[0], radix)
	except (ValueError, TypeError):
		return fallback
