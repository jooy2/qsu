import { PositiveNumber } from '../_types/global';

export function arrMove<N extends number>(
	array: any[],
	from: PositiveNumber<N>,
	to: PositiveNumber<N>
): any[] {
	const arrayLength = array.length;

	if (arrayLength <= from || arrayLength <= to) {
		throw new Error('Invalid move params');
	}

	array.splice(to, 0, array.splice(from, 1)[0]);

	return array;
}
