import type { AnyValueObject } from '../_types/global';

export function objMapKeys(
	obj: AnyValueObject,
	iteratee: (value: any, key: string) => string
): AnyValueObject | null {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	const result: AnyValueObject = {};
	const keys = Object.keys(obj);

	// Top level only, like Lodash's `mapKeys`. When two keys map onto the same name, the
	// later one wins.
	for (let i = 0, keysLength = keys.length; i < keysLength; i += 1) {
		const key = keys[i];

		result[iteratee(obj[key], key)] = obj[key];
	}

	return result;
}
