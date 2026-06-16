import platform


def getCpu() -> str:
	model = platform.processor() or platform.machine()

	return f'{model or "Unknown"}'
