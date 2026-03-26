export function numberFormat(number: number | string): string {
	if (!number) {
		return '';
	}

	const str = typeof number === 'string' ? number : number.toString();
	const isNegative = str.startsWith('-');
	const abs = isNegative ? str.slice(1) : str;

	const numberParts = abs.split('.');

	const numberFormatted = new Intl.NumberFormat('en-US', {
		roundingPriority: 'morePrecision'
	}).format(parseInt(numberParts[0], 10));

	const result = `${numberFormatted}${numberParts.length > 1 ? `.${numberParts[1]}` : ''}`;
	return isNegative ? `-${result}` : result;
}
