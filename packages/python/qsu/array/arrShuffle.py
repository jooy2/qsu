import math
import random


def arrShuffle(array: list):
	if len(array) == 1:
		return array[0]

	newArray = array

	for i in range(len(array) - 1, 0, -1):
		j = math.floor(random.random() * (i + 1))
		newArray[i], newArray[j] = array[j], array[i]

	return newArray
