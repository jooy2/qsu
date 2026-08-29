"""(Private) On-demand loading for the category packages."""

import importlib
import sys
import types


class _Category(types.ModuleType):
	"""A category package that imports a function's module on first access.

	qsu keeps one function per file, so a function and the module holding it share a
	name. The import system binds that name to the *module* as soon as a sibling reaches
	for it (`from .words import words`), and a plain `__getattr__` is never consulted
	afterwards, so the lookup itself has to answer with the function either way.
	"""

	def __getattribute__(self, name: str):
		read = types.ModuleType.__getattribute__
		value = read(self, name)

		# A public name currently holding its own module: answer with the function.
		if isinstance(value, types.ModuleType) and name in read(self, '__all__'):
			value = getattr(value, name)
			types.ModuleType.__setattr__(self, name, value)

		return value

	def __getattr__(self, name: str):
		if name not in self.__all__:
			raise AttributeError(f'module {self.__name__!r} has no attribute {name!r}')

		value = getattr(importlib.import_module(f'.{name}', self.__name__), name)
		setattr(self, name, value)

		return value

	def __dir__(self) -> list:
		return sorted(self.__all__)


def lazy(name: str) -> None:
	"""Load the functions of the already-imported category module `name` on demand."""
	sys.modules[name].__class__ = _Category
