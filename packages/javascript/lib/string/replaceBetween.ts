export function replaceBetween(
	str: string,
	startChar: string,
	endChar: string,
	replaceWith = ''
): string {
	if (!str) {
		return '';
	}

	const specialCharacters = /[.*+?^${}()|[\]\\]/g;
	const startCharRegExp = specialCharacters.test(startChar) ? `\\${startChar}` : startChar;
	const endCharRegExp = specialCharacters.test(endChar) ? `\\${endChar}` : endChar;

	return str.replace(new RegExp(`${startCharRegExp}.*?${endCharRegExp}`, 'g'), replaceWith);
}
