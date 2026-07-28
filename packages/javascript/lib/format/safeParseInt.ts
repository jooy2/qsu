export function safeParseInt(value: any, fallback = 0, radix = 10): number {
	// Only `null`/`undefined` are missing values. `0` is a perfectly valid input.
	if (value === null || value === undefined) {
		return fallback;
	}

	try {
		const str = value.toString();

		if (str.length < 1) {
			return fallback;
		}

		// `parseInt` reports failure with `NaN` instead of throwing, so check it explicitly.
		const parsed = parseInt(str.split('.')[0], radix);

		return Number.isNaN(parsed) ? fallback : parsed;
	} catch {
		return fallback;
	}
}
