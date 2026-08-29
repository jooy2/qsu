from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .between import between as between
	from .contains import contains as contains
	from .hasBadWords import hasBadWords as hasBadWords
	from .is2dArray import is2dArray as is2dArray
	from .isEmail import isEmail as isEmail
	from .isEmpty import isEmpty as isEmpty
	from .isEqual import isEqual as isEqual
	from .isEqualStrict import isEqualStrict as isEqualStrict
	from .isObject import isObject as isObject
	from .isTrueMinimumNumberOfTimes import isTrueMinimumNumberOfTimes as isTrueMinimumNumberOfTimes
	from .isUrl import isUrl as isUrl
	from .len import len as len

__all__ = [
	'between',
	'contains',
	'hasBadWords',
	'is2dArray',
	'isEmail',
	'isEmpty',
	'isEqual',
	'isEqualStrict',
	'isObject',
	'isTrueMinimumNumberOfTimes',
	'isUrl',
	'len',
]

lazy(__name__)
