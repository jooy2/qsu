import type { DurationOptions } from '../_types/global';

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
