export function removeNewLine(str: string, replaceTo = ''): string {
	if (!str) {
		return '';
	}

	return str.replace(/(\r\n|\n|\r)/gm, replaceTo).trim();
}
