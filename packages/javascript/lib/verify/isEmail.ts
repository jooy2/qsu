export function isEmail(email: string, onlyLowerCase = false): boolean {
	// RFC2822 Email Validation
	const char = `a-z${onlyLowerCase ? '' : 'A-Z'}`;

	const regex = new RegExp(
		`^[${char}0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[${char}0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[${char}0-9](?:[${char}0-9-]*[${char}0-9])?\\.)+[${char}0-9](?:[${char}0-9-]*[${char}0-9])?$`,
		'g'
	);

	return regex.test(email);
}
