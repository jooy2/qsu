import type { AnyValueObject } from '../_types/global';
import { isObject } from '../verify/isObject.js';

export function objDeleteKeyByValue(
	obj: AnyValueObject,
	searchValue: string | number | null | undefined,
	recursive = false
): AnyValueObject | null {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	// Work on a copy. `Object.assign(obj, {})` returned `obj` itself, so the caller's object
	// was modified in place.
	const newObj: AnyValueObject = { ...obj };

	// Build the key list once. Calling `Object.keys` inside the loop rebuilt the whole array
	// on every iteration, and starting at `length` read one index past the end.
	const keys = Object.keys(newObj);

	for (let i = keys.length - 1; i >= 0; i -= 1) {
		const key = keys[i];

		if (recursive && newObj[key] && isObject(newObj[key])) {
			newObj[key] = objDeleteKeyByValue(newObj[key], searchValue, recursive);
		} else if (newObj[key] === searchValue) {
			delete newObj[key];
		}
	}

	return newObj;
}
