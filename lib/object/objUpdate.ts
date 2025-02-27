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

	const newObj = Object.assign(obj, {});
	let hasUpdated = false;

	const checkObjectKey = (currentObj: AnyValueObject): void => {
		for (let i = 0; i < Object.keys(currentObj).length; i += 1) {
			const currentKey = Object.keys(currentObj)[i];

			if (recursive && currentObj[currentKey] && isObject(currentObj[currentKey])) {
				checkObjectKey(currentObj[currentKey]);
			}

			if (Object.hasOwn(currentObj, key)) {
				// eslint-disable-next-line no-param-reassign
				currentObj[key] = value;
				hasUpdated = true;
			}
		}
	};

	checkObjectKey(newObj);

	if (!hasUpdated && upsert) {
		newObj[key] = value;
	}

	return newObj;
}
