import platform


def getKernelVersion() -> str:
	return platform.release() or 'Unknown'
