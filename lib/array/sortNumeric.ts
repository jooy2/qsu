export function sortNumeric(array: string[], descending = false): string[] {
	const collator = new Intl.Collator([], { numeric: true });
	const result = array.sort((a: any, b: any) => collator.compare(a, b));

	return descending ? result.reverse() : result;
}
