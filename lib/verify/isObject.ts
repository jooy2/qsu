export function isObject(data: any): boolean {
	return data !== null && data !== undefined && Object.getPrototypeOf(data) === Object.prototype;
}
