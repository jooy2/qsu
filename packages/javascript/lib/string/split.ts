export function split(str: string, ...splitter: any[]): string[];

export function split(str: string, ...splitter: Array<string>): string[];

export function split(str: string, ...splitter: Array<string> | string[]): string[] {
	if (!str) {
		return [];
	}

	const splitters = splitter.length > 0 && typeof splitter[0] === 'object' ? splitter[0] : splitter;
	const splitterLength: number = splitters.length;
	let charPattern = '';
	let strPattern = '';

	for (let i = 0; i < splitterLength; i += 1) {
		const spl = splitters[i];

		if (spl.length > 1) {
			strPattern += `${strPattern.length < 1 ? '' : '|'}${spl
				.replace(/\\/g, '\\\\')
				.replace(/\[/g, '\\[')
				.replace(/]/g, '\\]')
				.replace(/\?/g, '\\?')
				.replace(/\./g, '\\.')
				.replace(/\{/g, '\\{')
				.replace(/}/g, '\\}')
				.replace(/\+/g, '\\+')}`;
		} else if (spl === '-' || spl === '[' || spl === ']') {
			charPattern += `\\${spl}`;
		} else {
			charPattern += spl;
		}
	}

	if (charPattern.length < 1 && strPattern.length < 1) {
		return [str];
	}

	if (charPattern.length > 0) {
		charPattern = `[${charPattern}]`;
		if (strPattern.length > 0) {
			strPattern = `|${strPattern}`;
		}
	}

	return str.split(new RegExp(`${charPattern}${strPattern}+`, 'gi'));
}
