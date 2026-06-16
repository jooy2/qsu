"""qsu - Quick & Simple Utility.

A utility library that collects frequently used functions.
This package mirrors the JavaScript implementation of qsu.

Unlike the JavaScript package (where filesystem/OS/network/crypto helpers live
under `qsu/node`), Python has no browser/runtime split, so every function is
importable directly from the top-level `qsu` package.
"""

from . import (
	array,
	crypto,
	date,
	file,
	format,
	math,
	misc,
	net,
	object,
	os,
	string,
	verify,
	web,
)
from .array import *  # noqa: F401,F403
from .crypto import *  # noqa: F401,F403
from .date import *  # noqa: F401,F403
from .file import *  # noqa: F401,F403
from .format import *  # noqa: F401,F403
from .math import *  # noqa: F401,F403
from .misc import *  # noqa: F401,F403
from .net import *  # noqa: F401,F403
from .object import *  # noqa: F401,F403
from .os import *  # noqa: F401,F403
from .string import *  # noqa: F401,F403
from .verify import *  # noqa: F401,F403
from .web import *  # noqa: F401,F403

__version__ = '0.1.0'

__all__ = [
	*array.__all__,
	*crypto.__all__,
	*date.__all__,
	*file.__all__,
	*format.__all__,
	*math.__all__,
	*misc.__all__,
	*net.__all__,
	*object.__all__,
	*os.__all__,
	*string.__all__,
	*verify.__all__,
	*web.__all__,
]
