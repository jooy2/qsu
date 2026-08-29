from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .arrCompact import arrCompact as arrCompact
	from .arrCount import arrCount as arrCount
	from .arrDifference import arrDifference as arrDifference
	from .arrGroupByMaxCount import arrGroupByMaxCount as arrGroupByMaxCount
	from .arrIntersection import arrIntersection as arrIntersection
	from .arrMove import arrMove as arrMove
	from .arrPick import arrPick as arrPick
	from .arrRepeat import arrRepeat as arrRepeat
	from .arrShuffle import arrShuffle as arrShuffle
	from .arrTo1dArray import arrTo1dArray as arrTo1dArray
	from .arrUnique import arrUnique as arrUnique
	from .arrWithDefault import arrWithDefault as arrWithDefault
	from .arrWithNumber import arrWithNumber as arrWithNumber
	from .average import average as average
	from .sortByObjectKey import sortByObjectKey as sortByObjectKey
	from .sortNumeric import sortNumeric as sortNumeric

__all__ = [
	'arrCompact',
	'arrCount',
	'arrDifference',
	'arrGroupByMaxCount',
	'arrIntersection',
	'arrMove',
	'arrPick',
	'arrRepeat',
	'arrShuffle',
	'arrTo1dArray',
	'arrUnique',
	'arrWithDefault',
	'arrWithNumber',
	'average',
	'sortByObjectKey',
	'sortNumeric',
]

lazy(__name__)
