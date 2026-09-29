import type { NumberValueObject } from '../_types/global.js';
import { getOwn, setOwn } from '../object/_ownProperty.js';

export function arrCount(array: string[] | number[]): NumberValueObject {
	const result: NumberValueObject = {};

	for (let i = 0; i < array.length; i += 1) {
		const key = String(array[i]);

		setOwn(result, key, (getOwn(result, key) || 0) + 1);
	}

	return result;
}
