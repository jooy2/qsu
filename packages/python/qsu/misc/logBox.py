import math
import os
import shutil
import sys

BORDER = {
	'tl': '┌',
	'tr': '┐',
	'bl': '└',
	'br': '┘',
	'h': '─',
	'v': '│',
	'lt': '├',
	'rt': '┤',
	'tt': '┬',
	'bt': '┴',
	'x': '┼',
}


def _charWidth(cp: int) -> int:
	if cp == 0:
		return 0
	if cp < 32 or (0x7F <= cp < 0xA0):
		return 0
	if (
		(0x1100 <= cp <= 0x115F)
		or (0x2E80 <= cp <= 0x303E)
		or (0x3041 <= cp <= 0x33FF)
		or (0x3400 <= cp <= 0x4DBF)
		or (0x4E00 <= cp <= 0x9FFF)
		or (0xA000 <= cp <= 0xA4CF)
		or (0xAC00 <= cp <= 0xD7A3)
		or (0xF900 <= cp <= 0xFAFF)
		or (0xFE30 <= cp <= 0xFE4F)
		or (0xFF00 <= cp <= 0xFF60)
		or (0xFFE0 <= cp <= 0xFFE6)
		or (0x1F300 <= cp <= 0x1FAFF)
		or (0x20000 <= cp <= 0x3FFFD)
	):
		return 2
	return 1


def _stringWidth(string: str) -> int:
	w = 0
	for ch in string:
		w += _charWidth(ord(ch))
	return w


def _padEndVisual(string: str, width: int) -> str:
	pad = width - _stringWidth(string)
	return string + ' ' * pad if pad > 0 else string


def _centerVisual(string: str, width: int) -> str:
	total = width - _stringWidth(string)
	if total <= 0:
		return string
	left = math.floor(total / 2)
	return ' ' * left + string + ' ' * (total - left)


def _wrapVisual(text: str, width: int) -> list:
	out = []
	w = max(1, width)
	for rawLine in text.split('\n'):
		if rawLine == '':
			out.append('')
			continue
		cur = ''
		curW = 0
		for ch in rawLine:
			cw = _charWidth(ord(ch))
			if curW + cw > w:
				out.append(cur)
				cur = ch
				curW = cw
			else:
				cur += ch
				curW += cw
		out.append(cur)
	return out


def _format(value, breakLength: int) -> str:
	if isinstance(value, str):
		return value
	return repr(value)


def _detectWidth() -> int:
	for stream in [sys.stdout, sys.stderr]:
		try:
			c = shutil.get_terminal_size((0, 0)).columns
		except Exception:
			c = 0
		if isinstance(c, int) and c > 0:
			return c
	env = os.environ.get('COLUMNS')
	try:
		envNum = int(env)
		if envNum > 0:
			return envNum
	except (TypeError, ValueError):
		pass
	return 80


def logBox(*args) -> None:
	term = max(_detectWidth(), 10)

	headerIdx = '#'
	headerVal = 'value'

	idxStrings = [str(i) for i in range(len(args))]
	iwContent = max(_stringWidth(headerIdx), *[_stringWidth(s) for s in idxStrings], 1)
	indexCellWidth = iwContent + 2

	valueCellWidth = term - indexCellWidth - 3
	if valueCellWidth < 3:
		valueCellWidth = 3
	vwContent = valueCellWidth - 2

	def border(left: str, mid: str, right: str) -> str:
		return (
			left
			+ BORDER['h'] * indexCellWidth
			+ mid
			+ BORDER['h'] * valueCellWidth
			+ right
		)

	top = border(BORDER['tl'], BORDER['tt'], BORDER['tr'])
	sep = border(BORDER['lt'], BORDER['x'], BORDER['rt'])
	bottom = border(BORDER['bl'], BORDER['bt'], BORDER['br'])

	def rowLine(idxCell: str, valCell: str) -> str:
		return f"{BORDER['v']} {idxCell} {BORDER['v']} {valCell} {BORDER['v']}"

	out = [top]

	out.append(
		rowLine(_centerVisual(headerIdx, iwContent), _padEndVisual(headerVal, vwContent))
	)
	out.append(sep)

	if len(args) == 0:
		out.append(
			rowLine(
				_centerVisual('-', iwContent),
				_padEndVisual('(no arguments)', vwContent),
			)
		)
		out.append(bottom)
		print('\n'.join(out))
		return None

	for i, arg in enumerate(args):
		text = _format(arg, vwContent)
		wrapped = _wrapVisual(text, vwContent)
		for li, vline in enumerate(wrapped):
			idxCell = (
				_centerVisual(idxStrings[i], iwContent) if li == 0 else ' ' * iwContent
			)
			out.append(rowLine(idxCell, _padEndVisual(vline, vwContent)))
		if i < len(args) - 1:
			out.append(sep)

	out.append(bottom)
	print('\n'.join(out))

	return None
