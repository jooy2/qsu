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
	from .isDesktopDeviceFromUA import isDesktopDeviceFromUA as isDesktopDeviceFromUA
	from .isMatchPathname import isMatchPathname as isMatchPathname
	from .isMobileDeviceFromUA import isMobileDeviceFromUA as isMobileDeviceFromUA
	from .isSearchBot import isSearchBot as isSearchBot
	from .isTabletDeviceFromUA import isTabletDeviceFromUA as isTabletDeviceFromUA
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
	'isDesktopDeviceFromUA',
	'isMatchPathname',
	'isMobileDeviceFromUA',
	'isSearchBot',
	'isTabletDeviceFromUA',
	'removeLocalePrefix',
	'unescapeHtml',
]

lazy(__name__)
