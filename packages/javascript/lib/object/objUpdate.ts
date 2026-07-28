import { AnyValueObject } from '../_types/global';
import { isObject } from '../verify/isObject.js';

export function objUpdate(
	obj: AnyValueObject,
	key: string,
	value: any,
	recursive = false,
	upsert = false
): AnyValueObject | null {
	if (!obj || typeof obj !== 'object') {
		return null;
	}

	let hasUpdated = false;

	// Work on copies. `Object.assign(obj, {})` returned `obj` itself, so the caller's object
	// (and every nested object) was modified in place.
	const updateObject = (currentObj: AnyValueObject): AnyValueObject => {
		const result: AnyValueObject = { ...currentObj };
		// Build the key list once. Calling `Object.keys` inside the loop rebuilt the whole
		// array on every iteration, making this O(n^2).
		const keys = Object.keys(result);

		for (let i = 0, keyLength = keys.length; i < keyLength; i += 1) {
			const currentKey = keys[i];

			if (recursive && result[currentKey] && isObject(result[currentKey])) {
				result[currentKey] = updateObject(result[currentKey]);
			}
		}

		// Assign once per object. The old code repeated this identical assignment for every
		// key in the object.
		if (Object.hasOwn(result, key)) {
			result[key] = value;
			hasUpdated = true;
		}

		return result;
	};

	const newObj = updateObject(obj);

	if (!hasUpdated && upsert) {
		newObj[key] = value;
	}

	return newObj;
}
