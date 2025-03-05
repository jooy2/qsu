export function dayDiff(date1: Date, date2?: Date): number {
	const date2c = date2 || new Date();

	return Math.ceil(Math.abs(date2c.getTime() - date1.getTime()) / (1000 * 3600 * 24));
}
