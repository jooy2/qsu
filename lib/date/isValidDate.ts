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
