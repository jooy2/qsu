export function is2dArray(array: any[]): boolean {
	// `some` stops at the first match. `filter` walked the whole array and allocated a new one.
	return array.some(Array.isArray);
}
