import type { AnyValueObject } from '../_types/global.js';
import { getOwn, setOwn } from './_ownProperty.js';
import { parsePath } from './_parsePath.js';

const DIGITS_ONLY = /^[0-9]+$/;

// A class instance, a `Date` or a `Map` is not a plain object: a spread copy would keep its
// own keys and lose everything else, so on the path it is replaced like any other value.
function isPlainObject(value: any): boolean {
	if (value === null || typeof value !== 'object') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);

	return prototype === Object.prototype || prototype === null;
}

// Keeps a `null` prototype. A spread defines every key as an own property, so an own
// `__proto__` key is copied as data, and `Object.assign` does too on an object that has no
// prototype to intercept it.
function copyContainer(value: any): any {
	if (Array.isArray(value)) {
		return [...value];
	}

	return Object.getPrototypeOf(value) === null
		? Object.assign(Object.create(null), value)
		: { ...value };
}

// From 0 to `length`, where `length` appends. Anything further would leave a hole.
function toListIndex(list: any[], segment: string): number {
	const index = DIGITS_ONLY.test(segment) ? Number(segment) : -1;

	if (index < 0 || index > list.length) {
		throw new RangeError(`\`path\` does not name an index of the list at \`${segment}\`.`);
	}

	return index;
}

// Own keys only, so `constructor` or `toString` count as missing instead of leading the walk
// into a prototype.
function readSegment(container: any, segment: string): any {
	if (Array.isArray(container)) {
		return container[toListIndex(container, segment)];
	}

	return getOwn(container, segment);
}

function writeSegment(container: any, segment: string, value: any): void {
	if (Array.isArray(container)) {
		container[toListIndex(container, segment)] = value;

		return;
	}

	setOwn(container, segment, value);
}

export function objSet(obj: AnyValueObject, path: string, value: any): AnyValueObject | null {
	if (!isPlainObject(obj) || typeof path !== 'string') {
		return null;
	}

	const segments = parsePath(path);
	const lastIndex = segments.length - 1;
	const result = copyContainer(obj);
	let current: any = result;

	// Every container on the path is copied and everything beside it is shared, so the source
	// is never modified.
	for (let i = 0; i < lastIndex; i += 1) {
		const existing = readSegment(current, segments[i]);
		// A missing level is always an object, even under `[0]`: an array would need holes to
		// reach the index, and the three packages represent holes differently.
		const next = Array.isArray(existing) || isPlainObject(existing) ? copyContainer(existing) : {};

		writeSegment(current, segments[i], next);
		current = next;
	}

	writeSegment(current, segments[lastIndex], value);

	return result;
}
