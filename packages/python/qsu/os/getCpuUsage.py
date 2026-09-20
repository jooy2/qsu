import time
from typing import Union

from ..math.round import round
from ._system import cpuTicks


def getCpuUsage(interval: int = 100, decimals: int = 1) -> Union[int, float]:
	# Nothing can be measured over no time at all. Sampling anyway would answer with
	# whatever the counters happened to do while the call turned around.
	if interval <= 0:
		return 0

	before = cpuTicks()
	time.sleep(interval / 1000)
	after = cpuTicks()

	if before is None or after is None:
		raise RuntimeError('Failed to read how the processor spent its time')

	total = after[0] - before[0]
	idle = after[1] - before[1]

	if total <= 0:
		return 0

	return round(max(total - idle, 0) / total * 100, decimals)
