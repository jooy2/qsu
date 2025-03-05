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
