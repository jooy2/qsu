from typing import Union


def _numStr(value: Union[int, float]) -> str:
	if isinstance(value, float) and value.is_integer():
		return str(int(value))
	return str(value)


def numberFormat(number: Union[int, float, str, None]) -> str:
	if number is None:
		return ''

	str_value = number if isinstance(number, str) else _numStr(number)
	isNegative = str_value.startswith('-')
	abs_value = str_value[1:] if isNegative else str_value

	numberParts = abs_value.split('.')

	numberFormatted = f'{int(numberParts[0], 10):,}'

	result = f"{numberFormatted}{'.' + numberParts[1] if len(numberParts) > 1 else ''}"
	return f'-{result}' if isNegative else result
