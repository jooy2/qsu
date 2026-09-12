import type { FileSizeOptions, PositiveNumber } from '../_types/global.js';
import { fileSizeParts, resolveUnitTable, unitLabel } from './fileSizeParts.js';

export function fileSizeFormat<N extends number>(
	bytes: PositiveNumber<N>,
	decimals = 2,
	ceil = false,
	options?: FileSizeOptions
): string {
	const { standard, unitDisplay } = { ...options };
	const { value, exponent } = fileSizeParts(bytes, options);

	const rounded = ceil ? Math.ceil(value) : parseFloat(value.toFixed(decimals < 0 ? 0 : decimals));

	// The label is taken from the rounded number, so a value that rounds to one is not
	// written as `1 Megabytes`.
	return `${rounded} ${unitLabel(resolveUnitTable(standard), exponent, unitDisplay, rounded)}`;
}
