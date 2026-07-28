import type { AnyValueObject } from '../_types/global';
import { isObject } from '../verify/isObject.js';

export function objTo1d(obj: AnyValueObject, separator = '.'): AnyValueObject {
	if (!separator || separator.length < 1) {
		throw new Error('`separator` must have value at least 1 character.');
	}

	const convertObjectTo1d = (o: AnyValueObject, objPath = ''): AnyValueObject => {
		let result: AnyValueObject = {};
		// Build the key list once. Calling `Object.keys` inside the loop rebuilt the whole
		// array on every iteration, making this O(n^2).
		const keys = Object.keys(o);
		const isFirstDepth = objPath.length < 1;

		for (let i = 0, objectLength = keys.length; i < objectLength; i += 1) {
			const key = keys[i];
			const value = o[key];
			const newObjPath = `${objPath}${isFirstDepth ? '' : separator}${key}`;

			if (isObject(value)) {
				result = Object.assign(result, convertObjectTo1d(value, newObjPath));
				delete result[key];
			} else {
				result[newObjPath] = value;
			}
		}

		return result;
	};

	return convertObjectTo1d(obj);
}
