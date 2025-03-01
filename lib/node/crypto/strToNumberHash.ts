export function strToNumberHash(str: string): number {
	if (!str) {
		return 0;
	}

	let hash = 0;

	for (let i = 0; i < str.length; i += 1) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}

	return hash;
}
