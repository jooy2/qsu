import type { PositiveNumber } from '../_types/global.js';

export function arrMove<N extends number>(
	array: any[],
	from: PositiveNumber<N>,
	to: PositiveNumber<N>
): any[] {
	const arrayLength = array.length;

	if (arrayLength <= from || arrayLength <= to) {
		throw new Error('Invalid move params');
	}

	// Move within a copy so the caller's array is left untouched.
	const newArray = [...array];

	newArray.splice(to, 0, newArray.splice(from, 1)[0]);

	return newArray;
}
