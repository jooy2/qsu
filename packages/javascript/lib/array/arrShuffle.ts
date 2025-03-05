export function arrShuffle(array: any[]): any[] {
	if (array.length === 1) {
		return array[0];
	}

	const newArray = array;

	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [array[j], array[i]];
	}

	return newArray;
}
