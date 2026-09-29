import { isLeapYear } from './isLeapYear.js';

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getDaysInMonth(year: number, month: number): number {
	// `month` counts from 1, unlike `Date`, which counts from 0.
	if (!Number.isInteger(month) || month < 1 || month > 12) {
		throw new RangeError('`month` must be an integer from 1 to 12.');
	}

	if (month === 2 && isLeapYear(year)) {
		return 29;
	}

	return DAYS_IN_MONTH[month - 1];
}
