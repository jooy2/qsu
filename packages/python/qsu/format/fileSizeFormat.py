import math


def _numStr(value: float) -> str:
	if isinstance(value, float) and value.is_integer():
		return str(int(value))
	return str(value)


def _toFixed(value: float, digits: int) -> float:
	# Mirror JS Number.prototype.toFixed followed by parseFloat (drops trailing zeros).
	formatted = f'{value:.{digits}f}'
	return float(formatted)


def fileSizeFormat(bytes: float, decimals: int = 2, ceil: bool = False) -> str:
	sizeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

	if bytes < 1:
		return f'0 {sizeUnits[0]}'

	byteCalc = math.floor(math.log(bytes) / math.log(1024))
	byteResult = bytes / 1024 ** byteCalc

	if ceil:
		value = math.ceil(byteResult)
	else:
		value = _toFixed(byteResult, 0 if decimals < 0 else decimals)

	return f'{_numStr(value)} {sizeUnits[byteCalc]}'
