export function getStrBytes(str: string): number {
	if (!str) {
		return 0;
	}

	let bytes = 0;

	for (const c of str) {
		const codePoint = c.codePointAt(0);

		if (codePoint) {
			if (codePoint <= 0x7f) {
				bytes += 1;
			} else if (codePoint <= 0x7ff) {
				bytes += 2;
			} else if (codePoint <= 0xffff) {
				bytes += 3;
			} else {
				bytes += 4;
			}
		}
	}

	return bytes;
}
