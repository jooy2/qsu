import type { AnyValueObject } from '../_types/global.js';
import { isObject } from '../verify/isObject.js';

// `seen` maps every container already copied to its copy, so a structure that points back
// at itself is rebuilt with the same shape instead of recursing until the stack runs out.
function cloneValue(value: any, seen: WeakMap<object, any>): any {
	if (value === null || typeof value !== 'object') {
		return value;
	}

	if (seen.has(value)) {
		return seen.get(value);
	}

	if (value instanceof Date) {
		return new Date(value.getTime());
	}

	if (value instanceof RegExp) {
		return new RegExp(value.source, value.flags);
	}

	if (Array.isArray(value)) {
		const copy: any[] = [];

		seen.set(value, copy);

		for (let i = 0, valueLength = value.length; i < valueLength; i += 1) {
			copy[i] = cloneValue(value[i], seen);
		}

		return copy;
	}

	if (value instanceof Map) {
		const copy = new Map();

		seen.set(value, copy);
		value.forEach((entryValue: any, entryKey: any) => {
			copy.set(cloneValue(entryKey, seen), cloneValue(entryValue, seen));
		});

		return copy;
	}

	if (value instanceof Set) {
		const copy = new Set();

		seen.set(value, copy);
		value.forEach((entry: any) => {
			copy.add(cloneValue(entry, seen));
		});

		return copy;
	}

	if (isObject(value)) {
		const copy: AnyValueObject = {};

		seen.set(value, copy);
		Object.keys(value).forEach((key: string) => {
			copy[key] = cloneValue(value[key], seen);
		});

		return copy;
	}

	// A function or a class instance cannot be rebuilt without knowing how it was made, so
	// it is handed back as it is.
	return value;
}

export function objClone(obj: any, options?: { deep?: boolean }): any {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (options?.deep === false) {
		if (Array.isArray(obj)) {
			return [...obj];
		}

		if (obj instanceof Date) {
			return new Date(obj.getTime());
		}

		if (obj instanceof RegExp) {
			return new RegExp(obj.source, obj.flags);
		}

		if (obj instanceof Map) {
			return new Map(obj);
		}

		if (obj instanceof Set) {
			return new Set(obj);
		}

		return isObject(obj) ? { ...obj } : obj;
	}

	return cloneValue(obj, new WeakMap());
}
