import re

from ..math.numPick import numPick


def strBlindRandom(str: str, blindLength: int, blindStr: str = '*') -> str:
	if not str:
		return ''

	currentStr = str
	hideCount = 0
	currentStrLength = 0
	totalStrLength = len(currentStr)

	while hideCount < blindLength and currentStrLength < totalStrLength:
		tempIdx = numPick(0, totalStrLength)

		if re.match(r'[a-zA-Z가-힣]', currentStr[tempIdx : tempIdx + 1]):
			currentStr = (
				currentStr[: tempIdx + 1] + blindStr + currentStr[tempIdx + 2 :]
			)
			hideCount += 1

		currentStrLength += 1

	return currentStr
