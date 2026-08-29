// Every character of the first entry maps to the second. The set covers the Latin-1
// Supplement and Latin Extended-A blocks, which is what can be expressed as a plain table
// in all three languages: Dart has no Unicode normalization, so a decomposing step that
// would also reach Latin Extended Additional (Vietnamese and the like) is not available.
const DEBURRED_GROUPS: ReadonlyArray<readonly [string, string]> = [
	['ÀÁÂÃÄÅĀĂĄ', 'A'],
	['àáâãäåāăą', 'a'],
	['ÇĆĈĊČ', 'C'],
	['çćĉċč', 'c'],
	['ÐĎĐ', 'D'],
	['ðďđ', 'd'],
	['ÈÉÊËĒĔĖĘĚ', 'E'],
	['èéêëēĕėęě', 'e'],
	['ĜĞĠĢ', 'G'],
	['ĝğġģ', 'g'],
	['ĤĦ', 'H'],
	['ĥħ', 'h'],
	['ÌÍÎÏĨĪĬĮİ', 'I'],
	['ìíîïĩīĭįı', 'i'],
	['Ĵ', 'J'],
	['ĵ', 'j'],
	['Ķ', 'K'],
	['ķĸ', 'k'],
	['ĹĻĽĿŁ', 'L'],
	['ĺļľŀł', 'l'],
	['ÑŃŅŇŊ', 'N'],
	['ñńņňŋ', 'n'],
	['ÒÓÔÕÖØŌŎŐ', 'O'],
	['òóôõöøōŏő', 'o'],
	['ŔŖŘ', 'R'],
	['ŕŗř', 'r'],
	['ŚŜŞŠ', 'S'],
	['śŝşšſ', 's'],
	['ŢŤŦ', 'T'],
	['ţťŧ', 't'],
	['ÙÚÛÜŨŪŬŮŰŲ', 'U'],
	['ùúûüũūŭůűų', 'u'],
	['Ŵ', 'W'],
	['ŵ', 'w'],
	['ÝŶŸ', 'Y'],
	['ýÿŷ', 'y'],
	['ŹŻŽ', 'Z'],
	['źżž', 'z'],
	['Æ', 'Ae'],
	['æ', 'ae'],
	['Þ', 'Th'],
	['þ', 'th'],
	['ß', 'ss'],
	['Ĳ', 'IJ'],
	['ĳ', 'ij'],
	['Œ', 'Oe'],
	['œ', 'oe'],
	['ŉ', "'n"]
];

let deburred: Map<string, string> | undefined;

// Expanding the groups into a lookup is only worth doing once, and only for callers
// that actually reach `deburr`, so the map is built on first use and reused.
const getDeburred = (): Map<string, string> => {
	if (deburred !== undefined) {
		return deburred;
	}

	deburred = new Map<string, string>();

	for (let i = 0, groupsLength = DEBURRED_GROUPS.length; i < groupsLength; i += 1) {
		const [chars, replacement] = DEBURRED_GROUPS[i];

		for (const char of chars) {
			deburred.set(char, replacement);
		}
	}

	return deburred;
};

// Combining diacritical marks, combining marks for symbols and combining half marks. These
// carry the accent of a decomposed character, so dropping them handles input that was not
// written with a precomposed letter.
const isCombiningMark = (code: number): boolean =>
	(code >= 0x0300 && code <= 0x036f) ||
	(code >= 0x20d0 && code <= 0x20f0) ||
	(code >= 0xfe20 && code <= 0xfe2f);

export function deburr(str: string): string {
	if (!str) {
		return '';
	}

	const table = getDeburred();
	let result = '';

	// Walk code points, not UTF-16 units, so a surrogate pair is never cut in half.
	for (const char of str) {
		if (isCombiningMark(char.codePointAt(0) as number)) {
			continue;
		}

		result += table.get(char) ?? char;
	}

	return result;
}
