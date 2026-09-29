export function arrWithNumber(start: number, end: number, options?: { step?: number }): number[] {
	const step = options?.step ?? 1;

	if (start > end) {
		throw new RangeError('`start` is greater than `end`.');
	}

	// A step of zero or less never reaches `end`, and a fractional one would make the
	// values drift away from whole numbers.
	if (!Number.isInteger(step) || step < 1) {
		throw new RangeError('`step` must be a positive integer.');
	}

	return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) => start + i * step);
}
