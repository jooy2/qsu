// The Gregorian rule, applied to year 0 and negative years as well (the proleptic calendar).
export function isLeapYear(year: number): boolean {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
