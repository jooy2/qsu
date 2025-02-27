import { PositiveNumber } from '../_types/global';
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
			result.push(...array);
		}
	}

	return result;
}
