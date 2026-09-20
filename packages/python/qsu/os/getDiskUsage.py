import os
import shutil
from typing import Optional, Union

from ..math.round import round


def getDiskUsage(path: Optional[str] = None, decimals: int = 1) -> Union[int, float]:
	usage = shutil.disk_usage(path or os.getcwd())

	if not usage.total:
		return 0

	return round(usage.used / usage.total * 100, decimals)
