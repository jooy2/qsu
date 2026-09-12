import { compareNaturalKey, naturalKey } from './_naturalCompare.js';

export function sortByObjectKey(
	array: any[],
	key: string,
	descending = false,
	numerically = false
): any[] {
	// Sort a copy: `Array.prototype.sort` reorders in place. Flip the comparison for
	// descending order instead of reversing, which would also flip equal elements.
	if (numerically) {
		// Build each key once rather than once per comparison.
		const decorated = array.map((item) => ({ item, sortKey: naturalKey(item[key]) }));

		decorated.sort((a, b) => {
			const order = compareNaturalKey(a.sortKey, b.sortKey);

			return descending ? -order : order;
		});

		return decorated.map((entry) => entry.item);
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
