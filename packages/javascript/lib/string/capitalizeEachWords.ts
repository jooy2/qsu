import { contains } from '../verify/contains.js';
import { capitalizeFirst } from './capitalizeFirst.js';

export function capitalizeEachWords(str: string, natural?: boolean): string {
	if (!str) {
		return '';
	}

	let tempStr: string = str.trim();

	if (natural) {
		tempStr = tempStr.toLowerCase();
	}

	const splitStr = tempStr.split(' ');

	for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
		if (
			!natural ||
			!contains(
				splitStr[i],
				[
					'in',
					'on',
					'the',
					'at',
					'and',
					'or',
					'of',
					'for',
					'to',
					'that',
					'a',
					'by',
					'it',
					'is',
					'as',
					'are',
					'were',
					'was',
					'nor',
					'an'
				],
				true
			)
		) {
			splitStr[i] = capitalizeFirst(splitStr[i]);
		}
	}

	return capitalizeFirst(splitStr.join(' '));
}
