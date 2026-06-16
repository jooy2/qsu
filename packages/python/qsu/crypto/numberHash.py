def numberHash(str: str) -> int:
	if not str:
		return 0

	hash = 0

	for ch in str:
		hash = (hash << 5) - hash + ord(ch)
		# Emulate JS `hash |= 0`: keep low 32 bits and interpret as signed.
		hash &= 0xFFFFFFFF
		if hash >= 0x80000000:
			hash -= 0x100000000

	return hash
