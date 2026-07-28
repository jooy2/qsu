export function arrShuffle(array: any[]): any[] {
	// Shuffle a copy. Returning the input meant the caller's array was reordered in place.
	const newArray = [...array];

	for (let i = newArray.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));

		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}

	return newArray;
}
