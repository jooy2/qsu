import random


def arrPick(array: list):
	if not array or not isinstance(array, list) or len(array) < 1:
		return None

	return array[int(random.random() * len(array))]
