# Every character of the first entry maps to the second. The set covers the Latin-1
# Supplement and Latin Extended-A blocks, which is what can be expressed as a plain table in
# all three languages: Dart has no Unicode normalization, so a decomposing step that would
# also reach Latin Extended Additional (Vietnamese and the like) is not available.
_DEBURRED_GROUPS = (
	('ÀÁÂÃÄÅĀĂĄ', 'A'),
	('àáâãäåāăą', 'a'),
	('ÇĆĈĊČ', 'C'),
	('çćĉċč', 'c'),
	('ÐĎĐ', 'D'),
	('ðďđ', 'd'),
	('ÈÉÊËĒĔĖĘĚ', 'E'),
	('èéêëēĕėęě', 'e'),
	('ĜĞĠĢ', 'G'),
	('ĝğġģ', 'g'),
	('ĤĦ', 'H'),
	('ĥħ', 'h'),
	('ÌÍÎÏĨĪĬĮİ', 'I'),
	('ìíîïĩīĭįı', 'i'),
	('Ĵ', 'J'),
	('ĵ', 'j'),
	('Ķ', 'K'),
	('ķĸ', 'k'),
	('ĹĻĽĿŁ', 'L'),
	('ĺļľŀł', 'l'),
	('ÑŃŅŇŊ', 'N'),
	('ñńņňŋ', 'n'),
	('ÒÓÔÕÖØŌŎŐ', 'O'),
	('òóôõöøōŏő', 'o'),
	('ŔŖŘ', 'R'),
	('ŕŗř', 'r'),
	('ŚŜŞŠ', 'S'),
	('śŝşšſ', 's'),
	('ŢŤŦ', 'T'),
	('ţťŧ', 't'),
	('ÙÚÛÜŨŪŬŮŰŲ', 'U'),
	('ùúûüũūŭůűų', 'u'),
	('Ŵ', 'W'),
	('ŵ', 'w'),
	('ÝŶŸ', 'Y'),
	('ýÿŷ', 'y'),
	('ŹŻŽ', 'Z'),
	('źżž', 'z'),
	('Æ', 'Ae'),
	('æ', 'ae'),
	('Þ', 'Th'),
	('þ', 'th'),
	('ß', 'ss'),
	('Ĳ', 'IJ'),
	('ĳ', 'ij'),
	('Œ', 'Oe'),
	('œ', 'oe'),
	('ŉ', "'n"),
)

# Built once, so each call is a plain lookup.
_DEBURRED = {
	char: replacement for chars, replacement in _DEBURRED_GROUPS for char in chars
}


def _isCombiningMark(code: int) -> bool:
	# Combining diacritical marks, combining marks for symbols and combining half marks.
	# These carry the accent of a decomposed character, so dropping them handles input that
	# was not written with a precomposed letter.
	return (
		(0x0300 <= code <= 0x036F)
		or (0x20D0 <= code <= 0x20F0)
		or (0xFE20 <= code <= 0xFE2F)
	)


def deburr(str: str) -> str:
	if not str:
		return ''

	result = []

	for char in str:
		if _isCombiningMark(ord(char)):
			continue

		result.append(_DEBURRED.get(char, char))

	return ''.join(result)
