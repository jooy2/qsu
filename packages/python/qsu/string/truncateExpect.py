def truncateExpect(str: str, expectLength: int, endStringChar: str = '.') -> str:
	if not str:
		return ''

	if len(str) <= expectLength:
		return str

	isEndStringCharLastSentence = str[-1:] == endStringChar
	splitStr = str.split(endStringChar)
	splitStrLength = len(splitStr)
	convStr = ''
	currentLength = 0

	for i in range(splitStrLength):
		if currentLength < expectLength:
			convStr += splitStr[i] + (
				endStringChar
				if (i != splitStrLength - 1 or isEndStringCharLastSentence)
				else ''
			)
			currentLength += len(splitStr[i]) + len(endStringChar)
		else:
			break

	return convStr
