export function uncapitalizeFirst(str: string): string {
	if (!str) {
		return '';
	}

	return str.charAt(0).toLowerCase() + str.slice(1);
}
