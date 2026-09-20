import time
from datetime import datetime

from ._system import systemUptime


def getBootTime() -> datetime:
	uptime = systemUptime()

	if uptime is None:
		raise RuntimeError('Failed to read how long the system has been running')

	return datetime.fromtimestamp(time.time() - uptime)
