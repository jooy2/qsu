import os
import re

_CHUNK_SIZE = 64 * 1024

# Node's readline (createInterface with crlfDelay: Infinity) breaks a line on
# '\n', '\r\n' and a lone '\r'.
_LINE_BREAK_REGEX = re.compile(r'\r\n|\n|\r')


def _splitLines(text: str):
	lines = _LINE_BREAK_REGEX.split(text)

	# A break at the end of the text closes the last line, it does not open an
	# empty one.
	if len(lines) > 1 and lines[-1] == '':
		lines.pop()

	return lines


def tailFile(filePath: str, length: int = 1):
	if length <= 0:
		return None

	lines = []

	with open(filePath, 'rb') as stream:
		stream.seek(0, os.SEEK_END)
		size = stream.tell()

		if size == 0:
			return None

		# Read backwards from the end of the file so the work follows the number
		# of lines asked for rather than the size of the file. Reading forwards
		# means a 10 GB log is streamed in full to answer for its last line.
		position = size
		chunks: list = []

		while position > 0:
			readLength = min(_CHUNK_SIZE, position)
			position -= readLength

			stream.seek(position)
			chunks.insert(0, stream.read(readLength))

			lines = _splitLines(b''.join(chunks).decode('utf-8', errors='replace'))

			# One line more than asked for means the first line held in the
			# buffer is incomplete - it starts wherever the chunk boundary fell,
			# possibly mid-character - but it is also about to be dropped.
			if len(lines) > length:
				break

	buffer = lines[-length:]

	# The last line of newline characters is ignored.
	if len(buffer) > 0 and buffer[-1] == '':
		buffer.pop()

	if len(buffer) == 0:
		return None

	return '\n'.join(buffer)
