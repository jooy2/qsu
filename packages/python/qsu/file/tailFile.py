from ._readLines import readLines


def tailFile(filePath: str, length: int = 1):
	if length <= 0:
		return None

	buffer = []

	for line in readLines(filePath):
		if len(buffer) == length:
			buffer.pop(0)
		buffer.append(line)

	if len(buffer) == 0:
		return None

	if buffer[len(buffer) - 1] == '':
		buffer.pop()

	if len(buffer) == 0:
		return None

	return '\n'.join(buffer)
