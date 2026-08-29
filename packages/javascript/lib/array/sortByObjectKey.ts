let numericCollator: Intl.Collator | undefined;

// Creating an `Intl.Collator` is expensive, so build it on first use and reuse it.
const getNumericCollator = (): Intl.Collator =>
	(numericCollator ??= new Intl.Collator([], { numeric: true }));

export function sortByObjectKey(
	array: any[],
	key: string,
	descending = false,
	numerically = false
): any[] {
	// Sort a copy: `Array.prototype.sort` reorders in place. Flip the comparison for
	// descending order instead of reversing, which would also flip equal elements.
	if (numerically) {
		const collator = getNumericCollator();

		return [...array].sort((a: any, b: any) =>
			descending ? collator.compare(b[key], a[key]) : collator.compare(a[key], b[key])
		);
	}

	return [...array].sort((a: any, b: any) => {
		if (!descending) {
			if (a[key] < b[key]) {
				return -1;
			}
			if (a[key] > b[key]) {
				return 1;
			}

			return 0;
		}

		if (a[key] > b[key]) {
			return -1;
		}
		if (a[key] < b[key]) {
			return 1;
		}

		return 0;
	});
}
