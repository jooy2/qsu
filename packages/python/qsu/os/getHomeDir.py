import os


def getHomeDir() -> str:
	return os.path.expanduser('~')
