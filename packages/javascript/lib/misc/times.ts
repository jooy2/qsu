import type { NonNegativeNumber } from '../_types/global.js';

export function times<N extends number>(count: NonNegativeNumber<N>, iteratee: any): Array<any> {
	const results = [];

	for (let i = 0; i < count; i += 1) {
		if (typeof iteratee === 'function') {
			results[i] = iteratee.call();
		} else {
			results[i] = iteratee;
		}
	}

	return results;
}
