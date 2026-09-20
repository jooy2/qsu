import tempfile


def getTempDir() -> str:
	return tempfile.gettempdir()
