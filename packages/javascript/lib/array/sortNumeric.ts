// Creating an `Intl.Collator` is expensive, so build it once and reuse it.
const NUMERIC_COLLATOR = new Intl.Collator([], { numeric: true });

export function sortNumeric(array: string[], descending = false): string[] {
	// Sort a copy: `Array.prototype.sort` reorders in place. Flip the comparison for
	// descending order instead of reversing, which would also flip equal elements.
	return [...array].sort((a: any, b: any) =>
		descending ? NUMERIC_COLLATOR.compare(b, a) : NUMERIC_COLLATOR.compare(a, b)
	);
}
