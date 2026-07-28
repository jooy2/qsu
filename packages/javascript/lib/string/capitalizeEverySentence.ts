const ASCII_LETTER = /[a-zA-Z]/;

export function capitalizeEverySentence(str: string, splitChar?: string): string {
	if (!str) {
		return '';
	}

	const splitter: string = splitChar || '.';
	const splitStr = str.split(splitter);
	let resultStr = '';
	let sentenceChars;

	for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
		// Iterate by code point. Indexing the raw string here would drift out of sync
		// with this array as soon as the sentence contains a surrogate pair (emoji).
		sentenceChars = [...splitStr[i]];

		for (let j = 0, jLen = sentenceChars.length; j < jLen; j += 1) {
			if (ASCII_LETTER.test(sentenceChars[j])) {
				sentenceChars[j] = sentenceChars[j].toUpperCase();
				break;
			}
		}

		resultStr += `${sentenceChars.join('')}${i < iLen - 1 ? splitter : ''}`;
	}

	return resultStr;
}
