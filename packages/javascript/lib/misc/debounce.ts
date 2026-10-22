import type { NonNegativeNumber } from '../_types/global.js';

export function debounce<N extends number>(
	func: (...args: any[]) => void,
	wait: NonNegativeNumber<N>
): (...args: any[]) => void {
	let timer: NodeJS.Timeout | undefined;

	return (...args: any[]): void => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			func(...args);
		}, wait);

		// A pending debounce should not keep a Node process alive. No-op in browsers.
		timer?.unref?.();
	};
}
