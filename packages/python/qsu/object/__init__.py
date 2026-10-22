from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .objClone import objClone as objClone
	from .objFindInTree import objFindInTree as objFindInTree
	from .objFlatten import objFlatten as objFlatten
	from .objGet import objGet as objGet
	from .objInvert import objInvert as objInvert
	from .objMapKeys import objMapKeys as objMapKeys
	from .objMerge import objMerge as objMerge
	from .objMergeWithArrays import objMergeWithArrays as objMergeWithArrays
	from .objOmit import objOmit as objOmit
	from .objOmitByValue import objOmitByValue as objOmitByValue
	from .objPick import objPick as objPick
	from .objPickBy import objPickBy as objPickBy
	from .objSet import objSet as objSet
	from .objToEntries import objToEntries as objToEntries
	from .objToPrettyJson import objToPrettyJson as objToPrettyJson
	from .objToQueryString import objToQueryString as objToQueryString
	from .objUpdate import objUpdate as objUpdate

__all__ = [
	'objClone',
	'objFindInTree',
	'objFlatten',
	'objGet',
	'objInvert',
	'objMapKeys',
	'objMerge',
	'objMergeWithArrays',
	'objOmit',
	'objOmitByValue',
	'objPick',
	'objPickBy',
	'objSet',
	'objToEntries',
	'objToPrettyJson',
	'objToQueryString',
	'objUpdate',
]

lazy(__name__)
