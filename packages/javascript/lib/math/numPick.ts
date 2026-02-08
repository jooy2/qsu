export function numPick(min: number, max: number): number {
	if (!min && !max) {
		return Math.random() > 0.5 ? 1 : 0;
	}

	const limit = !max ? min : max;
	const offset = !max || min >= max ? null : min;

	return Math.floor(Math.random() * (offset ? limit - offset + 1 : limit + 1)) + (offset || 0);
}
