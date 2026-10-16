/// (Private) The faces a TrueType or OpenType file holds, for `getFonts`.
///
/// Only the table directory and the few tables `getFonts` reports from are
/// read, each at its offset, so a font file of several hundred megabytes costs
/// a few small reads.
library;

import 'dart:io';
import 'dart:typed_data';

/// One face of an installed font file, as `getFonts` reports it.
class FontInfo {
  final String family;
  final String style;
  final String fullName;
  final String? postScriptName;
  final String? version;
  final String? manufacturer;
  final String? designer;
  final int weight;
  final int width;
  final bool italic;
  final bool monospace;
  final bool variable;
  final bool color;
  final String path;
  final int index;

  const FontInfo({
    required this.family,
    required this.style,
    required this.fullName,
    required this.postScriptName,
    required this.version,
    required this.manufacturer,
    required this.designer,
    required this.weight,
    required this.width,
    required this.italic,
    required this.monospace,
    required this.variable,
    required this.color,
    required this.path,
    required this.index,
  });
}

/// A table the directory of a face points to, in bytes from the start of the
/// file.
typedef _Table = ({int offset, int length});

const int _collectionTag = 0x74746366; // 'ttcf'

/// TrueType outlines, CFF outlines, and the tag Apple's own TrueType fonts
/// carry.
const List<int> _sfntVersions = <int>[0x00010000, 0x4F54544F, 0x74727565];

const List<String> _colorTables = <String>['COLR', 'sbix', 'CBDT', 'SVG '];

/// The name records `getFonts` reports: family, subfamily, full name, version,
/// PostScript name, manufacturer, designer, and the typographic family and
/// subfamily.
const Set<int> _wantedNames = <int>{1, 2, 4, 5, 6, 8, 9, 16, 17};

const int _windowsPlatform = 3;
const int _macPlatform = 1;
const int _unicodePlatform = 0;
const int _windowsEnglish = 0x0409;

/// Symbol, Unicode BMP and Unicode full repertoire. All three are UTF-16BE.
const List<int> _windowsUnicodeEncodings = <int>[0, 1, 10];

/// The characters a monospace font has to draw at one advance: U+0020 to
/// U+007E.
const int _firstPrintable = 0x20;
const int _lastPrintable = 0x7E;

/// The upper half of Mac OS Roman, from 0x80 to 0xFF.
const String _macRomanHigh =
    'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… '
    'ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ';

const String _namePadding = ' \t\r\n\x00';

/// An open font file that is read a range at a time, never whole.
class _FontFile {
  final RandomAccessFile _handle;
  final int size;

  _FontFile(this._handle, this.size);

  ByteData read(int offset, int length) {
    if (offset < 0 || length < 0 || offset + length > size) {
      throw const FormatException('The font points past the end of its file.');
    }

    _handle.setPositionSync(offset);

    final Uint8List bytes = _handle.readSync(length);

    if (bytes.length < length) {
      throw const FormatException(
          'The font file ended before the range was read.');
    }

    return ByteData.sublistView(bytes);
  }

  int uint16(int offset) => read(offset, 2).getUint16(0);

  int uint32(int offset) => read(offset, 4).getUint32(0);
}

/// Every face the file at [path] holds, one entry for a single font and one per
/// face for a collection. A face that cannot be read is left out rather than
/// failing the rest of the file.
///
/// Throws a [FileSystemException] when the file cannot be read and a
/// [FormatException] when it is not a font at all.
List<FontInfo> readFontFile(String path) {
  final RandomAccessFile handle = File(path).openSync();

  try {
    final _FontFile file = _FontFile(handle, handle.lengthSync());
    final ByteData header = file.read(0, 12);
    final List<int> offsets = header.getUint32(0) == _collectionTag
        ? _collectionOffsets(file, header.getUint32(8))
        : <int>[0];
    final List<FontInfo> faces = <FontInfo>[];

    for (int index = 0; index < offsets.length; index++) {
      try {
        final FontInfo? face = _readFace(file, path, offsets[index], index);

        if (face != null) {
          faces.add(face);
        }
      } on FormatException {
        // A face whose tables point outside the file. The others may still be
        // whole.
      }
    }

    return faces;
  } finally {
    handle.closeSync();
  }
}

List<int> _collectionOffsets(_FontFile file, int count) {
  final ByteData data = file.read(12, count * 4);

  return <int>[for (int i = 0; i < count; i++) data.getUint32(i * 4)];
}

FontInfo? _readFace(_FontFile file, String path, int offset, int index) {
  final ByteData header = file.read(offset, 12);

  if (!_sfntVersions.contains(header.getUint32(0))) {
    return null;
  }

  final int tableCount = header.getUint16(4);
  final ByteData directory = file.read(offset + 12, tableCount * 16);
  final Map<String, _Table> tables = <String, _Table>{};

  for (int at = 0; at < tableCount * 16; at += 16) {
    final _Table table = (
      offset: directory.getUint32(at + 8),
      length: directory.getUint32(at + 12),
    );

    // A table that runs past the end of the file is treated as missing.
    if (table.offset + table.length <= file.size) {
      final String tag = String.fromCharCodes(<int>[
        for (int i = 0; i < 4; i++) directory.getUint8(at + i),
      ]);

      tables[tag] = table;
    }
  }

  final Map<int, String> names = _readNames(file, tables['name']);
  final String? family = names[16] ?? names[1];

  if (family == null) {
    return null;
  }

  final String style = names[17] ?? names[2] ?? 'Regular';
  final int macStyle = _readUint16(file, tables['head'], 44) ?? 0;
  final _Table? os2 = tables['OS/2'];
  final ByteData? os2Data = os2 == null
      ? null
      : file.read(os2.offset, os2.length < 64 ? os2.length : 64);
  final int? weight = os2Data != null && os2Data.lengthInBytes >= 8
      ? os2Data.getUint16(4)
      : null;
  final int? width = os2Data != null && os2Data.lengthInBytes >= 8
      ? os2Data.getUint16(6)
      : null;
  final int? fsSelection = os2Data != null && os2Data.lengthInBytes >= 64
      ? os2Data.getUint16(62)
      : null;
  final int fixedPitch = _readUint32(file, tables['post'], 12) ?? 0;

  return FontInfo(
    family: family,
    style: style,
    fullName: names[4] ?? '$family $style',
    postScriptName: names[6],
    version: names[5],
    manufacturer: names[8],
    designer: names[9],
    // `head.macStyle` stands in for a font old enough to have no OS/2 table.
    weight: weight ?? (macStyle & 1 != 0 ? 700 : 400),
    width: width ?? 5,
    // Bit 0 is italic and bit 9 is oblique.
    italic: fsSelection != null ? fsSelection & 0x201 != 0 : macStyle & 2 != 0,
    monospace: fixedPitch != 0 || _hasEqualAdvances(file, tables),
    variable: tables.containsKey('fvar'),
    color: _colorTables.any(tables.containsKey),
    path: path,
    index: index,
  );
}

int? _readUint16(_FontFile file, _Table? table, int at) {
  if (table == null || table.length < at + 2) {
    return null;
  }

  return file.uint16(table.offset + at);
}

int? _readUint32(_FontFile file, _Table? table, int at) {
  if (table == null || table.length < at + 4) {
    return null;
  }

  return file.uint32(table.offset + at);
}

Map<int, String> _readNames(_FontFile file, _Table? table) {
  final Map<int, String> names = <int, String>{};

  if (table == null || table.length < 6) {
    return names;
  }

  final ByteData data = file.read(table.offset, table.length);
  final int count = data.getUint16(2);
  final int storage = data.getUint16(4);
  final Map<int, int> ranks = <int, int>{};

  for (int i = 0; i < count && 6 + (i + 1) * 12 <= data.lengthInBytes; i++) {
    final int at = 6 + i * 12;
    final int platformId = data.getUint16(at);
    final int nameId = data.getUint16(at + 6);
    final int rank =
        _rankName(platformId, data.getUint16(at + 2), data.getUint16(at + 4));

    if (!_wantedNames.contains(nameId) || rank <= (ranks[nameId] ?? 0)) {
      continue;
    }

    final int start = storage + data.getUint16(at + 10);
    final int end = start + data.getUint16(at + 8);

    if (end > data.lengthInBytes) {
      continue;
    }

    final Uint8List bytes =
        data.buffer.asUint8List(data.offsetInBytes + start, end - start);
    final String text = _trimName(platformId == _macPlatform
        ? _decodeMacRoman(bytes)
        : _decodeUtf16(bytes));

    if (text.isNotEmpty) {
      names[nameId] = text;
      ranks[nameId] = rank;
    }
  }

  return names;
}

/// How much a name record is preferred, from Windows English down to any
/// Windows language. `0` is a record in an encoding this reader does not
/// decode.
int _rankName(int platformId, int encodingId, int languageId) {
  if (platformId == _windowsPlatform &&
      _windowsUnicodeEncodings.contains(encodingId)) {
    return languageId == _windowsEnglish ? 4 : 1;
  }

  if (platformId == _macPlatform && encodingId == 0 && languageId == 0) {
    return 3;
  }

  if (platformId == _unicodePlatform) {
    return 2;
  }

  return 0;
}

String _decodeUtf16(Uint8List bytes) {
  final List<int> units = <int>[
    for (int i = 0; i + 1 < bytes.length; i += 2)
      (bytes[i] << 8) | bytes[i + 1],
  ];
  final StringBuffer text = StringBuffer();

  for (int i = 0; i < units.length; i++) {
    final int unit = units[i];
    final int next = i + 1 < units.length ? units[i + 1] : 0;

    if (unit >= 0xD800 && unit <= 0xDBFF && next >= 0xDC00 && next <= 0xDFFF) {
      text.writeCharCode(0x10000 + ((unit - 0xD800) << 10) + (next - 0xDC00));
      i++;
    } else if (unit >= 0xD800 && unit <= 0xDFFF) {
      // A surrogate without its other half, which no package could print.
      text.writeCharCode(0xFFFD);
    } else {
      text.writeCharCode(unit);
    }
  }

  return text.toString();
}

String _decodeMacRoman(Uint8List bytes) {
  final StringBuffer text = StringBuffer();

  for (final int byte in bytes) {
    if (byte < 0x80) {
      text.writeCharCode(byte);
    } else {
      text.write(_macRomanHigh[byte - 0x80]);
    }
  }

  return text.toString();
}

String _trimName(String text) {
  int start = 0;
  int end = text.length;

  while (start < end && _namePadding.contains(text[start])) {
    start++;
  }

  while (end > start && _namePadding.contains(text[end - 1])) {
    end--;
  }

  return text.substring(start, end);
}

/// Whether every printable ASCII character is drawn at the same advance. A
/// font that leaves `post.isFixedPitch` unset can still be monospace, which is
/// the case for Monaco and Courier on macOS.
bool _hasEqualAdvances(_FontFile file, Map<String, _Table> tables) {
  final _Table? hmtx = tables['hmtx'];
  final List<int>? glyphs = _mapPrintableAscii(file, tables['cmap']);

  if (glyphs == null || hmtx == null) {
    return false;
  }

  final int metricCount = _readUint16(file, tables['hhea'], 34) ?? 0;

  if (metricCount == 0) {
    return false;
  }

  // A glyph past the last full metric is drawn at that metric's advance.
  final List<int> metrics = <int>[
    for (final int glyph in glyphs)
      glyph < metricCount ? glyph : metricCount - 1,
  ];
  final int first = metrics.reduce((a, b) => a < b ? a : b);
  final int last = metrics.reduce((a, b) => a > b ? a : b);

  if ((last + 1) * 4 > hmtx.length) {
    return false;
  }

  final ByteData data =
      file.read(hmtx.offset + first * 4, (last - first + 1) * 4);
  final int advance = data.getUint16((metrics.first - first) * 4);

  return metrics
      .every((int metric) => data.getUint16((metric - first) * 4) == advance);
}

/// The glyph of each character from U+0020 to U+007E, through the first
/// Unicode `cmap` subtable in format 4 or 12. `null` when the font has no such
/// subtable or leaves one of the characters out.
List<int>? _mapPrintableAscii(_FontFile file, _Table? cmap) {
  if (cmap == null || cmap.length < 4) {
    return null;
  }

  final int count = file.uint16(cmap.offset + 2);

  if (4 + count * 8 > cmap.length) {
    return null;
  }

  final ByteData records = file.read(cmap.offset + 4, count * 8);
  final List<(int, int?)> preferences = <(int, int?)>[
    (_windowsPlatform, 1),
    (_windowsPlatform, 10),
    (_unicodePlatform, null),
  ];
  final List<int> subtables = <int>[
    for (final (int platformId, int? encodingId) in preferences)
      for (int at = 0; at < count * 8; at += 8)
        if (records.getUint16(at) == platformId &&
            (encodingId == null || records.getUint16(at + 2) == encodingId))
          records.getUint32(at + 4),
  ];
  final int end = cmap.offset + cmap.length;

  for (final int subtable in subtables) {
    final int start = cmap.offset + subtable;

    if (start + 2 > end) {
      continue;
    }

    final int format = file.uint16(start);

    if (format == 4) {
      return _mapFormat4(file, start, end);
    }

    if (format == 12) {
      return _mapFormat12(file, start, end);
    }
  }

  return null;
}

List<int>? _mapFormat4(_FontFile file, int start, int end) {
  if (start + 14 > end) {
    return null;
  }

  final int doubleCount = file.uint16(start + 6);
  final int arraysStart = start + 14;

  if (doubleCount == 0 || arraysStart + doubleCount * 4 + 2 > end) {
    return null;
  }

  // endCode, a reserved word, startCode, idDelta and idRangeOffset, in that
  // order.
  final ByteData arrays = file.read(arraysStart, doubleCount * 4 + 2);
  final int startCodes = doubleCount + 2;
  final int deltas = doubleCount * 2 + 2;
  final int rangeOffsets = doubleCount * 3 + 2;
  final List<int> glyphs = <int>[];
  final List<({int position, int address, int delta})> lookups =
      <({int position, int address, int delta})>[];
  int segment = 0;

  for (int code = _firstPrintable; code <= _lastPrintable; code++) {
    while (segment < doubleCount && arrays.getUint16(segment) < code) {
      segment += 2;
    }

    if (segment >= doubleCount ||
        arrays.getUint16(startCodes + segment) > code) {
      return null;
    }

    final int delta = arrays.getUint16(deltas + segment);
    final int rangeOffset = arrays.getUint16(rangeOffsets + segment);

    if (rangeOffset == 0) {
      glyphs.add((code + delta) & 0xFFFF);
    } else {
      // The offset counts from where it is stored to the glyph index array.
      final int segmentStart = arrays.getUint16(startCodes + segment);

      lookups.add((
        position: glyphs.length,
        address: arraysStart +
            rangeOffsets +
            segment +
            rangeOffset +
            (code - segmentStart) * 2,
        delta: delta,
      ));
      glyphs.add(0);
    }
  }

  if (lookups.isNotEmpty) {
    final int low =
        lookups.map((lookup) => lookup.address).reduce((a, b) => a < b ? a : b);
    final int high = lookups
            .map((lookup) => lookup.address)
            .reduce((a, b) => a > b ? a : b) +
        2;

    if (high > end) {
      return null;
    }

    final ByteData data = file.read(low, high - low);

    for (final lookup in lookups) {
      final int glyph = data.getUint16(lookup.address - low);

      glyphs[lookup.position] =
          glyph == 0 ? 0 : (glyph + lookup.delta) & 0xFFFF;
    }
  }

  return glyphs.contains(0) ? null : glyphs;
}

List<int>? _mapFormat12(_FontFile file, int start, int end) {
  if (start + 16 > end) {
    return null;
  }

  // Groups are sorted and do not overlap, so no more than 127 of them can begin
  // at or below U+007E. Anything later cannot hold a printable ASCII character.
  final int declared = file.uint32(start + 12);
  final int groupCount = declared < 127 ? declared : 127;

  if (start + 16 + groupCount * 12 > end) {
    return null;
  }

  final ByteData groups = file.read(start + 16, groupCount * 12);
  final List<int> glyphs = <int>[];
  int group = 0;

  for (int code = _firstPrintable; code <= _lastPrintable; code++) {
    while (group < groupCount && groups.getUint32(group * 12 + 4) < code) {
      group++;
    }

    if (group >= groupCount || groups.getUint32(group * 12) > code) {
      return null;
    }

    glyphs.add(
        groups.getUint32(group * 12 + 8) + code - groups.getUint32(group * 12));
  }

  return glyphs.contains(0) ? null : glyphs;
}
