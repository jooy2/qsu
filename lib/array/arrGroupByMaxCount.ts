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
