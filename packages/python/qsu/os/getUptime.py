import math
import time
from typing import Optional, Union

from ..format.numberFormat import numberFormat

_START_TIME = time.monotonic()


def getUptime(opt: Optional[dict] = None) -> Union[int, float, str]:
	t = time.monotonic() - _START_TIME

	if not t:
		return 0

	if opt and opt.get('floor'):
		t = math.floor(t)

	return numberFormat(t) if opt and opt.get('format') else t
