export function capitalizeEverySentence(str: string, splitChar?: string): string {
	if (!str) {
		return '';
	}

	const splitter: string = splitChar || '.';
	const splitStr = str.split(splitter);
	let resultStr = '';
	let sentenceChars;

	for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
		sentenceChars = [...splitStr[i]];

		for (let j = 0, jLen = sentenceChars.length; j < jLen; j += 1) {
			if (/[a-zA-Z]/.test(splitStr[i][j])) {
				sentenceChars[j] = splitStr[i][j].toUpperCase();
				break;
			}
		}

		resultStr += `${sentenceChars.join('')}${i < iLen - 1 ? splitter : ''}`;
	}

	return resultStr;
}
