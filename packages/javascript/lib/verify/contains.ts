export function contains(haystack: any[] | string, search: any[] | string, exact = false): boolean {
	if (typeof search === 'string') {
		return haystack.length < 1 ? false : haystack.indexOf(search) !== -1;
	}

	for (let i = 0, iLen = search.length; i < iLen; i += 1) {
		if (exact) {
			if (haystack === search[i]) {
				return true;
			}
		} else if (haystack.indexOf(search[i]) !== -1) {
			return true;
		}
	}

	return false;
}
