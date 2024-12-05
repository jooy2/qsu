import type { PositiveNumber } from './types/global';

export function sleep<N extends number>(delay: PositiveNumber<N>): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, delay);
	});
}

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

export function debounce<N extends number>(
	func: (...args: any[]) => void,
	timeout: PositiveNumber<N>
): (...args: any[]) => void {
	let timer: NodeJS.Timeout;

	return (...args: any[]): void => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(args);
		}, timeout);
	};
}
