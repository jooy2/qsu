import random


def arrShuffle(array: list) -> list:
	# Shuffle a copy and always return a list. Returning `array[0]` for a single element
	# broke the return type, and assigning `newArray = array` reordered the caller's list.
	newArray = list(array)

	random.shuffle(newArray)

	return newArray
