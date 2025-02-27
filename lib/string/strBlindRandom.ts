import type { PositiveNumber } from '../_types/global';
import { numRandom } from '../math/numRandom.js';

export function strBlindRandom<N extends number>(
	str: string,
	blindLength: PositiveNumber<N>,
	blindStr = '*'
): string {
	if (!str) {
		return '';
	}

	let currentStr = str;
	let hideCount = 0;
	let tempIdx = 0;
	let currentStrLength = 0;

	const totalStrLength = currentStr.length;

	while (hideCount < blindLength && currentStrLength < totalStrLength) {
		tempIdx = numRandom(0, totalStrLength);

		if (/[a-zA-Z가-힣]/.test(currentStr.substring(tempIdx, tempIdx + 1))) {
			currentStr = `${currentStr.substring(0, tempIdx + 1)}${blindStr}${currentStr.substring(
				tempIdx + 2
			)}`;
			hideCount += 1;
		}

		currentStrLength += 1;
	}

	return currentStr;
}
