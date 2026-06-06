export function arrPick(array: any[]) {
	if (!array || !Array.isArray(array) || array.length < 1) {
		return null;
	}

	return array[(Math.random() * array.length) | 0];
}
