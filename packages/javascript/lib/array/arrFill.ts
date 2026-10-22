export function arrFill(value: any, length = 0): any[] {
	if (length < 1) {
		return [];
	}

	return Array(length).fill(value);
}
