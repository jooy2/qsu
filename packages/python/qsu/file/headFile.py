from ._readLines import readLines


def headFile(filePath: str, length: int = 1):
	if length <= 0:
		return None

	lines = []

	for line in readLines(filePath):
		lines.append(line)

		if len(lines) >= length:
			break

	if len(lines) == 0:
		return None

	return '\n'.join(lines)
