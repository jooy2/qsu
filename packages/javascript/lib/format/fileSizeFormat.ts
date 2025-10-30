import type { PositiveNumber } from '../_types/global';

export function fileSizeFormat<N extends number>(bytes: PositiveNumber<N>, decimals = 2): string {
	const sizeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (bytes < 1) {
		return `0 ${sizeUnits[0]}`;
	}

	const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));

	return `${parseFloat((bytes / 1024 ** byteCalc).toFixed(decimals < 0 ? 0 : decimals))} ${
		sizeUnits[byteCalc]
	}`;
}
