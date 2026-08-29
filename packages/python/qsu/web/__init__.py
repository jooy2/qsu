from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .escapeHtml import escapeHtml as escapeHtml
	from .generateLicense import generateLicense as generateLicense
	from .getParsedInfoFromAddress import getParsedInfoFromAddress as getParsedInfoFromAddress
	from .getSlug import getSlug as getSlug
	from .isBotAgent import isBotAgent as isBotAgent
	from .isMatchPathname import isMatchPathname as isMatchPathname
	from .isMobile import isMobile as isMobile
	from .removeLocalePrefix import removeLocalePrefix as removeLocalePrefix
	from .unescapeHtml import unescapeHtml as unescapeHtml

__all__ = [
	'escapeHtml',
	'generateLicense',
	'getParsedInfoFromAddress',
	'getSlug',
	'isBotAgent',
	'isMatchPathname',
	'isMobile',
	'removeLocalePrefix',
	'unescapeHtml',
]

lazy(__name__)
