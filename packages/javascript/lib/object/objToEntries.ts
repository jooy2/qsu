import type { AnyValueObject } from '../_types/global.js';
import { isPlainObject } from '../verify/isPlainObject.js';

export function objToEntries(obj: AnyValueObject, recursive = false): any[] {
	const convertToArray = (o: AnyValueObject): any[] => {
		const r = [];
		// Build the key list once. Calling `Object.keys` inside the loop rebuilt the whole
		// array on every iteration, making this O(n^2).
		const keys = Object.keys(o);

		for (let i = 0, oLen = keys.length; i < oLen; i += 1) {
			const key = keys[i];

			if (recursive && isPlainObject(o[key])) {
				r.push([key, convertToArray(o[key])]);
			} else {
				r.push([key, o[key]]);
			}
		}

		return r;
	};

	return convertToArray(obj);
}
