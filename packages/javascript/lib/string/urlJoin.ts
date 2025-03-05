export function urlJoin(...args: any[]): string {
	if (!args) {
		return '';
	}

	const argLength = args.length;
	let urlResult = '';
	let joinCount = 0;

	for (let i = 0; i < argLength; i += 1) {
		if (args[i] !== null && args[i] !== undefined) {
			if (
				joinCount === 0 ||
				args[i].startsWith('/') ||
				args[i].startsWith('?') ||
				args[i].startsWith('&')
			) {
				urlResult += args[i];
			} else {
				urlResult += `/${args[i]}`;
			}

			joinCount += 1;
		}
	}

	return urlResult.replace(/\/$/g, '');
}
