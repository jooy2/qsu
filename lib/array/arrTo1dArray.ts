import { is2dArray } from '../verify/is2dArray.js';

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
