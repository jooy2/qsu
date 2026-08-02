from ._readLines import readLines


def headFile(filePath: str, length: int = 1):
	if length <= 0:
		return None

	lines = []
	stream = readLines(filePath)

	try:
		for line in stream:
			lines.append(line)

			if len(lines) >= length:
				break
	finally:
		# Closing the generator closes the file it holds open, rather than
		# leaving it to the garbage collector.
		stream.close()

	if len(lines) == 0:
		return None

	return '\n'.join(lines)
