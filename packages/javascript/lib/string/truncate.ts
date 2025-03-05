import type { PositiveNumber } from '../_types/global';

export function truncate<N extends number>(
	str: string,
	length: PositiveNumber<N>,
	ellipsis = ''
): string {
	if (!str) {
		return '';
	}

	let convStr = str;

	if (str.length > length) {
		convStr = str.substring(0, length) + ellipsis;
	}

	return convStr;
}
