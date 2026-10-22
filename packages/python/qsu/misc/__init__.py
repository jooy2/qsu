from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .debounce import debounce as debounce
	from .logBox import logBox as logBox
	from .retry import retry as retry
	from .sleep import sleep as sleep
	from .throttle import throttle as throttle
	from .times import times as times

__all__ = [
	'debounce',
	'logBox',
	'retry',
	'sleep',
	'throttle',
	'times',
]

lazy(__name__)
