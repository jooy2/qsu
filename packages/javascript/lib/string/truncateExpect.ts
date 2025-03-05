import type { PositiveNumber } from '../_types/global';

export function truncateExpect<N extends number>(
	str: string,
	expectLength: PositiveNumber<N>,
	endStringChar = '.'
): string {
	if (!str) {
		return '';
	}

	if (str.length <= expectLength) {
		return str;
	}

	const isEndStringCharLastSentence = str.slice(-1) === endStringChar;
	const splitStr = str.split(endStringChar);
	const splitStrLength = splitStr.length;
	let convStr = '';
	let currentLength = 0;

	for (let i = 0; i < splitStrLength; i += 1) {
		if (currentLength < expectLength) {
			convStr += `${splitStr[i]}${
				i !== splitStrLength - 1 || isEndStringCharLastSentence ? endStringChar : ''
			}`;
			currentLength += splitStr[i].length + endStringChar.length;
		} else {
			break;
		}
	}

	return convStr;
}
