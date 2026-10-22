export function removeNewlines(str: string, replaceWith = ''): string {
	if (!str) {
		return '';
	}

	return str.replace(/(\r\n|\n|\r)/gm, replaceWith).trim();
}
