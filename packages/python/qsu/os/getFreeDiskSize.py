import os
import shutil
from typing import Optional

from ..format.fileSizeFormat import fileSizeFormat


def getFreeDiskSize(path: Optional[str] = None) -> str:
	return fileSizeFormat(shutil.disk_usage(path or os.getcwd()).free, 0, True)
