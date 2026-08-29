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
_index = None


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
