import type { NonNegativeNumber } from '../_types/global.js';

export function arrMove<N extends number>(
	array: any[],
	fromIndex: NonNegativeNumber<N>,
	toIndex: NonNegativeNumber<N>
): any[] {
	const arrayLength = array.length;

	if (arrayLength <= fromIndex || arrayLength <= toIndex) {
		throw new Error('Invalid move params');
	}

	// Move within a copy so the caller's array is left untouched.
	const newArray = [...array];

	newArray.splice(toIndex, 0, newArray.splice(fromIndex, 1)[0]);

	return newArray;
}
