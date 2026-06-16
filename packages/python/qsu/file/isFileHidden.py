import re
import subprocess


def isFileHidden(filePath: str, isWindows: bool = False) -> bool:
	if isWindows:
		try:
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

		return 'H' in stdout.replace(filePath, '')

	segments = filePath.split('/')
	last = segments[-1] if segments else '/'
	last = last or '/'

	return bool(re.search(r'(^|/)\.[^/.]', last))
