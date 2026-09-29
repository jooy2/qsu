/**
 * (Private, not exported from the package) The path syntax shared by `objGet` and `objSet`.
 *
 * Turns `a.b[0].c` into `['a', 'b', '0', 'c']`. A bracket may carry a quoted key, so
 * `a["b.c"]` reads one key `b.c` instead of two.
 */
export function parsePath(path: string): string[] {
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
