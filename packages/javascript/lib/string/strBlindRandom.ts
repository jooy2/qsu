import type { PositiveNumber } from '../_types/global.js';
import { numPick } from '../math/numPick.js';

const MASKABLE = /[a-zA-Z가-힣]/;

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
		// Pick a valid index, and mask the character that was actually checked. The old
		// code checked `tempIdx` but replaced `tempIdx + 1`, and `numPick(0, len)` could
		// return `len` itself, which appended to the string instead of masking part of it.
		tempIdx = numPick(0, totalStrLength - 1);

		if (MASKABLE.test(currentStr.substring(tempIdx, tempIdx + 1))) {
			currentStr = `${currentStr.substring(0, tempIdx)}${blindStr}${currentStr.substring(
				tempIdx + 1
			)}`;
			hideCount += 1;
		}

		currentStrLength += 1;
	}

	return currentStr;
}
