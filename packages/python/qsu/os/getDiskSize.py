import os
import shutil
from typing import Optional

from ..format.fileSizeFormat import fileSizeFormat


def getDiskSize(path: Optional[str] = None) -> str:
	# The filesystem error is raised as it is, so `errno` and `filename` survive for
	# the caller to read.
	return fileSizeFormat(shutil.disk_usage(path or os.getcwd()).total, 0, True)
