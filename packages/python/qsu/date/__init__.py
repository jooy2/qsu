from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .createDateListFromRange import createDateListFromRange as createDateListFromRange
	from .dateToYYYYMMDD import dateToYYYYMMDD as dateToYYYYMMDD
	from .dayDiff import dayDiff as dayDiff
	from .isValidDate import isValidDate as isValidDate
	from .today import today as today

__all__ = [
	'createDateListFromRange',
	'dateToYYYYMMDD',
	'dayDiff',
	'isValidDate',
	'today',
]

lazy(__name__)
