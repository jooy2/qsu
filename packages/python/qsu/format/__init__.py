from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .duration import duration as duration
	from .fileSizeFormat import fileSizeFormat as fileSizeFormat
	from .numberFormat import numberFormat as numberFormat
	from .safeJSONParse import safeJSONParse as safeJSONParse
	from .safeParseInt import safeParseInt as safeParseInt

__all__ = [
	'duration',
	'fileSizeFormat',
	'numberFormat',
	'safeJSONParse',
	'safeParseInt',
]

lazy(__name__)
