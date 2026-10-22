import { contains } from '../verify/contains.js';
import { capitalizeFirst } from './capitalizeFirst.js';

export function capitalizeEachWord(str: string, titleCase?: boolean): string {
	if (!str) {
		return '';
	}

	let tempStr: string = str.trim();

	if (titleCase) {
		tempStr = tempStr.toLowerCase();
	}

	const splitStr = tempStr.split(' ');

	for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
		if (
			!titleCase ||
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
