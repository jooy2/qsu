import codecs
import re

_CHUNK_SIZE = 64 * 1024

# Node's readline (createInterface with crlfDelay: Infinity) breaks a line on
# '\n', '\r\n' and a lone '\r'.
_LINE_BREAK_REGEX = re.compile(r'\r\n|\n|\r')


def readLines(filePath: str):
	# Yields one line at a time, reading the file in chunks. Reading the whole
	# file with `read()` cost as much memory as the file was large: asking for
	# the first line of a 108 MB log held 476 MB of it at once.
	#
	# Malformed bytes are replaced rather than raised, matching what the
	# JavaScript and Dart implementations do with the same file.
	decoder = codecs.getincrementaldecoder('utf-8')('replace')
	buffer = ''

	with open(filePath, 'rb') as stream:
		while True:
			chunk = stream.read(_CHUNK_SIZE)
			atEnd = not chunk

			buffer += decoder.decode(chunk, atEnd)

			# A '\r' at the end of the buffer may still turn out to be the first
			# half of a '\r\n', so it is left for the next chunk to resolve.
			limit = len(buffer)

			if not atEnd and buffer.endswith('\r'):
				limit -= 1

			last = 0

			for match in _LINE_BREAK_REGEX.finditer(buffer, 0, limit):
				yield buffer[last:match.start()]
				last = match.end()

			buffer = buffer[last:]

			if atEnd:
				break

	# A break at the end of the file closes the last line, it does not open an
	# empty one.
	if buffer != '':
		yield buffer
