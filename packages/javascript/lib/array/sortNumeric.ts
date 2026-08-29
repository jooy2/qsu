let numericCollator: Intl.Collator | undefined;

// Creating an `Intl.Collator` is expensive, so build it on first use and reuse it.
const getNumericCollator = (): Intl.Collator =>
	(numericCollator ??= new Intl.Collator([], { numeric: true }));

export function sortNumeric(array: string[], descending = false): string[] {
	const collator = getNumericCollator();

	// Sort a copy: `Array.prototype.sort` reorders in place. Flip the comparison for
	// descending order instead of reversing, which would also flip equal elements.
	return [...array].sort((a: any, b: any) =>
		descending ? collator.compare(b, a) : collator.compare(a, b)
	);
}
