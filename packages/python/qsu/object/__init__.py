from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .objClone import objClone as objClone
	from .objDeleteKeyByValue import objDeleteKeyByValue as objDeleteKeyByValue
	from .objFindItemRecursiveByKey import objFindItemRecursiveByKey as objFindItemRecursiveByKey
	from .objGet import objGet as objGet
	from .objInvert import objInvert as objInvert
	from .objMapKeys import objMapKeys as objMapKeys
	from .objMerge import objMerge as objMerge
	from .objMergeNewKey import objMergeNewKey as objMergeNewKey
	from .objPick import objPick as objPick
	from .objPickBy import objPickBy as objPickBy
	from .objTo1d import objTo1d as objTo1d
	from .objToArray import objToArray as objToArray
	from .objToPrettyStr import objToPrettyStr as objToPrettyStr
	from .objToQueryString import objToQueryString as objToQueryString
	from .objUpdate import objUpdate as objUpdate

__all__ = [
	'objClone',
	'objDeleteKeyByValue',
	'objFindItemRecursiveByKey',
	'objGet',
	'objInvert',
	'objMapKeys',
	'objMerge',
	'objMergeNewKey',
	'objPick',
	'objPickBy',
	'objTo1d',
	'objToArray',
	'objToPrettyStr',
	'objToQueryString',
	'objUpdate',
]

lazy(__name__)
