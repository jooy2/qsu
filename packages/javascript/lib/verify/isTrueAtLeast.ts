export function isTrueAtLeast(conditions: any[], count = 1): boolean {
	const conditionLength = conditions.length;
	let trueCount = 0;

	for (let i = 0; i < conditionLength; i += 1) {
		if (typeof conditions[i] === 'boolean' && conditions[i]) {
			trueCount += 1;
		}
	}

	return trueCount >= count;
}
