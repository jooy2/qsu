import type { AnyValueObject } from '../_types/global.js';
import { isObject } from '../verify/isObject.js';
import { setOwn } from './_ownProperty.js';

export function objMergeNewKey(
	obj: AnyValueObject,
	obj2: AnyValueObject,
	options?: { arrayAction?: 'original' | 'replace' | 'append' }
): AnyValueObject | null {
	if (!obj || typeof obj !== 'object' || !obj2 || typeof obj2 !== 'object') {
		return null;
	}

	const merged: AnyValueObject = { ...obj };

	Object.keys(obj2).forEach((key: string) => {
		const data = obj2[key];

		if (Object.hasOwn(merged, key)) {
			if (Array.isArray(merged[key]) && Array.isArray(data)) {
				if (options?.arrayAction === 'append') {
					// `concat` builds a new array. `push` grew the caller's array, because
					// the `{ ...obj }` copy above is shallow and shares it.
					setOwn(merged, key, merged[key].concat(data));
				} else if (options?.arrayAction === 'replace') {
					setOwn(merged, key, data);
				} else if (merged[key].length === data.length) {
					const mergedArray = [...merged[key]];

					for (let i = 0; i < mergedArray.length; i += 1) {
						const update = data[i];

						if (isObject(update)) {
							mergedArray[i] = objMergeNewKey(mergedArray[i], update, options);
						}
					}

					setOwn(merged, key, mergedArray);
				}
			} else if (isObject(merged[key]) && isObject(data)) {
				setOwn(merged, key, objMergeNewKey(merged[key], data, options));
			} else {
				setOwn(merged, key, data);
			}
		} else {
			setOwn(merged, key, data);
		}
	});

	return merged;
}
