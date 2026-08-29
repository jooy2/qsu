"""qsu - Quick & Simple Utility.

A utility library that collects frequently used functions.
This package mirrors the JavaScript implementation of qsu.

Unlike the JavaScript package (where filesystem/OS/network/crypto helpers live
under `qsu/node`), Python has no browser/runtime split, so every function is
importable directly from the top-level `qsu` package.

Categories and functions are resolved on first access (PEP 562). Importing them
up front made `import qsu` pull in `cryptography`, `subprocess` and `urllib`
whatever the caller went on to use, which was most of the cost of the import.
"""

import importlib
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
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

__version__ = '1.2.0'

_CATEGORIES = (
	'array',
	'crypto',
	'date',
	'file',
	'format',
	'math',
	'misc',
	'net',
	'object',
	'os',
	'string',
	'verify',
	'web',
)

# Function name -> the category module that holds it, built on first use. Reading the
# categories' `__all__` no longer imports the functions behind them.
_index: Optional[dict] = None


def _functions() -> dict:
	"""(Private) The name index, in category order."""
	global _index

	if _index is None:
		_index = {}

		for category in _CATEGORIES:
			module = importlib.import_module(f'.{category}', __name__)

			for function in module.__all__:
				_index[function] = module

	return _index


def __getattr__(name: str):
	"""Resolve a category, `__all__` or a function on first access (PEP 562)."""
	if name in _CATEGORIES:
		return importlib.import_module(f'.{name}', __name__)

	if name == '__all__':
		return list(_functions())

	functions = _functions()

	if name not in functions:
		raise AttributeError(f'module {__name__!r} has no attribute {name!r}')

	value = getattr(functions[name], name)
	globals()[name] = value

	return value


def __dir__() -> list:
	return sorted([*_CATEGORIES, *_functions(), '__version__'])
