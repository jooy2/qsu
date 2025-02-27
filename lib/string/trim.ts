export function trim(str?: string | null): string | null {
	if (typeof str !== 'string' && !str) {
		return null;
	}

	return str.trim().replace(/\s{2,}/g, ' ');
}
