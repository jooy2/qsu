import math
from typing import Optional, Union

from ..format.numberFormat import numberFormat
from ._system import systemUptime


def getSystemUptime(opt: Optional[dict] = None) -> Union[int, float, str]:
	t = systemUptime()

	if not t:
		return 0

	if opt and opt.get('floor'):
		t = math.floor(t)

	return numberFormat(t) if opt and opt.get('format') else t
