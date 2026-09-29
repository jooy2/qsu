export function arrGroupBy<T>(
	array: T[],
	callback: (item: T) => string | number | boolean | null
): Record<string, T[]> {
	if (!Array.isArray(array)) {
		return {};
	}

	const groups = new Map<string, T[]>();

	for (let i = 0, arrayLength = array.length; i < arrayLength; i += 1) {
		const item = array[i];
		const key = String(callback(item));
		const group = groups.get(key);

		if (group) {
			group.push(item);
		} else {
			groups.set(key, [item]);
		}
	}

	// `Object.fromEntries` defines each key as an own property, so a key named `__proto__`
	// is stored as a group instead of replacing the prototype of the result.
	return Object.fromEntries(groups);
}
