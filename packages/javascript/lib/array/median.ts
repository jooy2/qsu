export function median(array: number[]): number | null {
	const values: number[] = [];

	for (let i = 0, arrayLength = array.length; i < arrayLength; i += 1) {
		const value = array[i];

		// `NaN` has no place in a sorted order, so it is skipped as `min` and `max` skip it.
		if (typeof value === 'number' && !Number.isNaN(value)) {
			values.push(value);
		}
	}

	const valuesLength = values.length;

	if (valuesLength === 0) {
		return null;
	}

	// `values` is already a copy, so sorting it leaves the caller's array in its order.
	values.sort((a, b) => a - b);

	const middle = Math.floor(valuesLength / 2);

	if (valuesLength % 2 === 1) {
		return values[middle];
	}

	return (values[middle - 1] + values[middle]) / 2;
}
