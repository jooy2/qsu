import type { AnyValueObject } from '../_types/global';
import { isObject } from '../verify/isObject.js';

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
					merged[key].push(...data);
				} else if (options?.arrayAction === 'replace') {
					merged[key] = data;
				} else if (merged[key].length === data.length) {
					for (let i = 0; i < merged[key].length; i += 1) {
						const update = data[i];

						if (isObject(update)) {
							merged[key][i] = objMergeNewKey(merged[key][i], update, options);
						}
					}
				}
			} else if (isObject(merged[key]) && isObject(data)) {
				merged[key] = objMergeNewKey(merged[key], data, options);
			} else {
				merged[key] = data;
			}
		} else {
			merged[key] = data;
		}
	});

	return merged;
}
