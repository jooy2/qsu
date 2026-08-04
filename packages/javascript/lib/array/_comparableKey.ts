/**
 * (Private, not exported from the package) A stable string key for a value, so that array
 * membership can be decided by value instead of by reference.
 *
 * Python cannot hash a list or a dict at all, so a reference comparison could not have been
 * ported to all three languages. Comparing by value also means `arrDifference([[1]], [[1]])`
 * answers the same way everywhere.
 */
export function comparableKey(value: any): string {
	if (value === null) {
		return 'null';
	}

	if (value === undefined) {
		return 'undefined';
	}

	const type = typeof value;

	if (type === 'number') {
		if (Number.isNaN(value)) {
			return 'number:NaN';
		}

		// `-0` and `0` are one value, and `NaN` matches `NaN`, exactly like `Set` membership.
		return `number:${value === 0 ? 0 : value}`;
	}

	if (type === 'string' || type === 'boolean' || type === 'bigint') {
		return `${type}:${value}`;
	}

	if (type === 'function' || type === 'symbol') {
		// Neither has a JSON form, so they would otherwise all collapse onto one key.
		return `${type}:${String(value)}`;
	}

	try {
		return `json:${JSON.stringify(value)}`;
	} catch {
		// A cyclic structure has no JSON form.
		return `json:${String(value)}`;
	}
}
