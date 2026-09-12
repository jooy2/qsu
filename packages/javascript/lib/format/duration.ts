import type { DurationOptions } from '../_types/global.js';
import { durationParts, findUnit } from './durationParts.js';

function label(value: number, name: string, useShortString: boolean, useSpace: boolean): string {
	const unit = findUnit(name);
	const space = useSpace ? ' ' : '';
	const suffix = useShortString ? (unit?.short ?? name) : `${name}${value === 1 ? '' : 's'}`;

	return `${value}${space}${suffix}`;
}

export function duration(milliseconds: number, options?: DurationOptions): string {
	const { useShortString = false, useSpace = true, separator = ' ' } = { ...options };

	return durationParts(milliseconds, options)
		.map((part) => label(part.value, part.unit, useShortString, useSpace))
		.join(separator);
}
