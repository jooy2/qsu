export function isObject(data: any): boolean {
	return data !== null && data !== undefined && Object.getPrototypeOf(data) === Object.prototype;
}

export function isEqual(leftOperand: any, ...rightOperand: Array<any>): boolean {
	const rightOperands =
		rightOperand.length > 0 && typeof rightOperand[0] === 'object' ? rightOperand[0] : rightOperand;
	const rightOperandLength: number = rightOperands.length;

	for (let i = 0; i < rightOperandLength; i += 1) {
		// eslint-disable-next-line eqeqeq
		if (rightOperands[i] != leftOperand) {
			return false;
		}
	}

	return true;
}

export function isEqualStrict(leftOperand: any, ...rightOperand: Array<any>): boolean {
	const rightOperands =
		rightOperand.length > 0 && typeof rightOperand[0] === 'object' ? rightOperand[0] : rightOperand;
	const rightOperandLength: number = rightOperands.length;

	for (let i = 0; i < rightOperandLength; i += 1) {
		if (rightOperands[i] !== leftOperand) {
			return false;
		}
	}

	return true;
}

export function isEmpty(data?: any): boolean {
	if (!data) {
		return true;
	}

	switch (typeof data) {
		case 'string':
			return data.length < 1;
		case 'object':
			if (Array.isArray(data)) {
				return data.length < 1;
			}
			return Object.keys(data).length < 1;
		default:
			return false;
	}
}

export function isUrl(url: string, withProtocol = false, strict = false): boolean {
	if (strict && url.indexOf('.') === -1) {
		return false;
	}

	try {
		new URL(`${withProtocol && url.indexOf('://') === -1 ? 'https://' : ''}${url}`).toString();
	} catch (e) {
		return false;
	}

	return true;
}

export function contains(str: any[] | string, search: any[] | string, exact = false): boolean {
	if (typeof search === 'string') {
		return str.length < 1 ? false : str.indexOf(search) !== -1;
	}

	for (let i = 0, iLen = search.length; i < iLen; i += 1) {
		if (exact) {
			if (str === search[i]) {
				return true;
			}
		} else if (str.indexOf(search[i]) !== -1) {
			return true;
		}
	}

	return false;
}

export function is2dArray(array: any[]): boolean {
	return array.filter(Array.isArray).length > 0;
}

export function between(range: [number, number], number: number, inclusive = false): boolean {
	const minM = Math.min.apply(Math, [range[0], range[1]]);
	const maxM = Math.max.apply(Math, [range[0], range[1]]);

	return inclusive ? number >= minM && number <= maxM : number > minM && number < maxM;
}

export function len(data: any): number {
	if (!data) {
		return 0;
	}
	switch (typeof data) {
		case 'object':
			return Array.isArray(data) ? data.length : Object.keys(data).length;
		case 'number':
		case 'bigint':
			return data.toString().length;
		case 'boolean':
			return data ? 4 : 5;
		case 'function':
			return data().length;
		case 'string':
		default:
			return data.length;
	}
}

export function isEmail(email: string): boolean {
	// RFC2822 Email Validation
	return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
		email
	);
}

export function isTrueMinimumNumberOfTimes(conditions: boolean[], minimumCount = 1): boolean {
	const conditionLength = conditions.length;
	let trueCount = 0;

	for (let i = 0; i < conditionLength; i += 1) {
		if (typeof conditions[i] === 'boolean' && conditions[i]) {
			trueCount += 1;
		}
	}

	return trueCount >= minimumCount;
}
