import { is2dArray } from '../verify/is2dArray.js';

export function arrUnique(array: any[]): any[] {
	if (is2dArray(array)) {
		const seen = new Set<string>();
		const result: any[] = [];

		for (let i = 0; i < array.length; i += 1) {
			const key = JSON.stringify(array[i]);

			// `undefined` and functions have no JSON representation, so they cannot be compared
			// this way. Keep them as-is rather than throwing on `JSON.parse(undefined)`.
			if (key === undefined) {
				result.push(array[i]);
			} else if (!seen.has(key)) {
				seen.add(key);
				result.push(array[i]);
			}
		}

		return result;
	}

	return [...new Set(array)];
}
