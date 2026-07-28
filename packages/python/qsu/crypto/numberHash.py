def numberHash(str: str) -> int:
	if not str:
		return 0

	hash = 0

	# Iterate UTF-16 code units, like JavaScript's `charCodeAt` and Dart's `codeUnitAt`.
	# `ord()` yields a code point, which gave a different hash for characters outside the
	# BMP ('\U0001f600' hashed to 128512 here but 1772899 in the other two languages).
	units = str.encode('utf-16-le')

	for i in range(0, len(units), 2):
		unit = units[i] | (units[i + 1] << 8)
		hash = (hash << 5) - hash + unit
		# Emulate JS `hash |= 0`: keep low 32 bits and interpret as signed.
		hash &= 0xFFFFFFFF
		if hash >= 0x80000000:
			hash -= 0x100000000

	return hash
