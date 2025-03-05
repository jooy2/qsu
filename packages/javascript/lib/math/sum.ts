export function sum(...args: any[]): number;

export function sum(...args: Array<number>): number;

export function sum(...args: Array<number> | number[]): number {
	const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
	let total = 0;

	for (let i = 0, iLen = val.length; i < iLen; i += 1) {
		if (typeof val[i] === 'number') {
			total += val[i];
		}
	}

	return total;
}
