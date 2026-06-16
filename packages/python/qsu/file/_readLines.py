def readLines(filePath: str):
	# Mirrors Node's readline (createInterface with crlfDelay: Infinity):
	# lines are split on '\n', a trailing '\r' is stripped (CRLF handled as a
	# single break), and no extra empty line is yielded for a trailing newline.
	with open(filePath, 'r', encoding='utf-8', newline='') as stream:
		content = stream.read()

	if content == '':
		return []

	parts = content.split('\n')

	# A trailing '\n' produces a final empty element that Node does not emit.
	if parts and parts[-1] == '':
		parts.pop()

	return [part[:-1] if part.endswith('\r') else part for part in parts]
