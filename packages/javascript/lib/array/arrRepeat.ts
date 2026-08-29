import type { PositiveNumber } from '../_types/global.js';
import { isObject } from '../verify/isObject.js';

export function arrRepeat<N extends number>(array: any, count: PositiveNumber<N>): any[] {
	if (!array || count < 1 || typeof array !== 'object') {
		return [];
	}

	const isObj = isObject(array);
	const result: any[] = [];

	for (let i = 0, iLen = count; i < iLen; i += 1) {
		if (isObj) {
			result.push(array);
		} else {
			// Push in a loop instead of spreading: spread passes every element as an
			// argument, which overflows the call stack on large arrays.
			for (let j = 0; j < array.length; j += 1) {
				result.push(array[j]);
			}
		}
	}

	return result;
}
