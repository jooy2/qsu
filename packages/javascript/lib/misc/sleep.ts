import type { NonNegativeNumber } from '../_types/global.js';

export function sleep<N extends number>(delay: NonNegativeNumber<N>): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, delay);
	});
}
