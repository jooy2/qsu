import type { DurationOptions, DurationUnitName } from '../_types/global';

type Unit = { name: DurationUnitName; short: string; ms: number };

// Descending order. `ms` is the absolute number of milliseconds in one unit.
// A month is treated as 30 days and a year as 365 days.
const UNITS: Unit[] = [
	{ name: 'Year', short: 'Y', ms: 31536000000 },
	{ name: 'Month', short: 'Mo', ms: 2592000000 },
	{ name: 'Day', short: 'D', ms: 86400000 },
	{ name: 'Hour', short: 'H', ms: 3600000 },
	{ name: 'Minute', short: 'M', ms: 60000 },
	{ name: 'Second', short: 'S', ms: 1000 },
	{ name: 'Millisecond', short: 'ms', ms: 1 }
];

// Drop floating point noise while keeping up to 6 decimals (only relevant in single-unit mode).
function cleanNumber(value: number): number {
	return Number(value.toFixed(6));
}

function label(value: number, unit: Unit, useShortString: boolean, useSpace: boolean): string {
	const space = useSpace ? ' ' : '';
	const suffix = useShortString ? unit.short : `${unit.name}${value === 1 ? '' : 's'}`;
	return `${value}${space}${suffix}`;
}

export function duration(milliseconds: number, options?: DurationOptions): string {
	const {
		useShortString = false,
		useSpace = true,
		withZeroValue = false,
		separator = ' ',
		withMilliSeconds = false,
		maxUnitCount,
		unit
	} = { ...options };

	// Single-unit mode: express the whole duration with one unit (fractions allowed).
	if (unit) {
		const name = unit.toLowerCase().replace(/s$/, '');
		const target = UNITS.find((u) => u.name.toLowerCase() === name);

		if (target) {
			return label(cleanNumber(milliseconds / target.ms), target, useShortString, useSpace);
		}
	}

	const activeUnits = withMilliSeconds ? UNITS : UNITS.filter((u) => u.name !== 'Millisecond');
	const values: { value: number; unit: Unit }[] = [];
	let remaining = milliseconds;

	for (const u of activeUnits) {
		const value = Math.floor(remaining / u.ms);
		remaining -= value * u.ms;
		values.push({ value, unit: u });
	}

	// Skip leading units that are zero; keep interior/trailing zeros only when requested.
	const firstNonZero = values.findIndex((v) => v.value !== 0);

	if (firstNonZero === -1) {
		return '';
	}

	let result = values
		.slice(firstNonZero)
		.filter((v) => withZeroValue || v.value !== 0)
		.map((v) => label(v.value, v.unit, useShortString, useSpace));

	if (typeof maxUnitCount === 'number' && maxUnitCount >= 0) {
		result = result.slice(0, maxUnitCount);
	}

	return result.join(separator);
}
