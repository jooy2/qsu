export function dayDiff(date1: Date, date2?: Date): number {
	const date2c = date2 || new Date();

	return Math.ceil(Math.abs(date2c.getTime() - date1.getTime()) / (1000 * 3600 * 24));
}

export function today(separator = '-', yearFirst = true): string {
	const date = new Date();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const dateArr = [`${month < 10 ? '0' : ''}${month}`, `${day < 10 ? '0' : ''}${day}`];

	if (yearFirst) {
		dateArr.unshift(date.getFullYear().toString());
	} else {
		dateArr.push(date.getFullYear().toString());
	}

	return dateArr.join(separator);
}

export function isValidDate(dateYYYYMMDD: string): boolean {
	if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateYYYYMMDD)) {
		throw new Error("The date format must be 'YYYY-MM-DD'");
	}

	const convertedDate: string[] = dateYYYYMMDD.split('-');

	return /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/.test(
		`${parseInt(convertedDate[2], 10)}-${parseInt(convertedDate[1], 10)}-${parseInt(
			convertedDate[0],
			10
		)}`
	);
}

export function dateToYYYYMMDD(date: Date, separator = '-'): string {
	const month: number = date.getMonth() + 1;
	const day: number = date.getDate();

	return `${date.getFullYear()}${separator}${month < 10 ? `0${month}` : month}${separator}${
		day < 10 ? `0${day}` : day
	}`;
}

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
