/**
 * (Private, not exported from the package) Uppercases the first character of a word and
 * lowercases the rest, so `XML` becomes `Xml`.
 *
 * The word is split by code point rather than indexed, because indexing a JavaScript string
 * walks UTF-16 units and would cut a surrogate pair in half, disagreeing with the Dart and
 * Python implementations. This is what the case-conversion family needs, and it is not the
 * same as the public `capitalizeFirst`, which leaves the rest of the string alone.
 */
export function capitalizeWord(word: string): string {
	if (!word) {
		return '';
	}

	const chars = Array.from(word);

	return chars[0].toUpperCase() + chars.slice(1).join('').toLowerCase();
}
