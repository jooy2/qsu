export function average(array: number[]): number {
	return array.reduce((p, c) => p + c, 0) / array.length;
}
