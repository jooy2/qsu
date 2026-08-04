import { comparableKey } from './_comparableKey.js';

export function arrIntersection(...arrays: any[][]): any[] {
	if (arrays.length < 1 || !Array.isArray(arrays[0])) {
		return [];
	}

	const [first, ...rest] = arrays;
	const otherKeys: Array<Set<string>> = [];

	for (let i = 0, restLength = rest.length; i < restLength; i += 1) {
		// A non-array argument shares no value with anything, so the result is empty.
		if (!Array.isArray(rest[i])) {
			return [];
		}

		otherKeys.push(new Set(rest[i].map(comparableKey)));
	}

	const seen = new Set<string>();
	const result: any[] = [];

	for (let i = 0, firstLength = first.length; i < firstLength; i += 1) {
		const value = first[i];
		const key = comparableKey(value);

		if (seen.has(key)) {
			continue;
		}

		seen.add(key);

		if (otherKeys.every((keys) => keys.has(key))) {
			result.push(value);
		}
	}

	return result;
}
