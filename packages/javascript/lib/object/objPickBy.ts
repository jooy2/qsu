import type { AnyValueObject } from '../_types/global.js';

export function objPickBy(
	obj: AnyValueObject,
	predicate: (value: any, key: string) => boolean
): AnyValueObject | null {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	const result: AnyValueObject = {};
	const keys = Object.keys(obj);

	// Top level only, like Lodash's `pickBy`. Nested objects are carried over as they are.
	for (let i = 0, keysLength = keys.length; i < keysLength; i += 1) {
		const key = keys[i];

		if (predicate(obj[key], key)) {
			result[key] = obj[key];
		}
	}

	return result;
}
