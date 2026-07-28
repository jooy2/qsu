import type { PositiveNumber } from '../_types/global';

export function debounce<N extends number>(
	func: (...args: any[]) => void,
	timeout: PositiveNumber<N>
): (...args: any[]) => void {
	let timer: NodeJS.Timeout | undefined;

	return (...args: any[]): void => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			func(...args);
		}, timeout);

		// A pending debounce should not keep a Node process alive. No-op in browsers.
		timer?.unref?.();
	};
}
