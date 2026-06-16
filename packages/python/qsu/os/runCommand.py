import os
import subprocess
from typing import Optional


def runCommand(command: str) -> Optional[str]:
	result = subprocess.run(
		command,
		shell=True,
		capture_output=True,
		encoding='utf8',
	)

	if result.returncode != 0:
		raise RuntimeError((result.stderr or '').strip() or f'Command failed: {command}')

	stdout = result.stdout

	if stdout is None:
		return None

	# Mirror JS: strip a single trailing EOL.
	if stdout.endswith(os.linesep):
		stdout = stdout[: -len(os.linesep)]
	elif stdout.endswith('\n'):
		stdout = stdout[:-1]

	return stdout
