import type { PositiveNumber } from '../_types/global';

export function truncate<N extends number>(
	str: string,
	length: PositiveNumber<N>,
	ellipsis = ''
): string {
	if (!str) {
		return '';
	}

	// Counted in code points. A JavaScript string is indexed in UTF-16 units, so a character
	// outside the Basic Multilingual Plane would count as two here and as one in Python, and
	// cutting between the two halves would leave a broken character behind.
	const chars = Array.from(str);

	if (chars.length <= length) {
		return str;
	}

	return chars.slice(0, length).join('') + ellipsis;
}
