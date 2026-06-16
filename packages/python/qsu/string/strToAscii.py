def strToAscii(str: str) -> list:
	arr = []

	for i in range(len(str)):
		arr.append(ord(str[i]))

	return arr
