from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .between import between as between
	from .contains import contains as contains
	from .hasBadWords import hasBadWords as hasBadWords
	from .isEmail import isEmail as isEmail
	from .isEmpty import isEmpty as isEmpty
	from .isEqualDeep import isEqualDeep as isEqualDeep
	from .isEqualLoose import isEqualLoose as isEqualLoose
	from .isEqualStrict import isEqualStrict as isEqualStrict
	from .isNestedArray import isNestedArray as isNestedArray
	from .isPlainObject import isPlainObject as isPlainObject
	from .isTrueAtLeast import isTrueAtLeast as isTrueAtLeast
	from .isUrl import isUrl as isUrl
	from .len import len as len

__all__ = [
	'between',
	'contains',
	'hasBadWords',
	'isEmail',
	'isEmpty',
	'isEqualDeep',
	'isEqualLoose',
	'isEqualStrict',
	'isNestedArray',
	'isPlainObject',
	'isTrueAtLeast',
	'isUrl',
	'len',
]

lazy(__name__)
