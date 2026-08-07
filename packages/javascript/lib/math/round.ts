import { decimalShift } from './_decimalShift.js';

export function round(value: number, precision = 0): number {
	if (!Number.isFinite(value)) {
		return value;
	}

	const shifted = decimalShift(value, precision);
	// Ties go away from zero. `Math.round` sends them toward positive infinity, so `-0.5`
	// would answer `-0` here where Dart and Python answer `-1`.
	const rounded = shifted < 0 ? -Math.round(-shifted) : Math.round(shifted);

	return decimalShift(rounded, -precision);
}
