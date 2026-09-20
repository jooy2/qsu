import math
import time
from typing import Optional, Union

from ..format.numberFormat import numberFormat
from ._system import processStartTime

# Where the process start time cannot be read, the count runs from this instead.
# It is short by however long the process ran before `qsu` was first imported,
# which is better than the alternatives: a monotonic clock cannot be compared
# with a wall clock, and returning zero would read as a process that just started.
_IMPORTED_AT = time.monotonic()


def getUptime(opt: Optional[dict] = None) -> Union[int, float, str]:
	t = _elapsed()

	if not t:
		return 0

	if opt and opt.get('floor'):
		t = math.floor(t)

	return numberFormat(t) if opt and opt.get('format') else t


def _elapsed() -> float:
	startedAt = processStartTime()

	if startedAt is not None:
		elapsed = time.time() - startedAt

		# The wall clock can be moved backwards under us, and a platform that
		# answers with a start time in the future is answering wrongly. Either way
		# the fallback is the honest one.
		if elapsed >= 0:
			return elapsed

	return time.monotonic() - _IMPORTED_AT
