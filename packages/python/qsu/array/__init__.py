from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .arrChunk import arrChunk as arrChunk
	from .arrCompact import arrCompact as arrCompact
	from .arrCount import arrCount as arrCount
	from .arrDifference import arrDifference as arrDifference
	from .arrFill import arrFill as arrFill
	from .arrFlatten import arrFlatten as arrFlatten
	from .arrGroupBy import arrGroupBy as arrGroupBy
	from .arrIntersection import arrIntersection as arrIntersection
	from .arrMove import arrMove as arrMove
	from .arrRandom import arrRandom as arrRandom
	from .arrRange import arrRange as arrRange
	from .arrRepeat import arrRepeat as arrRepeat
	from .arrShuffle import arrShuffle as arrShuffle
	from .arrUnique import arrUnique as arrUnique
	from .average import average as average
	from .median import median as median
	from .sortByObjectKey import sortByObjectKey as sortByObjectKey
	from .sortNatural import sortNatural as sortNatural

__all__ = [
	'arrChunk',
	'arrCompact',
	'arrCount',
	'arrDifference',
	'arrFill',
	'arrFlatten',
	'arrGroupBy',
	'arrIntersection',
	'arrMove',
	'arrRandom',
	'arrRange',
	'arrRepeat',
	'arrShuffle',
	'arrUnique',
	'average',
	'median',
	'sortByObjectKey',
	'sortNatural',
]

lazy(__name__)
