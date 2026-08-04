export function arrCompact(array: any[]): any[] {
	if (!Array.isArray(array)) {
		return [];
	}

	const result: any[] = [];

	for (let i = 0, arrayLength = array.length; i < arrayLength; i += 1) {
		const value = array[i];

		// The rejected set is spelled out rather than left to `if (value)`. Dart and Python
		// have no truthiness of their own, so all three implementations have to agree on
		// exactly which values are dropped. Empty arrays and empty objects are truthy in
		// JavaScript and are therefore kept.
		if (
			value === null ||
			value === undefined ||
			value === false ||
			value === 0 ||
			value === '' ||
			(typeof value === 'number' && Number.isNaN(value))
		) {
			continue;
		}

		result.push(value);
	}

	return result;
}
