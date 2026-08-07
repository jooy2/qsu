export function max(...args: any[]): number | null;

export function max(...args: Array<number>): number | null;

export function max(...args: Array<number> | number[]): number | null {
	const val = args.length > 0 && Array.isArray(args[0]) ? args[0] : args;
	let result: number | null = null;

	for (let i = 0, iLen = val.length; i < iLen; i += 1) {
		const value = val[i];

		// `NaN` loses every comparison, so it would win by being seen first and then never
		// being replaced. Anything that is not a number is skipped, as `sum` does.
		if (typeof value === 'number' && !Number.isNaN(value) && (result === null || value > result)) {
			result = value;
		}
	}

	return result;
}
