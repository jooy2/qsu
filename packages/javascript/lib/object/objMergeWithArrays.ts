import type { AnyValueObject } from '../_types/global.js';
import { isPlainObject } from '../verify/isPlainObject.js';
import { setOwn } from './_ownProperty.js';

export function objMergeWithArrays(
	obj: AnyValueObject,
	source: AnyValueObject,
	options?: { arrayAction?: 'original' | 'replace' | 'append' }
): AnyValueObject | null {
	if (!obj || typeof obj !== 'object' || !source || typeof source !== 'object') {
		return null;
	}

	const merged: AnyValueObject = { ...obj };

	Object.keys(source).forEach((key: string) => {
		const data = source[key];

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

						if (isPlainObject(update)) {
							mergedArray[i] = objMergeWithArrays(mergedArray[i], update, options);
						}
					}

					setOwn(merged, key, mergedArray);
				}
			} else if (isPlainObject(merged[key]) && isPlainObject(data)) {
				setOwn(merged, key, objMergeWithArrays(merged[key], data, options));
			} else {
				setOwn(merged, key, data);
			}
		} else {
			setOwn(merged, key, data);
		}
	});

	return merged;
}
