from typing import TYPE_CHECKING

from .._lazy import lazy

if TYPE_CHECKING:
	# Imported at runtime only when the name is first read. Spelling the imports out
	# here lets a type checker follow a name to the function behind it.
	from .ceil import ceil as ceil
	from .clamp import clamp as clamp
	from .div import div as div
	from .floor import floor as floor
	from .max import max as max
	from .min import min as min
	from .mul import mul as mul
	from .numPick import numPick as numPick
	from .numUnique import numUnique as numUnique
	from .round import round as round
	from .sub import sub as sub
	from .sum import sum as sum

__all__ = [
	'ceil',
	'clamp',
	'div',
	'floor',
	'max',
	'min',
	'mul',
	'numPick',
	'numUnique',
	'round',
	'sub',
	'sum',
]

lazy(__name__)
