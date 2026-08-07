from decimal import Decimal, ROUND_CEILING

from ._decimalShift import _decimalShift


def ceil(value, precision=0):
	# `Decimal(str(value))` reads the shortest representation of the float, which is the
	# decimal the caller wrote. `Decimal(value)` would read the binary double instead, so
	# `1.1` would arrive as `1.100000000000000088...` and `ceil(1.1, 1)` would answer `1.2`.
	number = Decimal(str(value))

	if not number.is_finite():
		return value

	# Toward positive infinity, so a negative value rises: `ceil(-4.006)` is `-4`.
	rounded = _decimalShift(number, precision).to_integral_value(rounding=ROUND_CEILING)
	result = _decimalShift(rounded, -precision)

	return int(result) if result == result.to_integral_value() else float(result)
