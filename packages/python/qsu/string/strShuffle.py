import random


def strShuffle(str: str) -> str:
	if not str:
		return ''

	chars = list(str)
	random.shuffle(chars)

	return ''.join(chars)
