import random


def strRandom(length: int, additionalCharacters: str = '') -> str:
	availCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789' + (additionalCharacters or '')
	availCharacterLength = len(availCharacters)
	result = ''

	for _ in range(length):
		newChar = availCharacters[int(random.random() * availCharacterLength)]
		newChar = newChar.upper() if random.random() < 0.5 else newChar
		result += newChar

	return result
