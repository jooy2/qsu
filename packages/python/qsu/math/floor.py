from decimal import Decimal, ROUND_FLOOR

from ._decimalShift import _decimalShift


def floor(value, precision=0):
	# `Decimal(str(value))` reads the shortest representation of the float, which is the
	# decimal the caller wrote. `Decimal(value)` would read the binary double instead, so
	# `0.046` would arrive as `0.04599999999999999...` and `floor(0.046, 2)` would still
	# answer `0.04`, but `floor(2.3, 1)` would answer `2.2`.
	number = Decimal(str(value))

	if not number.is_finite():
		return value

	# Toward negative infinity, so a negative value falls: `floor(-4.006)` is `-5`.
	rounded = _decimalShift(number, precision).to_integral_value(rounding=ROUND_FLOOR)
	result = _decimalShift(rounded, -precision)

	return int(result) if result == result.to_integral_value() else float(result)
