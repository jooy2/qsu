import type { PositiveNumber } from '../_types/global';

export function fileSizeFormat<N extends number>(
	bytes: PositiveNumber<N>,
	decimals = 2,
	ceil = false
): string {
	const sizeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (bytes < 1) {
		return `0 ${sizeUnits[0]}`;
	}

	const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));
	const byteResult = bytes / 1024 ** byteCalc;

	return `${ceil ? Math.ceil(byteResult) : parseFloat(byteResult.toFixed(decimals < 0 ? 0 : decimals))} ${
		sizeUnits[byteCalc]
	}`;
}
