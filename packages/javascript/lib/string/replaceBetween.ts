const SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/g;

// Escape every special character in the delimiter. The previous version called `.test()`
// twice on a `/g` regex, so the retained `lastIndex` made the second call miss and left
// `endChar` unescaped — `replaceBetween('a(b)c', '(', ')')` threw a syntax error.
const escapeRegExp = (str: string): string => str.replace(SPECIAL_CHARACTERS, '\\$&');

export function replaceBetween(
	str: string,
	startChar: string,
	endChar: string,
	replaceWith = ''
): string {
	if (!str) {
		return '';
	}

	const startCharRegExp = escapeRegExp(startChar);
	const endCharRegExp = escapeRegExp(endChar);

	return str.replace(new RegExp(`${startCharRegExp}.*?${endCharRegExp}`, 'g'), replaceWith);
}
