import { comparableKey } from './_comparableKey.js';

export function arrUnique(array: any[]): any[] {
	const seen = new Set<string>();
	const result: any[] = [];

	// Compared by value, as `arrDifference` and `arrIntersection` compare, so an object or a
	// nested array with the same contents is a duplicate in every package. A `Set` compared
	// objects by reference, which Python cannot port. The first of each is kept as it is.
	for (let i = 0, arrayLength = array.length; i < arrayLength; i += 1) {
		const key = comparableKey(array[i]);

		if (!seen.has(key)) {
			seen.add(key);
			result.push(array[i]);
		}
	}

	return result;
}
