import type { AnyValueObject } from '../_types/global.js';
import { setOwn } from './_ownProperty.js';

export function objOmit(obj: AnyValueObject, keys: string | string[]): AnyValueObject | null {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	const omitted = new Set(Array.isArray(keys) ? keys : [keys]);
	const result: AnyValueObject = {};
	const objKeys = Object.keys(obj);

	// Top level only, like Lodash's `omit` without its path support. A listed key the object
	// does not have is ignored, and nested values are carried over as they are.
	for (let i = 0, objKeysLength = objKeys.length; i < objKeysLength; i += 1) {
		const key = objKeys[i];

		if (!omitted.has(key)) {
			setOwn(result, key, obj[key]);
		}
	}

	return result;
}
