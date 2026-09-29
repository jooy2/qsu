import type { AnyValueObject } from '../_types/global.js';
import { parsePath } from './_parsePath.js';

export function objGet(obj: AnyValueObject, path: string, options?: { fallback?: any }): any {
	const fallback = options?.fallback ?? null;

	if (!obj || typeof obj !== 'object' || typeof path !== 'string') {
		return fallback;
	}

	const segments = parsePath(path);
	let current: any = obj;

	for (let i = 0, segmentsLength = segments.length; i < segmentsLength; i += 1) {
		// The presence of the key decides, not the value behind it, so a stored `null` is
		// returned as it is instead of being replaced by the fallback.
		if (current === null || typeof current !== 'object' || !Object.hasOwn(current, segments[i])) {
			return fallback;
		}

		current = current[segments[i]];
	}

	return current;
}
