from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .fetchData import fetchData as fetchData

__all__ = [
	'fetchData',
]

lazy(__name__)
