// A plain object is one made by `{}` or `Object.create(null)`. A class instance is compared
// by identity, because its fields alone do not say whether two instances are the same.
function isPlainObject(value: any): boolean {
	const prototype = Object.getPrototypeOf(value);

	return prototype === Object.prototype || prototype === null;
}

// `stack` holds the pairs being compared further up. Meeting one of them again means the
// structure points back at itself, and counting it as equal keeps a cycle from recursing
// until the stack runs out.
function compare(left: any, right: any, stack: Array<[any, any]>): boolean {
	if (left === right) {
		return true;
	}

	// `NaN` is the one number that `===` does not match with itself.
	if (typeof left === 'number' && typeof right === 'number') {
		return Number.isNaN(left) && Number.isNaN(right);
	}

	if (left === null || right === null || typeof left !== 'object' || typeof right !== 'object') {
		return false;
	}

	if (left instanceof Date && right instanceof Date) {
		const leftTime = left.getTime();
		const rightTime = right.getTime();

		return leftTime === rightTime || (Number.isNaN(leftTime) && Number.isNaN(rightTime));
	}

	const leftIsArray = Array.isArray(left);
	const rightIsArray = Array.isArray(right);
	const bothPlain = !leftIsArray && !rightIsArray && isPlainObject(left) && isPlainObject(right);

	// Anything else, a `Map` or a class instance included, is equal only to itself, which the
	// first check already answered.
	if (!(leftIsArray && rightIsArray) && !bothPlain) {
		return false;
	}

	for (let i = 0, stackLength = stack.length; i < stackLength; i += 1) {
		if (stack[i][0] === left && stack[i][1] === right) {
			return true;
		}
	}

	stack.push([left, right]);

	let result: boolean;

	if (leftIsArray) {
		result = left.length === right.length;

		for (let i = 0, leftLength = left.length; result && i < leftLength; i += 1) {
			result = compare(left[i], right[i], stack);
		}
	} else {
		const leftKeys = Object.keys(left);

		result = leftKeys.length === Object.keys(right).length;

		// Key order is ignored, so each key is looked up on the other side rather than the two
		// key lists being compared in order.
		for (let i = 0, keysLength = leftKeys.length; result && i < keysLength; i += 1) {
			const key = leftKeys[i];

			result =
				Object.prototype.propertyIsEnumerable.call(right, key) &&
				compare(left[key], right[key], stack);
		}
	}

	stack.pop();

	return result;
}

export function isEqualDeep(left: any, right: any): boolean {
	return compare(left, right, []);
}
