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
		# Pick a valid index, and mask the character that was actually checked. The old
		# code checked `tempIdx` but replaced `tempIdx + 1`, and `numPick(0, len)` could
		# return `len` itself, which appended to the string instead of masking part of it.
		tempIdx = numPick(0, totalStrLength - 1)

		if re.match(r'[a-zA-Z가-힣]', currentStr[tempIdx : tempIdx + 1]):
			currentStr = currentStr[:tempIdx] + blindStr + currentStr[tempIdx + 1 :]
			hideCount += 1

		currentStrLength += 1

	return currentStr
