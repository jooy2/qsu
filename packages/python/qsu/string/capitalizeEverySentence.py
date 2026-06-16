import re


def capitalizeEverySentence(str: str, splitChar: str = None) -> str:
	if not str:
		return ''

	splitter = splitChar or '.'
	splitStr = str.split(splitter)
	resultStr = ''
	iLen = len(splitStr)

	for i in range(iLen):
		sentenceChars = list(splitStr[i])

		for j in range(len(sentenceChars)):
			if re.match(r'[a-zA-Z]', splitStr[i][j]):
				sentenceChars[j] = splitStr[i][j].upper()
				break

		resultStr += ''.join(sentenceChars) + (splitter if i < iLen - 1 else '')

	return resultStr
