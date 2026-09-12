import type {
	FileSizeOptions,
	FileSizeParts,
	FileSizeStandard,
	PositiveNumber
} from '../_types/global.js';

type UnitTable = { base: number; short: string[]; long: string[] };

// `jedec` divides by 1024 and labels the result `KB`, which is what this package has
// always done. `iec` keeps the 1024 divisor and uses the prefixes that actually mean
// 1024, and `si` is the decimal one. The exponent 0 label stays `Bytes` everywhere,
// because no prefix is involved there.
const STANDARDS: Record<FileSizeStandard, UnitTable> = {
	jedec: {
		base: 1024,
		short: ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		long: [
			'Byte',
			'Kilobyte',
			'Megabyte',
			'Gigabyte',
			'Terabyte',
			'Petabyte',
			'Exabyte',
			'Zettabyte',
			'Yottabyte'
		]
	},
	iec: {
		base: 1024,
		short: ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
		long: [
			'Byte',
			'Kibibyte',
			'Mebibyte',
			'Gibibyte',
			'Tebibyte',
			'Pebibyte',
			'Exbibyte',
			'Zebibyte',
			'Yobibyte'
		]
	},
	si: {
		base: 1000,
		short: ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		long: [
			'Byte',
			'Kilobyte',
			'Megabyte',
			'Gigabyte',
			'Terabyte',
			'Petabyte',
			'Exabyte',
			'Zettabyte',
			'Yottabyte'
		]
	}
};

export function resolveUnitTable(standard: FileSizeStandard | undefined): UnitTable {
	return STANDARDS[standard as FileSizeStandard] ?? STANDARDS.jedec;
}

// The short label is a fixed string, so `1` reads as `1 Bytes` exactly as it always has.
// The long label is new, so it takes the singular the way `duration` does.
export function unitLabel(
	table: UnitTable,
	exponent: number,
	unitDisplay: string | undefined,
	value: number
): string {
	if (unitDisplay !== 'long') {
		return table.short[exponent];
	}

	return `${table.long[exponent]}${value === 1 ? '' : 's'}`;
}

export function sizeExponent(bytes: number, base: number, unitCount: number): number {
	// Clamp instead of running off the end of the table: the exponent for a value past
	// the largest unit used to index past it, which read as `undefined` here and threw
	// in the other two packages.
	return Math.min(Math.floor(Math.log(bytes) / Math.log(base)), unitCount - 1);
}

export function fileSizeParts<N extends number>(
	bytes: PositiveNumber<N>,
	options?: FileSizeOptions
): FileSizeParts {
	const { standard, unitDisplay } = { ...options };
	const table = resolveUnitTable(standard);

	if (bytes < 1) {
		return { value: 0, unit: unitLabel(table, 0, unitDisplay, 0), exponent: 0 };
	}

	const exponent = sizeExponent(bytes, table.base, table.short.length);
	const value = bytes / table.base ** exponent;

	return { value, unit: unitLabel(table, exponent, unitDisplay, value), exponent };
}
