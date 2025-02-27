export function strUnique(str: string): string {
	if (!str) {
		return '';
	}

	return [...new Set(str)].join('');
}
