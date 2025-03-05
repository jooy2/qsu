import type { AnyValueObject } from '../_types/global';
import { isObject } from '../verify/isObject.js';

export function objToArray(obj: AnyValueObject, recursive = false): any[] {
	const convertToArray = (o: AnyValueObject): any[] => {
		const r = [];
		const oLen = Object.keys(o).length;

		for (let i = 0; i < oLen; i += 1) {
			const key = Object.keys(o)[i];

			if (recursive && isObject(o[key])) {
				r.push([key, convertToArray(o[key])]);
			} else {
				r.push([key, o[key]]);
			}
		}

		return r;
	};

	return convertToArray(obj);
}
