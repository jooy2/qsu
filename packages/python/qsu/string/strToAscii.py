def strToAscii(str: str) -> list:
	# UTF-16 code units, like JavaScript's `charCodeAt` and Dart's `codeUnitAt`.
	# `ord()` returns a code point, so '\U0001f600' gave [128512] here but
	# [55357, 56832] in the other two languages.
	units = str.encode('utf-16-le')

	return [units[i] | (units[i + 1] << 8) for i in range(0, len(units), 2)]
