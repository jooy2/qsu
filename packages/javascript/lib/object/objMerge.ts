import type { AnyValueObject } from '../_types/global.js';
import { isObject } from '../verify/isObject.js';

export function objMerge(...objects: AnyValueObject[]): AnyValueObject | null {
	if (objects.length === 0) {
		return null;
	}

	const result: AnyValueObject = {};

	for (let i = 0, objectsLength = objects.length; i < objectsLength; i += 1) {
		const source = objects[i];

		if (!isObject(source)) {
			return null;
		}

		const keys = Object.keys(source);

		for (let k = 0, keysLength = keys.length; k < keysLength; k += 1) {
			const key = keys[k];
			const value = source[key];

			// Two plain objects are merged into a *new* object, so neither source ends up
			// shared with the result. Everything else, arrays included, is replaced whole by
			// the later value. Lodash merges arrays index by index instead, which quietly
			// keeps elements the caller meant to drop.
			result[key] =
				isObject(result[key]) && isObject(value)
					? (objMerge(result[key], value) as AnyValueObject)
					: value;
		}
	}

	return result;
}
