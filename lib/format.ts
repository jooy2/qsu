import { basename, extname, win32 } from 'path';
import type { AnyValueObject, DurationOptions, PositiveNumber } from './types/global.js';

export function numberFormat(number: number | string): string {
	return new Intl.NumberFormat('en-US', {
		roundingPriority: 'morePrecision'
	}).format(number as number);
}

export function fileName(filePath: string, withExtension = false): string {
	if (!filePath) {
		return '';
	}

	if (filePath.indexOf('/') === -1) {
		// Windows path
		if (withExtension) {
			return win32.basename(filePath);
		}

		return win32.basename(filePath, extname(filePath));
	}

	if (withExtension) {
		return basename(filePath);
	}

	return basename(filePath, extname(filePath));
}

export function fileSize<N extends number>(bytes: PositiveNumber<N>, decimals = 2): string {
	if (!bytes || bytes === 0 || bytes < 0) {
		return '0 Bytes';
	}

	const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));

	return `${parseFloat((bytes / 1024 ** byteCalc).toFixed(decimals < 0 ? 0 : decimals))} ${
		['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][byteCalc]
	}`;
}

export function fileExt(filePath: string): string {
	if (filePath.indexOf('.') === -1) {
		return 'Unknown';
	}

	const pSpl = filePath.trim().toLowerCase().split('.');

	return pSpl.length > 0 ? pSpl[pSpl.length - 1] : 'Unknown';
}

export function duration(milliseconds: number, options?: DurationOptions): string {
	const {
		useShortString = false,
		useSpace = true,
		withZeroValue = false,
		separator = ' '
	} = { ...options };
	const units = [
		{ name: 'Millisecond', short: 'ms', divider: 1000 },
		{ name: 'Second', short: 'S', divider: 60 },
		{ name: 'Minute', short: 'M', divider: 60 },
		{ name: 'Hour', short: 'H', divider: 24 },
		{ name: 'Day', short: 'D', divider: 31 }
	];
	const result = [];
	let currentMilliseconds = milliseconds;

	for (let i = 0; i < units.length; i += 1) {
		const unit = units[i];
		let divideValue = currentMilliseconds % unit.divider;

		if (i === units.length - 1) {
			divideValue = Math.trunc(currentMilliseconds);
		} else {
			currentMilliseconds = (currentMilliseconds - divideValue) / unit.divider;
		}

		if (withZeroValue || (!withZeroValue && divideValue !== 0)) {
			result.push(
				`${divideValue}${useSpace ? ' ' : ''}${useShortString ? unit.short : `${unit.name}${divideValue < 2 ? '' : 's'}`}`
			);
		}
	}

	return result.reverse().join(separator);
}

export function safeJSONParse(jsonString: any, fallback = {}): AnyValueObject {
	if (!jsonString) {
		return fallback;
	}

	if (Array.isArray(jsonString) || typeof jsonString === 'object') {
		try {
			return JSON.parse(JSON.stringify(jsonString));
		} catch (e) {
			return fallback;
		}
	}

	try {
		return JSON.parse(jsonString);
	} catch (e) {
		return fallback;
	}
}

export function safeParseInt(value: any, fallback = 0, radix = 10): number {
	if (!value || value.toString().length < 1) {
		return fallback;
	}

	try {
		return parseInt(value.toString().split('.')[0], radix);
	} catch (e) {
		return fallback;
	}
}
