import { dateToYYYYMMDD } from './dateToYYYYMMDD.js';
import { isValidDate } from './isValidDate.js';

export function createDateListFromRange(startDate: Date, endDate: Date): string[] {
	if (!isValidDate(dateToYYYYMMDD(startDate)) || !isValidDate(dateToYYYYMMDD(endDate))) {
		throw new Error('Either the start date or end date is an invalid date.');
	}

	const dateDiff = Math.floor(
		(Date.parse(endDate.toString()) - Date.parse(startDate.toString())) / 86400000
	);

	if (dateDiff < 0) {
		throw new Error('The start date is more recent than the end date.');
	}

	const endDateStr: string = dateToYYYYMMDD(endDate);
	const allDate: string[] = [];
	let currentYear: number = startDate.getFullYear();
	let currentMonth: number = startDate.getMonth() + 1;
	let currentDay: number = startDate.getDate();
	let currentDateStr = '';

	const createNewDateStr = (year: number, month: number, day: number): string =>
		`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

	while (endDateStr !== currentDateStr) {
		if (/[0-9]{4}-12-31/g.test(currentDateStr)) {
			currentYear += 1;
			currentMonth = 1;
			currentDay = 1;
		}

		const currentNewDateStr = createNewDateStr(currentYear, currentMonth, currentDay);

		if (isValidDate(currentNewDateStr)) {
			currentDay += 1;
			allDate.push(currentNewDateStr);
			currentDateStr = currentNewDateStr;
		} else {
			currentMonth += 1;
			currentDay = 1;
			currentDateStr = createNewDateStr(currentYear, currentMonth, currentDay);
		}
	}

	return allDate;
}
