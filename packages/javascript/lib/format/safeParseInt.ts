export function safeParseInt(value: any, fallback = 0, radix = 10): number {
	if (!value || value.toString().length < 1) {
		return fallback;
	}

	try {
		return parseInt(value.toString().split('.')[0], radix);
	} catch (e) {
		return fallback;
	}
}
