import type { PositiveNumber } from '../_types/global';

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
