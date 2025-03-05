export function dateToYYYYMMDD(date: Date, separator = '-'): string {
	const month: number = date.getMonth() + 1;
	const day: number = date.getDate();

	return `${date.getFullYear()}${separator}${month < 10 ? `0${month}` : month}${separator}${
		day < 10 ? `0${day}` : day
	}`;
}
