"""(Private) The faces a TrueType or OpenType file holds, for `getFonts`.

Only the table directory and the few tables `getFonts` reports from are read, each
at its offset, so a font file of several hundred megabytes costs a few small reads.
"""

import struct
from typing import BinaryIO, Dict, List, Optional

_COLLECTION_TAG = 0x74746366  # 'ttcf'

# TrueType outlines, CFF outlines, and the tag Apple's own TrueType fonts carry.
_SFNT_VERSIONS = (0x00010000, 0x4F54544F, 0x74727565)

_COLOR_TABLES = ('COLR', 'sbix', 'CBDT', 'SVG ')

# The name records `getFonts` reports: family, subfamily, full name, version,
# PostScript name, manufacturer, designer, and the typographic family and subfamily.
_WANTED_NAMES = frozenset((1, 2, 4, 5, 6, 8, 9, 16, 17))

_WINDOWS_PLATFORM = 3
_MAC_PLATFORM = 1
_UNICODE_PLATFORM = 0
_WINDOWS_ENGLISH = 0x0409

# Symbol, Unicode BMP and Unicode full repertoire. All three are UTF-16BE.
_WINDOWS_UNICODE_ENCODINGS = (0, 1, 10)

# The characters a monospace font has to draw at one advance: U+0020 to U+007E.
_PRINTABLE = range(0x20, 0x7F)

_NAME_PADDING = ' \t\r\n\x00'

# What a broken font raises on the way through: a range outside the file, or a
# field cut short.
_READ_ERRORS = (OSError, ValueError, struct.error)


class _FontFile:
	"""An open font file that is read a range at a time, never whole."""

	def __init__(self, handle: BinaryIO, size: int):
		self.handle = handle
		self.size = size

	def read(self, offset: int, length: int) -> bytes:
		if offset < 0 or length < 0 or offset + length > self.size:
			raise ValueError('The font points past the end of its file.')

		self.handle.seek(offset)
		data = self.handle.read(length)

		if len(data) < length:
			raise ValueError('The font file ended before the range was read.')

		return data

	def uint16(self, offset: int) -> int:
		return struct.unpack('>H', self.read(offset, 2))[0]

	def uint32(self, offset: int) -> int:
		return struct.unpack('>I', self.read(offset, 4))[0]


def readFontFile(path: str) -> List[dict]:
	"""Every face the file holds, one entry for a single font and one per face for
	a collection. A face that cannot be read is left out rather than failing the
	rest of the file.
	"""
	with open(path, 'rb') as handle:
		handle.seek(0, 2)
		file = _FontFile(handle, handle.tell())
		header = file.read(0, 12)

		if struct.unpack('>I', header[:4])[0] == _COLLECTION_TAG:
			count = struct.unpack('>I', header[8:12])[0]
			offsets = list(struct.unpack('>%dI' % count, file.read(12, count * 4)))
		else:
			offsets = [0]

		faces = []

		for index, offset in enumerate(offsets):
			try:
				face = _readFace(file, path, offset, index)
			except _READ_ERRORS:
				# A face whose tables point outside the file. The others may still be whole.
				continue

			if face is not None:
				faces.append(face)

		return faces


def _readFace(file: _FontFile, path: str, offset: int, index: int) -> Optional[dict]:
	header = file.read(offset, 12)

	if struct.unpack('>I', header[:4])[0] not in _SFNT_VERSIONS:
		return None

	tableCount = struct.unpack('>H', header[4:6])[0]
	directory = file.read(offset + 12, tableCount * 16)
	tables = {}

	for at in range(0, tableCount * 16, 16):
		tableOffset, tableLength = struct.unpack('>II', directory[at + 8 : at + 16])

		# A table that runs past the end of the file is treated as missing.
		if tableOffset + tableLength <= file.size:
			tables[directory[at : at + 4].decode('latin-1')] = (tableOffset, tableLength)

	names = _readNames(file, tables.get('name'))
	family = names.get(16) or names.get(1)

	if not family:
		return None

	style = names.get(17) or names.get(2) or 'Regular'
	macStyle = _readUint16(file, tables.get('head'), 44)
	os2 = tables.get('OS/2')
	os2Data = file.read(os2[0], min(os2[1], 64)) if os2 else b''
	weight = struct.unpack('>H', os2Data[4:6])[0] if len(os2Data) >= 8 else None
	width = struct.unpack('>H', os2Data[6:8])[0] if len(os2Data) >= 8 else None
	fsSelection = struct.unpack('>H', os2Data[62:64])[0] if len(os2Data) >= 64 else None
	fixedPitch = _readUint32(file, tables.get('post'), 12)

	return {
		'family': family,
		'style': style,
		'fullName': names.get(4) or '%s %s' % (family, style),
		'postScriptName': names.get(6),
		'version': names.get(5),
		'manufacturer': names.get(8),
		'designer': names.get(9),
		# `head.macStyle` stands in for a font old enough to have no OS/2 table.
		'weight': weight if weight is not None else (700 if (macStyle or 0) & 1 else 400),
		'width': width if width is not None else 5,
		# Bit 0 is italic and bit 9 is oblique.
		'italic': (
			(fsSelection & 0x201) != 0 if fsSelection is not None else ((macStyle or 0) & 2) != 0
		),
		'monospace': bool(fixedPitch) or _hasEqualAdvances(file, tables),
		'variable': 'fvar' in tables,
		'color': any(tag in tables for tag in _COLOR_TABLES),
		'path': path,
		'index': index,
	}


def _readUint16(file: _FontFile, table: Optional[tuple], at: int) -> Optional[int]:
	if table is None or table[1] < at + 2:
		return None

	return file.uint16(table[0] + at)


def _readUint32(file: _FontFile, table: Optional[tuple], at: int) -> Optional[int]:
	if table is None or table[1] < at + 4:
		return None

	return file.uint32(table[0] + at)


def _readNames(file: _FontFile, table: Optional[tuple]) -> Dict[int, str]:
	names: Dict[int, str] = {}

	if table is None or table[1] < 6:
		return names

	data = file.read(table[0], table[1])
	count, storage = struct.unpack('>HH', data[2:6])
	ranks: Dict[int, int] = {}

	for i in range(count):
		at = 6 + i * 12

		if at + 12 > len(data):
			break

		platformId, encodingId, languageId, nameId, length, offset = struct.unpack(
			'>6H', data[at : at + 12]
		)
		rank = _rankName(platformId, encodingId, languageId)

		if nameId not in _WANTED_NAMES or rank <= ranks.get(nameId, 0):
			continue

		start = storage + offset
		end = start + length

		if end > len(data):
			continue

		raw = data[start:end]
		decoded = raw.decode('mac_roman') if platformId == _MAC_PLATFORM else _decodeUtf16(raw)
		text = decoded.strip(_NAME_PADDING)

		if text:
			names[nameId] = text
			ranks[nameId] = rank

	return names


def _rankName(platformId: int, encodingId: int, languageId: int) -> int:
	"""How much a name record is preferred, from Windows English down to any Windows
	language. `0` is a record in an encoding this reader does not decode.
	"""
	if platformId == _WINDOWS_PLATFORM and encodingId in _WINDOWS_UNICODE_ENCODINGS:
		return 4 if languageId == _WINDOWS_ENGLISH else 1

	if platformId == _MAC_PLATFORM and encodingId == 0 and languageId == 0:
		return 3

	if platformId == _UNICODE_PLATFORM:
		return 2

	return 0


def _decodeUtf16(raw: bytes) -> str:
	units = struct.unpack('>%dH' % (len(raw) // 2), raw[: len(raw) // 2 * 2])
	characters = []
	i = 0

	while i < len(units):
		unit = units[i]
		following = units[i + 1] if i + 1 < len(units) else 0

		if 0xD800 <= unit <= 0xDBFF and 0xDC00 <= following <= 0xDFFF:
			characters.append(chr(0x10000 + ((unit - 0xD800) << 10) + (following - 0xDC00)))
			i += 2
			continue

		# A surrogate without its other half, which no package could print.
		characters.append('�' if 0xD800 <= unit <= 0xDFFF else chr(unit))
		i += 1

	return ''.join(characters)


def _hasEqualAdvances(file: _FontFile, tables: dict) -> bool:
	"""Whether every printable ASCII character is drawn at the same advance. A font
	that leaves `post.isFixedPitch` unset can still be monospace, which is the case
	for Monaco and Courier on macOS.
	"""
	hmtx = tables.get('hmtx')
	glyphs = _mapPrintableAscii(file, tables.get('cmap'))

	if glyphs is None or hmtx is None:
		return False

	metricCount = _readUint16(file, tables.get('hhea'), 34)

	if not metricCount:
		return False

	# A glyph past the last full metric is drawn at that metric's advance.
	metrics = [min(glyph, metricCount - 1) for glyph in glyphs]
	first = min(metrics)
	last = max(metrics)

	if (last + 1) * 4 > hmtx[1]:
		return False

	data = file.read(hmtx[0] + first * 4, (last - first + 1) * 4)
	advances = {struct.unpack_from('>H', data, (metric - first) * 4)[0] for metric in metrics}

	return len(advances) == 1


def _mapPrintableAscii(file: _FontFile, cmap: Optional[tuple]) -> Optional[List[int]]:
	"""The glyph of each character from U+0020 to U+007E, through the first Unicode
	`cmap` subtable in format 4 or 12. `None` when the font has no such subtable or
	leaves one of the characters out.
	"""
	if cmap is None or cmap[1] < 4:
		return None

	count = file.uint16(cmap[0] + 2)

	if 4 + count * 8 > cmap[1]:
		return None

	data = file.read(cmap[0] + 4, count * 8)
	records = [struct.unpack('>HHI', data[i * 8 : i * 8 + 8]) for i in range(count)]
	preferences = ((_WINDOWS_PLATFORM, 1), (_WINDOWS_PLATFORM, 10), (_UNICODE_PLATFORM, None))
	subtables = [
		offset
		for platformId, encodingId in preferences
		for recordPlatform, recordEncoding, offset in records
		if recordPlatform == platformId and (encodingId is None or recordEncoding == encodingId)
	]
	end = cmap[0] + cmap[1]

	for subtable in subtables:
		start = cmap[0] + subtable

		if start + 2 > end:
			continue

		subtableFormat = file.uint16(start)

		if subtableFormat == 4:
			return _mapFormat4(file, start, end)

		if subtableFormat == 12:
			return _mapFormat12(file, start, end)

	return None


def _mapFormat4(file: _FontFile, start: int, end: int) -> Optional[List[int]]:
	if start + 14 > end:
		return None

	doubleCount = file.uint16(start + 6)
	arraysStart = start + 14

	if doubleCount == 0 or arraysStart + doubleCount * 4 + 2 > end:
		return None

	# endCode, a reserved word, startCode, idDelta and idRangeOffset, in that order.
	arrays = file.read(arraysStart, doubleCount * 4 + 2)
	startCodes = doubleCount + 2
	deltas = doubleCount * 2 + 2
	rangeOffsets = doubleCount * 3 + 2

	def word(at: int) -> int:
		return struct.unpack('>H', arrays[at : at + 2])[0]

	glyphs = []
	lookups = []
	segment = 0

	for code in _PRINTABLE:
		while segment < doubleCount and word(segment) < code:
			segment += 2

		if segment >= doubleCount or word(startCodes + segment) > code:
			return None

		delta = word(deltas + segment)
		rangeOffset = word(rangeOffsets + segment)

		if rangeOffset == 0:
			glyphs.append((code + delta) & 0xFFFF)
		else:
			# The offset counts from where it is stored to the glyph index array.
			segmentStart = word(startCodes + segment)
			address = arraysStart + rangeOffsets + segment + rangeOffset + (code - segmentStart) * 2
			lookups.append((len(glyphs), address, delta))
			glyphs.append(0)

	if lookups:
		low = min(address for _, address, _ in lookups)
		high = max(address for _, address, _ in lookups) + 2

		if high > end:
			return None

		data = file.read(low, high - low)

		for position, address, delta in lookups:
			glyph = struct.unpack('>H', data[address - low : address - low + 2])[0]
			glyphs[position] = 0 if glyph == 0 else (glyph + delta) & 0xFFFF

	return None if 0 in glyphs else glyphs


def _mapFormat12(file: _FontFile, start: int, end: int) -> Optional[List[int]]:
	if start + 16 > end:
		return None

	# Groups are sorted and do not overlap, so no more than 127 of them can begin
	# at or below U+007E. Anything later cannot hold a printable ASCII character.
	groupCount = min(file.uint32(start + 12), 127)

	if start + 16 + groupCount * 12 > end:
		return None

	data = file.read(start + 16, groupCount * 12)
	groups = [struct.unpack('>III', data[i * 12 : i * 12 + 12]) for i in range(groupCount)]
	glyphs = []
	group = 0

	for code in _PRINTABLE:
		while group < groupCount and groups[group][1] < code:
			group += 1

		if group >= groupCount or groups[group][0] > code:
			return None

		glyphs.append(groups[group][2] + code - groups[group][0])

	return None if 0 in glyphs else glyphs
