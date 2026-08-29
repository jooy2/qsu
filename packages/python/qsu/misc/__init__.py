from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .debounce import debounce as debounce
	from .funcTimes import funcTimes as funcTimes
	from .logBox import logBox as logBox
	from .retry import retry as retry
	from .sleep import sleep as sleep
	from .throttle import throttle as throttle

__all__ = [
	'debounce',
	'funcTimes',
	'logBox',
	'retry',
	'sleep',
	'throttle',
]

lazy(__name__)
