export function strCount(str: string, search: string): number {
	if (!str || !search) {
		return 0;
	}

	let count = 0;
	let pos = str.indexOf(search);

	while (pos > -1) {
		count += 1;
		pos = str.indexOf(search, (pos += search.length));
	}

	return count;
}
