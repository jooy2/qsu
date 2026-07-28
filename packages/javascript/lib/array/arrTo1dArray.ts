import { is2dArray } from '../verify/is2dArray.js';

export function arrTo1dArray(array: any[]): any[] {
	const convert1dArray = (arr: any[]): any[] => {
		const tempArr = [];
		const arrayLength = arr.length;

		for (let i = 0; i < arrayLength; i += 1) {
			// Check for an array rather than `typeof === 'object'`: `null` and plain objects
			// are also objects, and spreading them threw a TypeError.
			if (!Array.isArray(arr[i])) {
				tempArr.push(arr[i]);
			} else {
				// Push in a loop instead of spreading: spread passes every element as an
				// argument and blows the call stack on large arrays.
				const flattened = is2dArray(arr[i]) ? convert1dArray(arr[i]) : arr[i];

				for (let j = 0; j < flattened.length; j += 1) {
					tempArr.push(flattened[j]);
				}
			}
		}

		return tempArr;
	};

	return convert1dArray(array);
}
