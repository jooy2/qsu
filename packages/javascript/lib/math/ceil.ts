import { decimalShift } from './_decimalShift.js';

export function ceil(value: number, precision = 0): number {
	if (!Number.isFinite(value)) {
		return value;
	}

	// Toward positive infinity, so a negative value rises: `ceil(-4.006)` is `-4`.
	return decimalShift(Math.ceil(decimalShift(value, precision)), -precision);
}
