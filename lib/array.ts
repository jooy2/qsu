import type { NumberValueObject, PositiveNumber } from './types/global';
import { is2dArray, isObject } from './verify';

export function arrShuffle(array: any[]): any[] {
	if (array.length === 1) {
		return array[0];
	}

	const newArray = array;

	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [array[j], array[i]];
	}

	return newArray;
}

export function arrWithDefault(defaultValue: any, length = 0): any[] {
	if (length < 1) {
		return [];
	}

	return Array(length).fill(defaultValue);
}

export function arrUnique(array: any[]): any[] {
	if (is2dArray(array)) {
		return Array.from(new Set(array.map((x) => JSON.stringify(x))), (x) => JSON.parse(x));
	}

	return [...new Set(array)];
}

export function arrWithNumber(start: number, end: number): number[] {
	if (start > end) {
		throw new Error('`end` is greater than `start`.');
	}

	return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

export function average(array: number[]): number {
	return array.reduce((p, c) => p + c, 0) / array.length;
}

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

export function arrTo1dArray(array: any[]): any[] {
	const convert1dArray = (arr: any[]): any[] => {
		const tempArr = [];
		const arrayLength = arr.length;

		for (let i = 0; i < arrayLength; i += 1) {
			if (typeof arr[i] !== 'object') {
				tempArr.push(arr[i]);
			} else if (is2dArray(arr[i])) {
				tempArr.push(...convert1dArray(arr[i]));
			} else {
				tempArr.push(...arr[i]);
			}
		}

		return tempArr;
	};

	return convert1dArray(array);
}

export function arrRepeat<N extends number>(array: any, count: PositiveNumber<N>): any[] {
	if (!array || count < 1 || typeof array !== 'object') {
		return [];
	}

	const isObj = isObject(array);
	const result: any[] = [];

	for (let i = 0, iLen = count; i < iLen; i += 1) {
		if (isObj) {
			result.push(array);
		} else {
			result.push(...array);
		}
	}

	return result;
}

export function arrCount(array: string[] | number[]): NumberValueObject {
	const result: NumberValueObject = {};

	for (let i = 0; i < array.length; i += 1) {
		const x = array[i];

		result[x] = (result[x] || 0) + 1;
	}

	return result;
}

export function sortByObjectKey(
	array: any[],
	key: string,
	descending = false,
	numerically = false
): any[] {
	if (numerically) {
		const collator = new Intl.Collator([], { numeric: true });
		const result = array.sort((a: any, b: any) => collator.compare(a[key], b[key]));

		return descending ? result.reverse() : result;
	}

	return array.sort((a: any, b: any) => {
		if (!descending) {
			if (a[key] < b[key]) return -1;
			if (a[key] > b[key]) return 1;

			return 0;
		}

		if (a[key] > b[key]) return -1;
		if (a[key] < b[key]) return 1;

		return 0;
	});
}

export function sortNumeric(array: string[], descending = false): string[] {
	const collator = new Intl.Collator([], { numeric: true });
	const result = array.sort((a: any, b: any) => collator.compare(a, b));

	return descending ? result.reverse() : result;
}

export function arrGroupByMaxCount(array: any[], maxLengthPerGroup = 1): any[] {
	const result = [];
	const arrayLength = array.length;
	let tempArray = [];

	for (let i = 0; i < arrayLength; i += 1) {
		if (tempArray.length === maxLengthPerGroup) {
			result.push(tempArray);
			tempArray = [];
		}

		tempArray.push(array[i]);
	}

	if (tempArray.length > 0) {
		result.push(tempArray);
	}

	return result;
}
