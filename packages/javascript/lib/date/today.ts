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
