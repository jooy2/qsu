from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .escapeHtml import escapeHtml as escapeHtml
	from .generateLicense import generateLicense as generateLicense
	from .getSlug import getSlug as getSlug
	from .isAiAgentBot import isAiAgentBot as isAiAgentBot
	from .isAiSearchBot import isAiSearchBot as isAiSearchBot
	from .isAiTrainingBot import isAiTrainingBot as isAiTrainingBot
	from .isBot import isBot as isBot
	from .isDesktopDeviceFromUa import isDesktopDeviceFromUa as isDesktopDeviceFromUa
	from .isMobileDeviceFromUa import isMobileDeviceFromUa as isMobileDeviceFromUa
	from .isPathnameMatch import isPathnameMatch as isPathnameMatch
	from .isSearchBot import isSearchBot as isSearchBot
	from .isTabletDeviceFromUa import isTabletDeviceFromUa as isTabletDeviceFromUa
	from .removeLocalePrefix import removeLocalePrefix as removeLocalePrefix
	from .unescapeHtml import unescapeHtml as unescapeHtml

__all__ = [
	'escapeHtml',
	'generateLicense',
	'getSlug',
	'isAiAgentBot',
	'isAiSearchBot',
	'isAiTrainingBot',
	'isBot',
	'isDesktopDeviceFromUa',
	'isMobileDeviceFromUa',
	'isPathnameMatch',
	'isSearchBot',
	'isTabletDeviceFromUa',
	'removeLocalePrefix',
	'unescapeHtml',
]

lazy(__name__)
