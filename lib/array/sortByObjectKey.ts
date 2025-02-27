export function sortByObjectKey(
	array: any[],
	key: string,
	descending = false,
	numerically = false
): any[] {
	if (numerically) {
		const collator = new Intl.Collator([], { numeric: true });
		const result = array.sort((a: any, b: any) => collator.compare(a[key], b[key]));

		return descending ? result.reverse() : result;
	}

	return array.sort((a: any, b: any) => {
		if (!descending) {
			if (a[key] < b[key]) return -1;
			if (a[key] > b[key]) return 1;

			return 0;
		}

		if (a[key] > b[key]) return -1;
		if (a[key] < b[key]) return 1;

		return 0;
	});
}
