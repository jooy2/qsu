export function clamp(value: number, min: number, max: number): number {
	// The upper bound is applied first and the lower bound second, so `min` wins when the
	// two are passed the wrong way round. Lodash resolves an inverted range the same way,
	// where Dart's built-in `num.clamp` throws instead.
	return Math.max(Math.min(value, max), min);
}
