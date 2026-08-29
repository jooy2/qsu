import type { AnyValueObject } from '../_types/global.js';

// Turns `a.b[0].c` into `['a', 'b', '0', 'c']`. A bracket may carry a quoted key, so
// `a["b.c"]` reads one key `b.c` instead of two.
function parsePath(path: string): string[] {
	const segments: string[] = [];
	const pathLength = path.length;
	let current = '';
	let i = 0;

	while (i < pathLength) {
		const char = path[i];

		if (char === '[') {
			const end = path.indexOf(']', i);

			if (end === -1) {
				current += char;
				i += 1;
				continue;
			}

			if (current !== '') {
				segments.push(current);
				current = '';
			}

			let inner = path.slice(i + 1, end);
			const quote = inner[0];

			if (inner.length >= 2 && (quote === "'" || quote === '"') && inner.endsWith(quote)) {
				inner = inner.slice(1, -1);
			}

			segments.push(inner);
			i = end + 1;

			// `a[0].b` puts a dot right after the bracket, which would otherwise close an
			// empty segment and make the lookup miss.
			if (path[i] === '.') {
				i += 1;
			}

			continue;
		}

		if (char === '.') {
			segments.push(current);
			current = '';
			i += 1;
			continue;
		}

		current += char;
		i += 1;
	}

	if (current !== '' || segments.length === 0) {
		segments.push(current);
	}

	return segments;
}

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
