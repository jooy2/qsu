export function div(...args: any[]): number;

export function div(...args: Array<number>): number;

export function div(...args: Array<number> | number[]): number {
	const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
	let total = val[0];

	for (let i = 1, iLen = val.length; i < iLen; i += 1) {
		if (typeof val[i] === 'number') {
			total /= val[i];
		}
	}

	return total;
}
