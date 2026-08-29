import type { PositiveNumber, ThrottleOptions } from '../_types/global.js';

export function throttle<N extends number>(
	func: (...args: any[]) => void,
	wait: PositiveNumber<N>,
	options?: ThrottleOptions
): (...args: any[]) => void {
	const leading = options?.leading ?? true;
	const trailing = options?.trailing ?? true;

	// `null` means no window is open yet, so the next call opens one.
	let previous: number | null = null;
	let timer: NodeJS.Timeout | undefined;
	let lastArgs: any[] | null = null;

	const later = (): void => {
		// With `leading: false` the next call has to open a fresh window rather than fire
		// straight away.
		previous = leading ? Date.now() : null;
		timer = undefined;

		const pending = lastArgs;

		lastArgs = null;

		if (pending) {
			func(...pending);
		}
	};

	return (...args: any[]): void => {
		const now = Date.now();

		if (previous === null && !leading) {
			previous = now;
		}

		// `remaining > wait` catches a clock that stepped backwards.
		const remaining = previous === null ? 0 : wait - (now - previous);

		lastArgs = args;

		if (remaining <= 0 || remaining > wait) {
			if (timer) {
				clearTimeout(timer);
				timer = undefined;
			}

			previous = now;
			lastArgs = null;
			func(...args);
			return;
		}

		if (!timer && trailing) {
			timer = setTimeout(later, remaining);

			// A pending throttle should not keep a Node process alive. No-op in browsers.
			timer?.unref?.();
		}
	};
}
