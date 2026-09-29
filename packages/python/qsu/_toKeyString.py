import math
from decimal import Decimal


def _jsNumberString(value: float) -> str:
	"""(Private) A finite, non-zero float written as JavaScript's `String()` writes it.

	Both languages start from the shortest digits that read back as the same float, which is
	what `repr` gives. They differ in where the decimal point goes: JavaScript writes plain
	digits from 1e-6 up to 1e21 and uses `e-7` rather than `e-07` outside that range.
	"""
	parts = Decimal(repr(value)).as_tuple()
	# Only a finite value reaches this point, so the exponent is a number, never `'n'` or `'F'`.
	exponent = int(parts.exponent)
	digits = ''.join(str(digit) for digit in parts.digits)
	stripped = digits.rstrip('0')
	exponent += len(digits) - len(stripped)
	digits = stripped
	length = len(digits)
	# Where the decimal point sits, counted from the first digit.
	point = exponent + length

	if length <= point <= 21:
		text = digits + '0' * (point - length)
	elif 0 < point <= 21:
		text = f'{digits[:point]}.{digits[point:]}'
	elif -6 < point <= 0:
		text = f'0.{"0" * -point}{digits}'
	else:
		mantissa = digits if length == 1 else f'{digits[0]}.{digits[1:]}'
		text = f'{mantissa}e{"+" if point - 1 >= 0 else "-"}{abs(point - 1)}'

	return f'-{text}' if parts.sign else text


def _toKeyString(value) -> str:
	"""(Private) The text a value becomes when it is used as a key, written as JavaScript's
	`String()` writes it, so that `objInvert` and `arrGroupBy` name a key the same way in all
	three packages.

	Python writes `None`, `True` and `False` differently, and has an int/float distinction that
	JavaScript does not: `1.0` is `'1'` there, and `-0.0` is `'0'`.
	"""
	if value is None:
		return 'null'

	if isinstance(value, bool):
		return 'true' if value else 'false'

	if isinstance(value, float):
		if math.isnan(value):
			return 'NaN'
		if math.isinf(value):
			return 'Infinity' if value > 0 else '-Infinity'
		if value == 0:
			return '0'

		return _jsNumberString(value)

	return f'{value}'
