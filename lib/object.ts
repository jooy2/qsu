import type { AnyValueObject } from './types/global.js';
import { isEmpty, isObject } from './verify.js';

export function objToQueryString(obj: AnyValueObject): string {
	return Object.keys(obj)
		.map((key) => {
			let value = obj[key];

			if (typeof value === 'object') {
				value = JSON.stringify(value);
			}

			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		})
		.join('&');
}

export function objFindItemRecursiveByKey(
	obj: AnyValueObject | any[],
	searchKey: string,
	searchValue: any,
	childKey: string
): AnyValueObject | null {
	const findItemFromList = (lists: AnyValueObject): any | null => {
		let searchArray: any[];

		if (typeof lists !== 'object' || !Array.isArray(lists)) {
			searchArray = [lists];
		} else {
			searchArray = lists;
		}

		for (let i = 0, iLen = searchArray.length; i < iLen; i += 1) {
			if (searchArray[i][searchKey] === searchValue) {
				return searchArray[i];
			}
			if (!isEmpty(searchArray[i][childKey])) {
				const childItem = findItemFromList(searchArray[i][childKey]);

				if (childItem) {
					return childItem;
				}
			}
		}
		return null;
	};

	return findItemFromList(obj);
}

export function objToPrettyStr(obj: AnyValueObject): string {
	return JSON.stringify(obj, null, '\t');
}

export function objToArray(obj: AnyValueObject, recursive = false): any[] {
	const convertToArray = (o: AnyValueObject): any[] => {
		const r = [];
		const oLen = Object.keys(o).length;

		for (let i = 0; i < oLen; i += 1) {
			const key = Object.keys(o)[i];

			if (recursive && isObject(o[key])) {
				r.push([key, convertToArray(o[key])]);
			} else {
				r.push([key, o[key]]);
			}
		}

		return r;
	};

	return convertToArray(obj);
}

export function objTo1d(obj: AnyValueObject, separator = '.'): AnyValueObject {
	if (!separator || separator.length < 1) {
		throw new Error('`separator` must have value at least 1 character.');
	}

	const convertObjectTo1d = (o: AnyValueObject, objPath = ''): AnyValueObject => {
		let result: AnyValueObject = {};
		const objectLength = Object.keys(o).length;
		const isFirstDepth = objPath.length < 1;

		for (let i = 0; i < objectLength; i += 1) {
			const key = Object.keys(o)[i];
			const value = o[key];
			const newObjPath = `${objPath}${isFirstDepth ? '' : separator}${key}`;

			if (isObject(value)) {
				result = Object.assign(result, convertObjectTo1d(value, newObjPath));
				delete result[key];
			} else {
				result[newObjPath] = value;
			}
		}

		return result;
	};

	return convertObjectTo1d(obj);
}

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
