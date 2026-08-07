import { decimalShift } from './_decimalShift.js';

export function floor(value: number, precision = 0): number {
	if (!Number.isFinite(value)) {
		return value;
	}

	// Toward negative infinity, so a negative value falls: `floor(-4.006)` is `-5`.
	return decimalShift(Math.floor(decimalShift(value, precision)), -precision);
}
