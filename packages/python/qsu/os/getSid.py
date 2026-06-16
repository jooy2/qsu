import getpass
import os
import re
import sys

from .runCommand import runCommand


def getSid() -> str:
	platformName = sys.platform

	if platformName == 'win32':
		try:
			profileLists = runCommand(
				'REG QUERY "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion'
				'\\ProfileList" /s'
			)

			if not profileLists:
				raise RuntimeError('Failed to get machine id')

			profiles = {}
			sections = profileLists.split('HKEY_LOCAL_MACHINE\\')

			for section in sections:
				lines = [line.strip() for line in section.split('\n')]
				lines = [line for line in lines if line]

				if len(lines) > 0:
					keyName = lines[0].split('\\')[-1] or 'Unknown'
					profileImagePath = next(
						(line for line in lines if line.startswith('ProfileImagePath')),
						None,
					)

					if profileImagePath:
						profiles[keyName] = profileImagePath.split('    ')[-1] or 'Unknown'

			homedir = os.path.expanduser('~')

			for key in profiles:
				if profiles[key] == homedir:
					return key
		except Exception as error:
			raise RuntimeError(str(error))

		raise RuntimeError('Failed to get machine id')

	if platformName == 'darwin':
		try:
			execResult = runCommand(f'dsmemberutil getsid -U {getpass.getuser()}')

			if execResult:
				return re.sub(r'\r?\n', '', execResult)
		except Exception as error:
			raise RuntimeError(str(error))

		raise RuntimeError('Failed to get machine id')

	raise RuntimeError('Not supported on this operating system.')
