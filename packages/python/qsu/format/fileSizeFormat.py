import math
from typing import Optional

from .fileSizeParts import _unitLabel, _unitTable, fileSizeParts


def _numStr(value: float) -> str:
	if isinstance(value, float) and value.is_integer():
		return str(int(value))
	return str(value)


def _toFixed(value: float, digits: int) -> float:
	# Mirror JS Number.prototype.toFixed followed by parseFloat (drops trailing zeros).
	formatted = f'{value:.{digits}f}'
	return float(formatted)


def fileSizeFormat(
	bytes: float,
	decimals: int = 2,
	ceil: bool = False,
	standard: Optional[str] = None,
	unitDisplay: Optional[str] = None,
) -> str:
	parts = fileSizeParts(bytes, standard, unitDisplay)

	if ceil:
		value = math.ceil(parts['value'])
	else:
		value = _toFixed(parts['value'], 0 if decimals < 0 else decimals)

	# The label is taken from the rounded number, so a value that rounds to one is not
	# written as `1 Megabytes`.
	label = _unitLabel(_unitTable(standard), parts['exponent'], unitDisplay, value)

	return f'{_numStr(value)} {label}'
