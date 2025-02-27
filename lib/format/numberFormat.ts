export function numberFormat(number: number | string): string {
	return new Intl.NumberFormat('en-US', {
		roundingPriority: 'morePrecision'
	}).format(number as number);
}
