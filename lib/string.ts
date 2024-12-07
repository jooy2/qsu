import type { PositiveNumber } from './types/global.js';
import { contains } from './verify.js';
import { numRandom } from './math.js';

export function trim(str?: string | null): string | null {
	if (typeof str !== 'string' && !str) {
		return null;
	}

	return str.trim().replace(/\s{2,}/g, ' ');
}

export function removeSpecialChar(str: string, exceptionCharacters?: string): string {
	if (!str) {
		return '';
	}

	return str.replace(
		new RegExp(
			`[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f${
				exceptionCharacters ?? ''
			}]`,
			'gi'
		),
		''
	);
}

export function replaceBetween(
	str: string,
	startChar: string,
	endChar: string,
	replaceWith = ''
): string {
	if (!str) {
		return '';
	}

	const specialCharacters = /[.*+?^${}()|[\]\\]/g;
	const startCharRegExp = specialCharacters.test(startChar) ? `\\${startChar}` : startChar;
	const endCharRegExp = specialCharacters.test(endChar) ? `\\${endChar}` : endChar;

	return str.replace(new RegExp(`${startCharRegExp}.*?${endCharRegExp}`, 'g'), replaceWith);
}

export function removeNewLine(str: string, replaceTo = ''): string {
	if (!str) {
		return '';
	}

	return str.replace(/(\r\n|\n|\r)/gm, replaceTo).trim();
}

export function capitalizeFirst(str: string): string {
	if (!str) {
		return '';
	}

	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeEverySentence(str: string, splitChar?: string): string {
	if (!str) {
		return '';
	}

	const splitter: string = splitChar || '.';
	const splitStr = str.split(splitter);
	let resultStr = '';
	let sentenceChars;

	for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
		sentenceChars = [...splitStr[i]];

		for (let j = 0, jLen = sentenceChars.length; j < jLen; j += 1) {
			if (/[a-zA-Z]/.test(splitStr[i][j])) {
				sentenceChars[j] = splitStr[i][j].toUpperCase();
				break;
			}
		}

		resultStr += `${sentenceChars.join('')}${i < iLen - 1 ? splitter : ''}`;
	}

	return resultStr;
}

export function capitalizeEachWords(str: string, natural?: boolean): string {
	if (!str) {
		return '';
	}

	const splitStr = str.trim().toLowerCase().split(' ');

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

export function strCount(str: string, search: string): number {
	if (!str || !search) {
		return 0;
	}

	let count = 0;
	let pos = str.indexOf(search);

	while (pos > -1) {
		count += 1;
		pos = str.indexOf(search, (pos += search.length));
	}

	return count;
}

export function strShuffle(str: string): string {
	if (!str) {
		return '';
	}

	return [...str].sort(() => Math.random() - 0.5).join('');
}

export function strRandom<N extends number>(
	length: PositiveNumber<N>,
	additionalCharacters?: string
): string {
	const availCharacters = `abcdefghijklmnopqrstuvwxyz0123456789${additionalCharacters}`;
	const availCharacterLength = availCharacters.length;
	let result = '';
	let newChar;

	for (let i = 0; i < length; i += 1) {
		newChar = availCharacters.charAt(Math.floor(Math.random() * availCharacterLength));
		newChar = Math.random() < 0.5 ? newChar.toUpperCase() : newChar;
		result += newChar;
	}

	return result;
}

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

export function truncateExpect<N extends number>(
	str: string,
	expectLength: PositiveNumber<N>,
	endStringChar = '.'
): string {
	if (!str) {
		return '';
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

export function split(str: string, ...splitter: any[]): string[];

export function split(str: string, ...splitter: Array<string>): string[];

export function split(str: string, ...splitter: Array<string> | string[]): string[] {
	if (!str) {
		return [];
	}

	const splitters = splitter.length > 0 && typeof splitter[0] === 'object' ? splitter[0] : splitter;
	const splitterLength: number = splitters.length;
	let charPattern = '';
	let strPattern = '';

	for (let i = 0; i < splitterLength; i += 1) {
		const spl = splitters[i];

		if (spl.length > 1) {
			strPattern += `${strPattern.length < 1 ? '' : '|'}${spl
				.replace(/\\/g, '\\\\')
				.replace(/\[/g, '\\[')
				.replace(/]/g, '\\]')
				.replace(/\?/g, '\\?')
				.replace(/\./g, '\\.')
				.replace(/\{/g, '\\{')
				.replace(/}/g, '\\}')
				.replace(/\+/g, '\\+')}`;
		} else if (spl === '-' || spl === '[' || spl === ']') {
			charPattern += `\\${spl}`;
		} else {
			charPattern += spl;
		}
	}

	if (charPattern.length < 1 && strPattern.length < 1) {
		return [str];
	}

	if (charPattern.length > 0) {
		charPattern = `[${charPattern}]`;
		if (strPattern.length > 0) {
			strPattern = `|${strPattern}`;
		}
	}

	return str.split(new RegExp(`${charPattern}${strPattern}+`, 'gi'));
}

export function strToAscii(str: string): number[] {
	const arr = [];
	for (let i = 0; i < str.length; i += 1) {
		arr.push(str.charCodeAt(i));
	}
	return arr;
}

export function strUnique(str: string): string {
	if (!str) {
		return '';
	}

	return [...new Set(str)].join('');
}

export function urlJoin(...args: any[]): string {
	if (!args) {
		return '';
	}

	const argLength = args.length;
	let urlResult = '';
	let joinCount = 0;

	for (let i = 0; i < argLength; i += 1) {
		if (args[i] !== null && args[i] !== undefined) {
			if (
				joinCount === 0 ||
				args[i].startsWith('/') ||
				args[i].startsWith('?') ||
				args[i].startsWith('&')
			) {
				urlResult += args[i];
			} else {
				urlResult += `/${args[i]}`;
			}

			joinCount += 1;
		}
	}

	return urlResult.replace(/\/$/g, '');
}
