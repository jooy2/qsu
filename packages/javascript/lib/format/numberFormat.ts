const DIGITS_ONLY = /^\d+$/;

// Creating an `Intl.NumberFormat` is expensive, so build it once and reuse it.
const FALLBACK_FORMATTER = new Intl.NumberFormat('en-US', {
	roundingPriority: 'morePrecision'
});

// Group digits straight from the string so values beyond `Number.MAX_SAFE_INTEGER`
// keep every digit (`parseInt` would round them).
function groupThousands(digits: string): string {
	let result = '';

	for (let end = digits.length; end > 0; end -= 3) {
		const chunk = digits.slice(Math.max(0, end - 3), end);

		result = result === '' ? chunk : `${chunk},${result}`;
	}

	return result;
}

export function numberFormat(number: number | string): string {
	if (number === null || number === undefined) {
		return '';
	}

	const str = typeof number === 'string' ? number : number.toString();
	const isNegative = str.startsWith('-');
	const abs = isNegative ? str.slice(1) : str;

	const numberParts = abs.split('.');

	const numberFormatted = DIGITS_ONLY.test(numberParts[0])
		? groupThousands(numberParts[0])
		: FALLBACK_FORMATTER.format(parseInt(numberParts[0], 10));

	const result = `${numberFormatted}${numberParts.length > 1 ? `.${numberParts[1]}` : ''}`;
	return isNegative ? `-${result}` : result;
}
