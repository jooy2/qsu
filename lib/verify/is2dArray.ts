export function is2dArray(array: any[]): boolean {
	return array.filter(Array.isArray).length > 0;
}
