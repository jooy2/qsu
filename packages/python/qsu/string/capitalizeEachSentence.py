import re
from typing import Optional

def capitalizeEachSentence(str: str, separator: Optional[str] = None) -> str:
	if not str:
		return ''

	delimiter = separator or '.'
	splitStr = str.split(delimiter)
	resultStr = ''
	iLen = len(splitStr)

	for i in range(iLen):
		sentenceChars = list(splitStr[i])

		for j in range(len(sentenceChars)):
			if re.match(r'[a-zA-Z]', splitStr[i][j]):
				sentenceChars[j] = splitStr[i][j].upper()
				break

		resultStr += ''.join(sentenceChars) + (delimiter if i < iLen - 1 else '')

	return resultStr
