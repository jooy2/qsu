import type { AnyValueObject } from '../_types/global';

export function objInvert(obj: AnyValueObject): { [key: string]: string } | null {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	const result: { [key: string]: string } = {};
	const keys = Object.keys(obj);

	// Top level only, like Lodash's `invert`. When two entries share a value, the later one
	// wins, because both land on the same key.
	for (let i = 0, keysLength = keys.length; i < keysLength; i += 1) {
		const key = keys[i];

		result[String(obj[key])] = key;
	}

	return result;
}
