from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .capitalizeEachWords import capitalizeEachWords as capitalizeEachWords
	from .capitalizeEverySentence import capitalizeEverySentence as capitalizeEverySentence
	from .capitalizeFirst import capitalizeFirst as capitalizeFirst
	from .deburr import deburr as deburr
	from .escapeRegExp import escapeRegExp as escapeRegExp
	from .getGroupKeys import getGroupKeys as getGroupKeys
	from .getStrBytes import getStrBytes as getStrBytes
	from .pad import pad as pad
	from .removeNewLine import removeNewLine as removeNewLine
	from .removeSpecialChar import removeSpecialChar as removeSpecialChar
	from .replaceBetween import replaceBetween as replaceBetween
	from .split import split as split
	from .strBlindRandom import strBlindRandom as strBlindRandom
	from .strCount import strCount as strCount
	from .strRandom import strRandom as strRandom
	from .strShuffle import strShuffle as strShuffle
	from .strToAscii import strToAscii as strToAscii
	from .strToCamelCase import strToCamelCase as strToCamelCase
	from .strToConstantCase import strToConstantCase as strToConstantCase
	from .strToKebabCase import strToKebabCase as strToKebabCase
	from .strToPascalCase import strToPascalCase as strToPascalCase
	from .strToSnakeCase import strToSnakeCase as strToSnakeCase
	from .strUnique import strUnique as strUnique
	from .trim import trim as trim
	from .truncate import truncate as truncate
	from .truncateExpect import truncateExpect as truncateExpect
	from .uncapitalizeFirst import uncapitalizeFirst as uncapitalizeFirst
	from .urlJoin import urlJoin as urlJoin
	from .words import words as words

__all__ = [
	'capitalizeEachWords',
	'capitalizeEverySentence',
	'capitalizeFirst',
	'deburr',
	'escapeRegExp',
	'getGroupKeys',
	'getStrBytes',
	'pad',
	'removeNewLine',
	'removeSpecialChar',
	'replaceBetween',
	'split',
	'strBlindRandom',
	'strCount',
	'strRandom',
	'strShuffle',
	'strToAscii',
	'strToCamelCase',
	'strToConstantCase',
	'strToKebabCase',
	'strToPascalCase',
	'strToSnakeCase',
	'strUnique',
	'trim',
	'truncate',
	'truncateExpect',
	'uncapitalizeFirst',
	'urlJoin',
	'words',
]

lazy(__name__)
