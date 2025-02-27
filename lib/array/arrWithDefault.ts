export function arrWithDefault(defaultValue: any, length = 0): any[] {
	if (length < 1) {
		return [];
	}

	return Array(length).fill(defaultValue);
}
