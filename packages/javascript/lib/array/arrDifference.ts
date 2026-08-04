import { comparableKey } from './_comparableKey.js';

export function arrDifference(array: any[], ...others: any[][]): any[] {
	if (!Array.isArray(array)) {
		return [];
	}

	const excluded = new Set<string>();

	for (let i = 0, othersLength = others.length; i < othersLength; i += 1) {
		const other = others[i];

		if (!Array.isArray(other)) {
			continue;
		}

		for (let j = 0, otherLength = other.length; j < otherLength; j += 1) {
			excluded.add(comparableKey(other[j]));
		}
	}

	// Duplicates of a kept value stay, and the original order is preserved.
	return array.filter((value) => !excluded.has(comparableKey(value)));
}
