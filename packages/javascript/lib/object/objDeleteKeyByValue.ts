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

	const newObj = Object.assign(obj, {});

	for (let i = Object.keys(newObj).length; i >= 0; i -= 1) {
		const key = Object.keys(newObj)[i];

		if (recursive && newObj[key] && isObject(newObj[key])) {
			objDeleteKeyByValue(newObj[key], searchValue, recursive);
		} else if (newObj[key] === searchValue) {
			delete newObj[key];
		}
	}

	return newObj;
}
