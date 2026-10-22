import math
from typing import Optional, Union

from ..format.numberFormat import numberFormat
from ._system import systemUptime


def getSystemUptime(options: Optional[dict] = None, **kwargs) -> Union[int, float, str]:
	opts = {**(options or {}), **kwargs}
	t = systemUptime()

	if not t:
		return 0

	if opts.get('floor'):
		t = math.floor(t)

	return numberFormat(t) if opts.get('format') else t
