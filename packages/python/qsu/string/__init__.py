from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .capitalizeEachSentence import capitalizeEachSentence as capitalizeEachSentence
	from .capitalizeEachWord import capitalizeEachWord as capitalizeEachWord
	from .capitalizeFirst import capitalizeFirst as capitalizeFirst
	from .collapseWhitespace import collapseWhitespace as collapseWhitespace
	from .deburr import deburr as deburr
	from .detectLanguages import detectLanguages as detectLanguages
	from .escapeRegExp import escapeRegExp as escapeRegExp
	from .getPlaceholderKeys import getPlaceholderKeys as getPlaceholderKeys
	from .joinUrl import joinUrl as joinUrl
	from .pad import pad as pad
	from .removeNewlines import removeNewlines as removeNewlines
	from .removeSpecialChars import removeSpecialChars as removeSpecialChars
	from .replaceEnclosed import replaceEnclosed as replaceEnclosed
	from .split import split as split
	from .strByteLength import strByteLength as strByteLength
	from .strCount import strCount as strCount
	from .strMaskRandom import strMaskRandom as strMaskRandom
	from .strRandom import strRandom as strRandom
	from .strShuffle import strShuffle as strShuffle
	from .strToCamelCase import strToCamelCase as strToCamelCase
	from .strToCharCodes import strToCharCodes as strToCharCodes
	from .strToConstantCase import strToConstantCase as strToConstantCase
	from .strToKebabCase import strToKebabCase as strToKebabCase
	from .strToPascalCase import strToPascalCase as strToPascalCase
	from .strToSnakeCase import strToSnakeCase as strToSnakeCase
	from .strUnique import strUnique as strUnique
	from .truncate import truncate as truncate
	from .truncateSentence import truncateSentence as truncateSentence
	from .uncapitalizeFirst import uncapitalizeFirst as uncapitalizeFirst
	from .words import words as words

__all__ = [
	'capitalizeEachSentence',
	'capitalizeEachWord',
	'capitalizeFirst',
	'collapseWhitespace',
	'deburr',
	'detectLanguages',
	'escapeRegExp',
	'getPlaceholderKeys',
	'joinUrl',
	'pad',
	'removeNewlines',
	'removeSpecialChars',
	'replaceEnclosed',
	'split',
	'strByteLength',
	'strCount',
	'strMaskRandom',
	'strRandom',
	'strShuffle',
	'strToCamelCase',
	'strToCharCodes',
	'strToConstantCase',
	'strToKebabCase',
	'strToPascalCase',
	'strToSnakeCase',
	'strUnique',
	'truncate',
	'truncateSentence',
	'uncapitalizeFirst',
	'words',
]

lazy(__name__)
