export function strShuffle(str: string): string {
	if (!str) {
		return '';
	}

	return [...str].sort(() => Math.random() - 0.5).join('');
}
