import type { PositiveNumber } from '../_types/global';

export function fileSize<N extends number>(bytes: PositiveNumber<N>, decimals = 2): string {
	if (!bytes || bytes === 0 || bytes < 0) {
		return '0 Bytes';
	}

	const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));

	return `${parseFloat((bytes / 1024 ** byteCalc).toFixed(decimals < 0 ? 0 : decimals))} ${
		['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][byteCalc]
	}`;
}
