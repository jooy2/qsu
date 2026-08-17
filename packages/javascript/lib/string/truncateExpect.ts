import type { PositiveNumber } from '../_types/global';

// The full stop as each script writes it: ASCII, the CJK ideographic full stop and its
// fullwidth and halfwidth forms. `!` and `?` are deliberately left out — an ASCII `!` has
// never ended a sentence here, so accepting `！` would split the same text differently
// depending on the script it is written in. Pass them explicitly to opt in.
const DEFAULT_END_STRING_CHARS = ['.', '。', '．', '｡'];

export function truncateExpect<N extends number>(
	str: string,
	expectLength: PositiveNumber<N>,
	endStringChar: string | string[] = DEFAULT_END_STRING_CHARS
): string {
	if (!str) {
		return '';
	}

	if (str.length <= expectLength) {
		return str;
	}

	// Longest first, so an ending character that starts with another one (`.` next to `...`)
	// is matched whole instead of being cut short by the shorter one.
	const endStrings = (Array.isArray(endStringChar) ? endStringChar : [endStringChar])
		.filter((endString) => endString.length > 0)
		.sort((left, right) => right.length - left.length);

	if (endStrings.length === 0) {
		return str;
	}

	const strLength = str.length;
	let index = 0;

	while (index < strLength) {
		const matched = endStrings.find((endString) => str.startsWith(endString, index));

		if (!matched) {
			index += 1;
			continue;
		}

		index += matched.length;

		// The sentence that crosses the expected length is still kept whole.
		if (index >= expectLength) {
			return str.slice(0, index);
		}
	}

	// Every sentence fit within the expected length, so whatever trails the last ending
	// character is kept as well.
	return str;
}
