import type { NumberValueObject } from '../_types/global';

export function arrCount(array: string[] | number[]): NumberValueObject {
	const result: NumberValueObject = {};

	for (let i = 0; i < array.length; i += 1) {
		const x = array[i];

		result[x] = (result[x] || 0) + 1;
	}

	return result;
}
