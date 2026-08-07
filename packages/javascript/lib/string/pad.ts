import type { PadOptions } from '../_types/global';

// Repeats the padding characters and cuts them off at `count`, so a multi-character `char`
// is used whole where it fits and truncated where it does not.
function buildPad(char: string, count: number): string {
	if (count <= 0) {
		return '';
	}

	const chars = Array.from(char);
	let result = '';

	for (let i = 0; i < count; i += 1) {
		result += chars[i % chars.length];
	}

	return result;
}

export function pad(str: string, length: number, options?: PadOptions): string {
	const text = str || '';
	const padChar = options?.char ?? ' ';
	// Counted in code points. A JavaScript string is indexed in UTF-16 units, so an emoji
	// would count as two here and as one in Python, and the result would differ per language.
	const textLength = Array.from(text).length;

	if (textLength >= length || !padChar) {
		return text;
	}

	const total = length - textLength;
	const position = options?.position ?? 'both';
	let startLength = Math.floor(total / 2);

	if (position === 'start') {
		startLength = total;
	} else if (position === 'end') {
		startLength = 0;
	}

	return buildPad(padChar, startLength) + text + buildPad(padChar, total - startLength);
}
