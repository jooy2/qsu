from decimal import Decimal


def _decimalShift(value: Decimal, exponent: int) -> Decimal:
	"""(Private) Multiply a decimal by a power of ten by moving its exponent, instead of
	multiplying by `10 ** n`.

	Rebuilding the tuple is exact and, unlike `scaleb` or a multiplication, is not subject
	to the context precision, so a value with more than 28 significant digits survives.
	"""
	sign, digits, currentExponent = value.as_tuple()

	# NaN and infinity carry 'n', 'N' or 'F' as their exponent, and shifting one is
	# meaningless. Callers check `is_finite()` first, so this is never reached.
	if not isinstance(currentExponent, int):
		return value

	return Decimal((sign, digits, currentExponent + exponent))
