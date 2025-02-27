import type { PositiveNumber } from '../_types/global';

export function sleep<N extends number>(delay: PositiveNumber<N>): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, delay);
	});
}
