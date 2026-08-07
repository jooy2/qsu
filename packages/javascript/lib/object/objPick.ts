import type { AnyValueObject } from '../_types/global';

export function objPick(obj: AnyValueObject, keys: string | string[]): AnyValueObject | null {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	const keyList = Array.isArray(keys) ? keys : [keys];
	const result: AnyValueObject = {};

	// Top level only, like Lodash's `pick` without its path support. A key that is not
	// there is skipped rather than carried over as `undefined`, which would leave the
	// result claiming a key the source never had.
	for (let i = 0, keysLength = keyList.length; i < keysLength; i += 1) {
		const key = keyList[i];

		if (Object.hasOwn(obj, key)) {
			result[key] = obj[key];
		}
	}

	return result;
}
