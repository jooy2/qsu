export function isEmpty(data?: any): boolean {
	if (!data) {
		return true;
	}

	switch (typeof data) {
		case 'string':
			return data.length < 1;
		case 'object':
			if (Array.isArray(data)) {
				return data.length < 1;
			}
			return Object.keys(data).length < 1;
		default:
			return false;
	}
}
