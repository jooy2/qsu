export function numberFormat(number: number | string): string {
	const numberParts =
		typeof number === 'string' ? number.split('.') : Math.abs(number).toString().split('.');

	const numberFormatted = new Intl.NumberFormat('en-US', {
		roundingPriority: 'morePrecision'
	}).format(parseInt(numberParts[0], 10));

	return `${numberFormatted}${numberParts.length > 1 ? `.${numberParts[1]}` : ''}`;
}
