from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .ceil import ceil as ceil
	from .clamp import clamp as clamp
	from .div import div as div
	from .floor import floor as floor
	from .mul import mul as mul
	from .numMax import numMax as numMax
	from .numMin import numMin as numMin
	from .numRandom import numRandom as numRandom
	from .numRound import numRound as numRound
	from .numSum import numSum as numSum
	from .numUniqueId import numUniqueId as numUniqueId
	from .sub import sub as sub

__all__ = [
	'ceil',
	'clamp',
	'div',
	'floor',
	'mul',
	'numMax',
	'numMin',
	'numRandom',
	'numRound',
	'numSum',
	'numUniqueId',
	'sub',
]

lazy(__name__)
