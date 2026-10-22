export function split(str: string, ...separators: any[]): string[];

export function split(str: string, ...separators: Array<string>): string[];

export function split(str: string, ...separators: Array<string> | string[]): string[] {
	if (!str) {
		return [];
	}

	const separatorList =
		separators.length > 0 && typeof separators[0] === 'object' ? separators[0] : separators;
	const separatorLength: number = separatorList.length;
	let charPattern = '';
	let strPattern = '';

	for (let i = 0; i < separatorLength; i += 1) {
		const spl = separatorList[i];

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
