export function getGroupKeys(
	str: string,
	groupStart: string,
	groupEnd: string,
	ignoreValidation = false
): string[] {
	if (!str) return [];
	if (!groupStart || !groupEnd) throw new Error('`groupStart` and `groupEnd` must be non-empty.');
	if (groupStart === groupEnd) throw new Error('`groupStart` and `groupEnd` must be different.');
	if (groupStart.length === 1 && groupEnd.length !== 1) {
		throw new Error(
			'When `groupStart` is a single character, `groupEnd` must also be a single character.'
		);
	}
	if (groupEnd.length === 1 && groupStart.length !== 1) {
		throw new Error(
			'When `groupEnd` is a single character, `groupStart` must also be a single character.'
		);
	}

	const out: string[] = [];
	const n = str.length;
	const sLen = groupStart.length;
	const eLen = groupEnd.length;

	const isEscapedAt = (idx: number) => {
		let bs = 0;
		for (let k = idx - 1; k >= 0 && str[k] === '\\'; k--) bs++;
		return bs % 2 === 1;
	};

	const isSingle = sLen === 1 && eLen === 1;
	const sCh = isSingle ? groupStart : '';
	const eCh = isSingle ? groupEnd : '';

	const isValidStartAt = (i: number) => {
		if (i < 0 || i + sLen > n) return false;
		if (str.slice(i, i + sLen) !== groupStart) return false;
		if (isEscapedAt(i)) return false;
		if (isSingle) {
			if (i > 0 && str[i - 1] === sCh) return false;
			if (i + 1 < n && str[i + 1] === sCh) return false;
		}
		return true;
	};

	const isValidEndAt = (j: number) => {
		if (j < 0 || j + eLen > n) return false;
		if (str.slice(j, j + eLen) !== groupEnd) return false;
		if (isEscapedAt(j)) return false;
		if (isSingle) {
			if (j > 0 && str[j - 1] === eCh) return false;
			if (j + 1 < n && str[j + 1] === eCh) return false;
		}
		return true;
	};

	const isValidKey = (key: string) => {
		if (key.includes('\n') || key.includes('\r')) return false;
		if (key.includes(groupStart) || key.includes(groupEnd)) return false;
		if (ignoreValidation) return true;
		return /^[A-Za-z0-9_$-]*$/.test(key);
	};

	for (let i = 0; i <= n - sLen; i++) {
		if (!isValidStartAt(i)) continue;

		const begin = i + sLen;
		let endAt = -1;

		for (let j = begin; j <= n - eLen; j++) {
			if (isValidEndAt(j)) {
				endAt = j;
				break;
			}
		}

		if (endAt === -1) continue;

		const key = str.slice(begin, endAt);
		if (isValidKey(key)) out.push(key);

		i = endAt + eLen - 1;
	}

	return out;
}
