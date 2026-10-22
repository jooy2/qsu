const SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/g;

// Escape every special character in the delimiter. The previous version called `.test()`
// twice on a `/g` regex, so the retained `lastIndex` made the second call miss and left
// `end` unescaped — `replaceEnclosed('a(b)c', '(', ')')` threw a syntax error.
const escapeRegExp = (str: string): string => str.replace(SPECIAL_CHARACTERS, '\\$&');

export function replaceEnclosed(str: string, start: string, end: string, replaceWith = ''): string {
	if (!str) {
		return '';
	}

	const startRegExp = escapeRegExp(start);
	const endRegExp = escapeRegExp(end);

	return str.replace(new RegExp(`${startRegExp}.*?${endRegExp}`, 'g'), replaceWith);
}
