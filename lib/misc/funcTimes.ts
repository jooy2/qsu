import type { PositiveNumber } from '../_types/global';

export function funcTimes<N extends number>(times: PositiveNumber<N>, iteratee: any): Array<any> {
	const results = [];

	for (let i = 0; i < times; i += 1) {
		if (typeof iteratee === 'function') {
			results[i] = iteratee.call();
		} else {
			results[i] = iteratee;
		}
	}

	return results;
}
