import { is2dArray } from '../verify/is2dArray.js';

export function arrUnique(array: any[]): any[] {
	if (is2dArray(array)) {
		return Array.from(new Set(array.map((x) => JSON.stringify(x))), (x) => JSON.parse(x));
	}

	return [...new Set(array)];
}
