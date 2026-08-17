import type { PositiveNumber } from '../_types/global';

// The full stop as each script writes it: ASCII, the CJK ideographic full stop and its
// fullwidth and halfwidth forms. `!` and `?` are deliberately left out — an ASCII `!` has
// never ended a sentence here, so accepting `！` would split the same text differently
// depending on the script it is written in. Pass them explicitly to opt in.
const DEFAULT_END_STRING_CHARS = ['.', '。', '．', '｡'];

// Whether `target` sits at `index`, both already split into code points.
function isMatchAt(chars: string[], target: string[], index: number): boolean {
	if (index + target.length > chars.length) {
		return false;
	}

	for (let i = 0; i < target.length; i += 1) {
		if (chars[index + i] !== target[i]) {
			return false;
		}
	}

	return true;
}

export function truncateExpect<N extends number>(
	str: string,
	expectLength: PositiveNumber<N>,
	endStringChar: string | string[] = DEFAULT_END_STRING_CHARS
): string {
	if (!str) {
		return '';
	}

	// Counted in code points. A JavaScript string is indexed in UTF-16 units, so a character
	// outside the Basic Multilingual Plane would count as two here and as one in Python, and
	// the two languages would stop at different sentences.
	const chars = Array.from(str);
	const charsLength = chars.length;

	if (charsLength <= expectLength) {
		return str;
	}

	// Longest first, so an ending character that starts with another one (`.` next to `...`)
	// is matched whole instead of being cut short by the shorter one.
	const endStrings = (Array.isArray(endStringChar) ? endStringChar : [endStringChar])
		.filter((endString) => endString.length > 0)
		.map((endString) => Array.from(endString))
		.sort((left, right) => right.length - left.length);

	if (endStrings.length === 0) {
		return str;
	}

	let index = 0;

	while (index < charsLength) {
		const matched = endStrings.find((endString) => isMatchAt(chars, endString, index));

		if (!matched) {
			index += 1;
			continue;
		}

		index += matched.length;

		// The sentence that crosses the expected length is still kept whole.
		if (index >= expectLength) {
			return chars.slice(0, index).join('');
		}
	}

	// Every sentence fit within the expected length, so whatever trails the last ending
	// character is kept as well.
	return str;
}
