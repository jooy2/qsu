export function arrWithNumber(start: number, end: number): number[] {
	if (start > end) {
		throw new Error('`end` is greater than `start`.');
	}

	return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}
