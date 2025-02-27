export function len(data: any): number {
	if (!data) {
		return 0;
	}
	switch (typeof data) {
		case 'object':
			return Array.isArray(data) ? data.length : Object.keys(data).length;
		case 'number':
		case 'bigint':
			return data.toString().length;
		case 'boolean':
			return data ? 4 : 5;
		case 'function':
			return data().length;
		case 'string':
		default:
			return data.length;
	}
}
