from typing import Optional

from .durationParts import _findUnit, durationParts


def _numStr(value) -> str:
	if isinstance(value, float) and value.is_integer():
		return str(int(value))
	return str(value)


def _label(value, name: str, useShortString: bool, useSpace: bool) -> str:
	unit = _findUnit(name)
	space = ' ' if useSpace else ''

	if useShortString:
		suffix = unit['short'] if unit else name
	else:
		suffix = f"{name}{'' if value == 1 else 's'}"

	return f'{_numStr(value)}{space}{suffix}'


def duration(milliseconds: float, options: Optional[dict] = None) -> str:
	opts = {**(options or {})}
	useShortString = opts.get('useShortString', False)
	useSpace = opts.get('useSpace', True)
	separator = opts.get('separator', ' ')

	return separator.join(
		_label(part['value'], part['unit'], useShortString, useSpace)
		for part in durationParts(milliseconds, opts)
	)
