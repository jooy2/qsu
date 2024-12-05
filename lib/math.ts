export function numRandom(min: number, max: number): number {
	if (!min && !max) {
		return Math.random() > 0.5 ? 1 : 0;
	}

	const limit = !max ? min : max;
	const offset = !max || min >= max ? null : min;

	return Math.floor(Math.random() * (offset ? limit - offset + 1 : limit + 1)) + (offset || 0);
}

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

export function mul(...args: any[]): number;

export function mul(...args: Array<number>): number;

export function mul(...args: Array<number> | number[]): number {
	const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
	let total = val[0];

	for (let i = 1, iLen = val.length; i < iLen; i += 1) {
		if (typeof val[i] === 'number') {
			total *= val[i];
		}
	}

	return total;
}

export function sub(...args: any[]): number;

export function sub(...args: Array<number>): number;

export function sub(...args: Array<number> | number[]): number {
	const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
	let total = val[0];

	for (let i = 1, iLen = val.length; i < iLen; i += 1) {
		if (typeof val[i] === 'number') {
			total -= val[i];
		}
	}

	return total;
}

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
