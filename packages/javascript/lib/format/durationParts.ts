import type { DurationPart, DurationPartsOptions, DurationUnitName } from '../_types/global.js';

export type Unit = { name: DurationUnitName; short: string; ms: number };

// Descending order. `ms` is the absolute number of milliseconds in one unit.
// A month is treated as 30 days and a year as 365 days.
export const UNITS: Unit[] = [
	{ name: 'Year', short: 'Y', ms: 31536000000 },
	{ name: 'Month', short: 'Mo', ms: 2592000000 },
	{ name: 'Day', short: 'D', ms: 86400000 },
	{ name: 'Hour', short: 'H', ms: 3600000 },
	{ name: 'Minute', short: 'M', ms: 60000 },
	{ name: 'Second', short: 'S', ms: 1000 },
	{ name: 'Millisecond', short: 'ms', ms: 1 }
];

// Drop floating point noise while keeping up to 6 decimals (only relevant in single-unit mode).
export function cleanNumber(value: number): number {
	return Number(value.toFixed(6));
}

export function findUnit(name: string): Unit | undefined {
	const wanted = name.toLowerCase().replace(/s$/, '');

	return UNITS.find((unit) => unit.name.toLowerCase() === wanted);
}

export function durationParts(
	milliseconds: number,
	options?: DurationPartsOptions
): DurationPart[] {
	const { withZeroValue = false, withMilliSeconds = false, maxUnitCount, unit } = { ...options };

	// Single-unit mode: express the whole duration with one unit (fractions allowed).
	if (unit) {
		const target = findUnit(unit);

		if (target) {
			return [{ value: cleanNumber(milliseconds / target.ms), unit: target.name }];
		}
	}

	const activeUnits = withMilliSeconds ? UNITS : UNITS.filter((u) => u.name !== 'Millisecond');
	const values: DurationPart[] = [];
	let remaining = milliseconds;

	for (const u of activeUnits) {
		const value = Math.floor(remaining / u.ms);

		remaining -= value * u.ms;
		values.push({ value, unit: u.name });
	}

	// Skip leading units that are zero; keep interior/trailing zeros only when requested.
	const firstNonZero = values.findIndex((v) => v.value !== 0);

	if (firstNonZero === -1) {
		return [];
	}

	const parts = values.slice(firstNonZero).filter((v) => withZeroValue || v.value !== 0);

	if (typeof maxUnitCount === 'number' && maxUnitCount >= 0) {
		return parts.slice(0, maxUnitCount);
	}

	return parts;
}
