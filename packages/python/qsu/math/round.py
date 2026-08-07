from decimal import Decimal, ROUND_HALF_UP

from ._decimalShift import _decimalShift


def round(value, precision=0):
	# `Decimal(str(value))` reads the shortest representation of the float, which is the
	# decimal the caller wrote. `Decimal(value)` would read the binary double instead, so
	# `1.005` would arrive as `1.00499999999999989...` and round down to `1`.
	number = Decimal(str(value))

	if not number.is_finite():
		return value

	# `ROUND_HALF_UP` in `decimal` means ties away from zero, unlike the built-in `round`,
	# which uses banker's rounding and answers `0` for `0.5` and `2` for `2.5`.
	rounded = _decimalShift(number, precision).to_integral_value(rounding=ROUND_HALF_UP)
	result = _decimalShift(rounded, -precision)

	return int(result) if result == result.to_integral_value() else float(result)
