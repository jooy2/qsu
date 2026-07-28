// Creating an `Intl.Collator` is expensive, so build it once and reuse it.
const NUMERIC_COLLATOR = new Intl.Collator([], { numeric: true });

export function sortByObjectKey(
	array: any[],
	key: string,
	descending = false,
	numerically = false
): any[] {
	// Sort a copy: `Array.prototype.sort` reorders in place. Flip the comparison for
	// descending order instead of reversing, which would also flip equal elements.
	if (numerically) {
		return [...array].sort((a: any, b: any) =>
			descending
				? NUMERIC_COLLATOR.compare(b[key], a[key])
				: NUMERIC_COLLATOR.compare(a[key], b[key])
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
