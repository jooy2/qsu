import re
import subprocess

# `attrib` prints the attribute letters first and the *absolute* path second
# (`A    H       C:\dir\file.txt`). Cutting the line where the path begins is
# the only reliable way to read the letters: removing the caller's path fails
# when a relative path was given, and an 'H' in a directory name then reads as
# hidden.
_ATTRIBUTE_COLUMN_REGEX = re.compile(r'^(.*?)\s+(?:[A-Za-z]:\\|\\\\)')


def isFileHidden(filePath: str, isWindows: bool = False) -> bool:
	if isWindows:
		try:
			# The argument list is passed straight to `attrib`. Handing the
			# command to a shell instead lets a file name containing a quote
			# close the quoting and run the rest of the name as a command.
			completed = subprocess.run(
				['attrib', filePath],
				capture_output=True,
				text=True,
			)
		except Exception:
			return False

		stdout = completed.stdout

		if completed.returncode != 0 or completed.stderr or not stdout:
			return False

		firstLine = next((line for line in stdout.splitlines() if line.strip()), '')
		attributes = _ATTRIBUTE_COLUMN_REGEX.match(firstLine)

		return 'H' in attributes.group(1) if attributes else False

	segments = filePath.split('/')
	last = segments[-1] if segments else '/'
	last = last or '/'

	return bool(re.search(r'(^|/)\.[^/.]', last))
