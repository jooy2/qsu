import { compareNaturalKey, naturalKey } from './_naturalCompare.js';

export function sortNumeric(array: string[], descending = false): string[] {
	// Build each key once rather than once per comparison: `sort` calls the comparator
	// O(n log n) times and the key is the expensive part of it.
	const decorated = array.map((value) => ({ value, key: naturalKey(value) }));

	// Sort a copy: `Array.prototype.sort` reorders in place. Flip the comparison for
	// descending order instead of reversing, which would also flip equal elements.
	decorated.sort((a, b) => {
		const order = compareNaturalKey(a.key, b.key);

		return descending ? -order : order;
	});

	return decorated.map((item) => item.value);
}
