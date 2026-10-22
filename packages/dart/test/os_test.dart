import 'dart:io';
import 'dart:typed_data';

import 'package:path/path.dart' as p;
import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

const List<String> _platformNames = <String>[
  'windows',
  'macos',
  'linux',
  'android',
  'ios',
  'unknown',
];

/// Node's own vocabulary, which is the one this package normalises into.
const List<String> _architectures = <String>[
  'arm',
  'arm64',
  'ia32',
  'riscv32',
  'riscv64',
  'x64',
];

final RegExp _size = RegExp(r'^\d+ [A-Z]+$');

void main() {
  group('OS', () {
    test('getPlatform', () {
      final String name = getPlatform();

      expect(_platformNames.contains(name), isTrue);
      // Every system these tests run on is one the table covers.
      expect(name, isNot('unknown'));
      expect(name == 'windows', Platform.isWindows);
      expect(name == 'macos', Platform.isMacOS);
      expect(name == 'linux', Platform.isLinux);
    });

    test('getArch', () {
      expect(_architectures.contains(getArch()), isTrue);
    });

    test('getKernelVersion', () {
      final String version = getKernelVersion();

      expect(version, isNotEmpty);
      expect(version, isNot('Unknown'));
      expect(version, matches(RegExp(r'\d')));

      // The kernel version, not the name the system is sold under. Windows is
      // where the two part company: `10.0.26100` against `11`.
      if (Platform.isWindows) {
        expect(version, matches(RegExp(r'^\d+\.\d+\.\d+')));
      }
    });

    test('getEndianness', () {
      expect(<String>['BE', 'LE'].contains(getEndianness()), isTrue);
    });

    test('getCpuCount', () {
      expect(getCpuCount(), greaterThanOrEqualTo(1));
    });

    test('getCpuModel', () {
      final String name = getCpuModel();

      expect(name, isNotEmpty);
      expect(name, isNot('Unknown'));
      // The model of the processor, not the architecture it was built for.
      expect(
          name,
          isNot(matches(RegExp(r'^(arm|arm64|aarch64|x86|x86_64|amd64)$',
              caseSensitive: false))));
    });

    test('getCpuSpeed', () {
      expect(getCpuSpeed(), greaterThanOrEqualTo(0));
    });

    test('getCpuUsage', () async {
      final num usage = await getCpuUsage(interval: 50);

      expect(usage, inInclusiveRange(0, 100));
      expect(await getCpuUsage(interval: 50, decimals: 0), isA<int>());
      // Nothing is sampled over no time at all, so there is nothing to report.
      expect(await getCpuUsage(interval: 0), 0);
    });

    test('getRamSize', () {
      expect(getRamSize(), matches(_size));
      expect(getRamSize(), isNot('0 B'));
    });

    test('getFreeRamSize', () {
      final String size = getFreeRamSize();

      expect(size, matches(_size));
      // A running machine always has some memory free.
      expect(size, isNot('0 B'));
    });

    test('getUsedRamSize', () {
      expect(getUsedRamSize(), matches(_size));
    });

    test('getRamUsage', () {
      expect(getRamUsage(), inInclusiveRange(0, 100));
      expect(getRamUsage(decimals: 0), isA<int>());
    });

    test('getDiskSize', () async {
      final String size = await getDiskSize();

      expect(size, matches(_size));
      expect(size, isNot('0 B'));
      // The current working directory is the default, named or not.
      expect(await getDiskSize(path: Directory.current.path), size);
    });

    test('getFreeDiskSize', () async {
      expect(await getFreeDiskSize(), matches(_size));
    });

    test('getDiskUsage', () async {
      final num usage = await getDiskUsage();

      // A disk with an operating system on it is never empty.
      expect(usage, greaterThan(0));
      expect(usage, lessThanOrEqualTo(100));
    });

    test('getProcessUptime', () {
      expect(getProcessUptime(), isA<num>());
      expect(getProcessUptime() as num, greaterThan(0));
      expect(getProcessUptime(format: true), isA<String>());
      expect((getProcessUptime(floor: true) as num) % 1, 0);
    });

    test('getSystemUptime', () {
      final num seconds = getSystemUptime() as num;

      expect(seconds, greaterThan(0));
      // The machine has been running at least as long as this process has.
      expect(seconds, greaterThanOrEqualTo(getProcessUptime() as num));
      expect(getSystemUptime(format: true), isA<String>());
    });

    test('getBootTime', () {
      final DateTime bootTime = getBootTime();

      expect(bootTime.isBefore(DateTime.now()), isTrue);
      // The boot time and the uptime are two readings of the same thing, so
      // they agree to within the moment it takes to read them twice.
      final DateTime fromUptime = DateTime.now().subtract(
          Duration(milliseconds: ((getSystemUptime() as num) * 1000).round()));

      expect(bootTime.difference(fromUptime).inSeconds.abs(), lessThan(2));
    });

    test('getProcessRamSize', () {
      final String size = getProcessRamSize();

      expect(size, matches(_size));
      expect(size, isNot('0 B'));
    });

    test('getComputerName', () async {
      final String hostname = await getComputerName();

      expect(hostname, isNotEmpty);
      expect(hostname, isNot('Unknown'));
      // A name may hold spaces of its own, but never around itself.
      expect(hostname, hostname.trim());
    });

    test('getOsName', () async {
      final String name = await getOsName();

      expect(name, isNotEmpty);

      if (Platform.isMacOS) {
        expect(name, startsWith('macOS'));
      } else if (Platform.isWindows) {
        expect(name, startsWith('Windows'));
      } else if (Platform.isLinux) {
        // The name the distribution gives itself, not the bare word `Linux`.
        expect(name, isNot('Linux'));
      }
    });

    test('getUsername', () {
      final String username = getUsername();

      expect(username, isNotEmpty);
      expect(username, isNot('Unknown'));
    });

    test('getHomeDir', () {
      expect(Directory(getHomeDir()).existsSync(), isTrue);
    });

    test('getTempDir', () {
      expect(Directory(getTempDir()).existsSync(), isTrue);
    });

    test('getShell', () {
      final String shell = getShell();

      expect(shell, isNotEmpty);
      // A path to a program rather than a bare name, on either kind of system.
      expect(shell,
          matches(Platform.isWindows ? RegExp(r'\\|\.exe$') : RegExp(r'^/')));
    });

    test('getLocalIp', () async {
      final String address = await getLocalIp();

      expect(address, matches(RegExp(r'^(\d{1,3}\.){3}\d{1,3}$')));
      expect(address, isNot('0.0.0.0'));
    });

    test('getMachineId', () async {
      final String id = await getMachineId();

      expect(
          id,
          matches(RegExp(r'^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}'
              r'-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}')));
      // The same machine answers with the same id, whichever call asks.
      expect(await getMachineId(), id);
    });

    test('getSid', () async {
      if (!Platform.isWindows && !Platform.isMacOS) {
        expect(getSid(), throwsUnsupportedError);

        return;
      }

      expect(await getSid(),
          matches(RegExp(r'^S-1-[0-59]-\d{2}-\d{8,10}-\d{8,10}')));
    });

    test('runCommand', () async {
      expect(await runCommand('echo a'), 'a');
      expect(await runCommand('echo b'), 'b');
    });
  });

  group('getFonts', () {
    late String root;

    setUp(() {
      root = Directory.systemTemp
          .createTempSync('qsu-fonts-')
          .resolveSymbolicLinksSync();
    });

    tearDown(() {
      Directory(root).deleteSync(recursive: true);
    });

    // Writes each file under the temporary directory, creating the folders on
    // the way.
    void writeFonts(Map<String, List<int>> files) {
      for (final MapEntry<String, List<int>> file in files.entries) {
        File(p.joinAll(<String>[root, ...file.key.split('/')]))
          ..createSync(recursive: true)
          ..writeAsBytesSync(file.value);
      }
    }

    test('reads the names, the style and the tables of a face', () async {
      writeFonts(<String, List<int>>{
        'sample.ttf': _buildFont(<_TestFace>[
          const _TestFace(
            names: <int, String>{
              1: 'Sample Legacy',
              2: 'Bold Italic',
              4: 'Sample Bold Italic',
              5: 'Version 1.000',
              6: 'Sample-BoldItalic',
              8: 'Example Foundry',
              9: 'Example Designer',
              16: 'Sample',
              17: 'Bold Italic',
            },
            os2: (weight: 700, width: 4, fsSelection: 1),
            tables: <String>['fvar', 'COLR'],
          ),
        ]),
      });

      final List<FontInfo> fonts = await getFonts(directories: <String>[root]);

      expect(fonts.map(_fontMap).toList(), <Map<String, Object?>>[
        <String, Object?>{
          'family': 'Sample',
          'style': 'Bold Italic',
          'fullName': 'Sample Bold Italic',
          'postScriptName': 'Sample-BoldItalic',
          'version': 'Version 1.000',
          'manufacturer': 'Example Foundry',
          'designer': 'Example Designer',
          'weight': 700,
          'width': 4,
          'italic': true,
          'monospace': false,
          'variable': true,
          'color': true,
          'path': p.join(root, 'sample.ttf'),
          'index': 0,
        },
      ]);
    });

    test('falls back when a face leaves a field out', () async {
      writeFonts(<String, List<int>>{
        'plain.ttf': _buildFont(<_TestFace>[
          const _TestFace(
              names: <int, String>{1: 'Plain'}, withoutOs2: true, macStyle: 3),
        ]),
        'slanted.ttf': _buildFont(<_TestFace>[
          const _TestFace(
            names: <int, String>{1: 'Slanted'},
            os2: (weight: 300, width: 5, fsSelection: 0x200),
          ),
        ]),
      });

      final List<FontInfo> fonts = await getFonts(directories: <String>[root]);

      expect(_fontMap(fonts[0]), <String, Object?>{
        'family': 'Plain',
        'style': 'Regular',
        'fullName': 'Plain Regular',
        'postScriptName': null,
        'version': null,
        'manufacturer': null,
        'designer': null,
        'weight': 700,
        'width': 5,
        'italic': true,
        'monospace': false,
        'variable': false,
        'color': false,
        'path': p.join(root, 'plain.ttf'),
        'index': 0,
      });
      // Bit 9 of `fsSelection` is oblique, which counts as italic.
      expect(fonts[1].italic, isTrue);
      expect(fonts[1].weight, 300);
    });

    test('decodes the name records it prefers', () async {
      writeFonts(<String, List<int>>{
        'mac.ttf': _buildFont(<_TestFace>[
          const _TestFace(macNames: <int, List<int>>{
            1: <int>[0x43, 0x61, 0x66, 0x8E],
          }),
        ]),
        'both.ttf': _buildFont(<_TestFace>[
          _TestFace(
            macNames: <int, List<int>>{1: 'Mac Name'.codeUnits},
            names: const <int, String>{1: 'Windows Name'},
          ),
        ]),
        'padded.ttf': _buildFont(<_TestFace>[
          const _TestFace(names: <int, String>{1: '  Padded\u0000'}),
        ]),
        'broken.ttf': _buildFont(<_TestFace>[
          _TestFace(names: <int, String>{
            1: 'Broken${String.fromCharCode(0xD800)}',
          }),
        ]),
      });

      final List<FontInfo> fonts = await getFonts(directories: <String>[root]);

      expect(fonts.map((FontInfo font) => font.family).toList(),
          <String>['Broken�', 'Café', 'Padded', 'Windows Name']);
    });

    test('tells a monospace face by its flag or by its advances', () async {
      int proportional(int code) => 400 + code;
      int even(int code) => 600;

      writeFonts(<String, List<int>>{
        'flagged.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Flagged'},
              fixedPitch: true,
              advance: proportional),
        ]),
        'even.ttf': _buildFont(<_TestFace>[
          _TestFace(names: const <int, String>{1: 'Even'}, advance: even),
        ]),
        'uneven.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Uneven'},
              advance: (int code) => code == 0x69 ? 300 : 600),
        ]),
        'space.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Space'},
              advance: (int code) => code == 0x20 ? 300 : 600),
        ]),
        'gap.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Gap'},
              advance: even,
              missing: const <int>[0x7E]),
        ]),
        'shared.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Shared'},
              advance: proportional,
              metricCount: 2),
        ]),
        'wide.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Wide'},
              advance: even,
              cmapFormat: _CmapFormat.groups),
        ]),
        'wide-gap.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Wide Gap'},
              advance: even,
              cmapFormat: _CmapFormat.groups,
              missing: const <int>[0x20]),
        ]),
        'indexed.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Indexed'},
              advance: even,
              cmapFormat: _CmapFormat.glyphArray),
        ]),
        'indexed-gap.ttf': _buildFont(<_TestFace>[
          _TestFace(
              names: const <int, String>{1: 'Indexed Gap'},
              advance: even,
              cmapFormat: _CmapFormat.glyphArray,
              missing: const <int>[0x41]),
        ]),
      });

      final List<FontInfo> fonts = await getFonts(directories: <String>[root]);

      expect(<String, bool>{
        for (final FontInfo font in fonts) font.family: font.monospace,
      }, <String, bool>{
        'Even': true,
        'Flagged': true,
        'Gap': false,
        'Indexed': true,
        'Indexed Gap': false,
        'Shared': true,
        'Space': false,
        'Uneven': false,
        'Wide': true,
        'Wide Gap': false,
      });
    });

    test('reads every face of a collection', () async {
      writeFonts(<String, List<int>>{
        'pair.ttc': _buildFont(<_TestFace>[
          const _TestFace(names: <int, String>{1: 'Pair', 2: 'Regular'}),
          const _TestFace(),
          const _TestFace(
            names: <int, String>{1: 'Pair', 2: 'Bold'},
            os2: (weight: 700, width: 5, fsSelection: 0),
          ),
        ]),
      });

      final List<FontInfo> fonts = await getFonts(directories: <String>[root]);

      // The face with no family is left out, and the others keep their place.
      expect(
          fonts
              .map((FontInfo font) =>
                  <Object>[font.style, font.weight, font.index])
              .toList(),
          <List<Object>>[
            <Object>['Regular', 400, 0],
            <Object>['Bold', 700, 2],
          ]);
    });

    test('skips what it cannot read as a font', () async {
      final Uint8List valid = _buildFont(<_TestFace>[
        const _TestFace(names: <int, String>{1: 'Valid'}, version: 0x4F54544F),
      ]);

      writeFonts(<String, List<int>>{
        'valid.otf': valid,
        'notes.ttf': 'This is not a font.'.codeUnits,
        'cut.ttf': valid.sublist(0, 40),
        'unknown.ttf': _buildFont(<_TestFace>[
          const _TestFace(
              names: <int, String>{1: 'Unknown'}, version: 0x12345678),
        ]),
        'hidden.ttf': _buildFont(<_TestFace>[
          const _TestFace(names: <int, String>{1: '.Hidden'}),
        ]),
        'valid.txt': valid,
      });

      final List<FontInfo> fonts = await getFonts(directories: <String>[root]);

      expect(
          fonts.map((FontInfo font) => <String>[font.family, font.path]),
          <List<String>>[
            <String>['Valid', p.join(root, 'valid.otf')],
          ]);
      expect(await getFonts(directories: <String>[p.join(root, 'missing')]),
          hasLength(0));
    });

    test('walks subdirectories, reads each file once and sorts by family',
        () async {
      writeFonts(<String, List<int>>{
        'b/z.ttf': _buildFont(<_TestFace>[
          const _TestFace(names: <int, String>{1: 'Beta'}),
        ]),
        'a/nested/y.TTF': _buildFont(<_TestFace>[
          const _TestFace(names: <int, String>{1: 'Alpha'}),
        ]),
      });

      bool linked = false;

      try {
        Link(p.join(root, 'c')).createSync(p.join(root, 'a'));
        Link(p.join(root, 'alias.ttf')).createSync(p.join(root, 'b', 'z.ttf'));
        linked = true;
      } on FileSystemException {
        // Creating a link needs a privilege on Windows. The rest still applies.
      }

      final List<FontInfo> fonts =
          await getFonts(directories: <String>[root, p.join(root, 'b')]);

      expect(linked || Platform.isWindows, isTrue);
      expect(
          fonts.map((FontInfo font) => <String>[font.family, font.path]),
          <List<String>>[
            <String>['Alpha', p.join(root, 'a', 'nested', 'y.TTF')],
            <String>['Beta', p.join(root, 'b', 'z.ttf')],
          ]);
    });

    test('reads the fonts installed on this machine', () async {
      final List<FontInfo> fonts = await getFonts();

      // A server image may carry no fonts at all. A desktop system always does.
      if (Platform.isMacOS || Platform.isWindows) {
        expect(fonts, isNotEmpty);
      }

      for (final FontInfo font in fonts) {
        expect(font.family.startsWith('.'), isFalse);
        expect(font.family, isNotEmpty);
        expect(p.isAbsolute(font.path), isTrue);
      }
    });
  });
}

Map<String, Object?> _fontMap(FontInfo font) => <String, Object?>{
      'family': font.family,
      'style': font.style,
      'fullName': font.fullName,
      'postScriptName': font.postScriptName,
      'version': font.version,
      'manufacturer': font.manufacturer,
      'designer': font.designer,
      'weight': font.weight,
      'width': font.width,
      'italic': font.italic,
      'monospace': font.monospace,
      'variable': font.variable,
      'color': font.color,
      'path': font.path,
      'index': font.index,
    };

enum _CmapFormat { segments, groups, glyphArray }

class _TestFace {
  final Map<int, String> names;
  final Map<int, List<int>> macNames;
  final bool fixedPitch;
  final int Function(int code)? advance;
  final List<int> missing;
  final _CmapFormat cmapFormat;
  final int? metricCount;
  final ({int weight, int width, int fsSelection})? os2;
  final bool withoutOs2;
  final int macStyle;
  final List<String> tables;
  final int version;

  const _TestFace({
    this.names = const <int, String>{},
    this.macNames = const <int, List<int>>{},
    this.fixedPitch = false,
    this.advance,
    this.missing = const <int>[],
    this.cmapFormat = _CmapFormat.segments,
    this.metricCount,
    this.os2,
    this.withoutOs2 = false,
    this.macStyle = 0,
    this.tables = const <String>[],
    this.version = 0x00010000,
  });
}

/// Glyph 0 is `.notdef`, and each character from U+0020 to U+007E gets the
/// next one.
final List<int> _printable = List<int>.generate(95, (int i) => 0x20 + i);
final int _glyphCount = _printable.length + 1;

Uint8List _u16(List<int> values) {
  final ByteData data = ByteData(values.length * 2);

  for (int i = 0; i < values.length; i++) {
    data.setUint16(i * 2, values[i] & 0xFFFF);
  }

  return data.buffer.asUint8List();
}

Uint8List _u32(List<int> values) {
  final ByteData data = ByteData(values.length * 4);

  for (int i = 0; i < values.length; i++) {
    data.setUint32(i * 4, values[i] & 0xFFFFFFFF);
  }

  return data.buffer.asUint8List();
}

/// A TrueType file small enough to write by hand: the tables `getFonts` reads
/// and nothing else, with no outlines. More than one face makes a collection.
Uint8List _buildFont(List<_TestFace> faces) {
  final List<List<(String, Uint8List)>> tableSets =
      faces.map(_buildTables).toList();
  final BytesBuilder parts = BytesBuilder();
  final BytesBuilder data = BytesBuilder();
  final List<int> directories = <int>[];
  int offset = faces.length > 1 ? 12 + faces.length * 4 : 0;

  for (final List<(String, Uint8List)> tables in tableSets) {
    directories.add(offset);
    offset += 12 + tables.length * 16;
  }

  if (faces.length > 1) {
    parts
      ..add('ttcf'.codeUnits)
      ..add(_u32(<int>[0x00010000, faces.length, ...directories]));
  }

  for (int i = 0; i < faces.length; i++) {
    final List<(String, Uint8List)> tables = tableSets[i];

    parts
      ..add(_u32(<int>[faces[i].version]))
      ..add(_u16(<int>[tables.length, 0, 0, 0]));

    for (final (String tag, Uint8List content) in tables) {
      final int padding = (4 - content.length % 4) % 4;

      parts
        ..add(tag.codeUnits)
        ..add(_u32(<int>[0, offset, content.length]));
      data
        ..add(content)
        ..add(Uint8List(padding));
      offset += content.length + padding;
    }
  }

  parts.add(data.takeBytes());

  return parts.takeBytes();
}

List<(String, Uint8List)> _buildTables(_TestFace face) {
  final int Function(int code) advance =
      face.advance ?? (int code) => 400 + code;
  final int metricCount = face.metricCount ?? _glyphCount;
  final ByteData head = ByteData(54)..setUint16(44, face.macStyle);
  final ByteData hhea = ByteData(36)..setUint16(34, metricCount);
  final ByteData post = ByteData(32)..setUint32(12, face.fixedPitch ? 1 : 0);
  final List<int> metrics = <int>[
    for (int glyph = 0; glyph < metricCount; glyph++) ...<int>[
      glyph == 0 ? 500 : advance(_printable[glyph - 1]),
      0,
    ],
  ];
  final ({int weight, int width, int fsSelection})? os2 = face.withoutOs2
      ? null
      : face.os2 ?? (weight: 400, width: 5, fsSelection: 0);

  return <(String, Uint8List)>[
    ('name', _buildNameTable(face)),
    ('head', head.buffer.asUint8List()),
    ('hhea', hhea.buffer.asUint8List()),
    ('post', post.buffer.asUint8List()),
    ('cmap', _buildCmapTable(face)),
    // The glyphs past the last full metric carry only a left side bearing.
    (
      'hmtx',
      Uint8List.fromList(<int>[
        ..._u16(metrics),
        ...Uint8List((_glyphCount - metricCount) * 2),
      ])
    ),
    if (os2 != null)
      (
        'OS/2',
        (ByteData(78)
              ..setUint16(4, os2.weight)
              ..setUint16(6, os2.width)
              ..setUint16(62, os2.fsSelection))
            .buffer
            .asUint8List()
      ),
    for (final String tag in face.tables) (tag, Uint8List(4)),
  ];
}

Uint8List _buildNameTable(_TestFace face) {
  final List<(int, int, int, int, List<int>)> records =
      <(int, int, int, int, List<int>)>[
    for (final MapEntry<int, List<int>> name in face.macNames.entries)
      (1, 0, 0, name.key, name.value),
    for (final MapEntry<int, String> name in face.names.entries)
      (3, 1, 0x0409, name.key, _u16(name.value.codeUnits)),
  ];
  final BytesBuilder entries = BytesBuilder();
  final BytesBuilder strings = BytesBuilder();

  for (final (int, int, int, int, List<int>) record in records) {
    entries.add(_u16(<int>[
      record.$1,
      record.$2,
      record.$3,
      record.$4,
      record.$5.length,
      strings.length,
    ]));
    strings.add(record.$5);
  }

  return Uint8List.fromList(<int>[
    ..._u16(<int>[0, records.length, 6 + records.length * 12]),
    ...entries.takeBytes(),
    ...strings.takeBytes(),
  ]);
}

Uint8List _buildCmapTable(_TestFace face) {
  final List<int> mapped = <int>[
    for (final int code in _printable)
      if (!face.missing.contains(code)) code,
  ];
  int glyphOf(int code) => code - 0x1F;
  final List<int> subtable;

  switch (face.cmapFormat) {
    case _CmapFormat.groups:
      subtable = <int>[
        ..._u16(<int>[12, 0]),
        ..._u32(<int>[16 + mapped.length * 12, 0, mapped.length]),
        ..._u32(<int>[
          for (final int code in mapped) ...<int>[code, code, glyphOf(code)],
        ]),
      ];
    case _CmapFormat.glyphArray:
      // One segment for the whole range, read through the glyph index array,
      // and the closing 0xFFFF segment. The range offset of 4 skips both
      // offsets.
      subtable = <int>[
        ..._u16(<int>[4, 16 + 8 * 2 + _printable.length * 2, 0, 4, 0, 0, 0]),
        ..._u16(<int>[0x7E, 0xFFFF, 0, 0x20, 0xFFFF, 0, 1, 4, 0]),
        ..._u16(<int>[
          for (final int code in _printable)
            face.missing.contains(code) ? 0 : glyphOf(code),
        ]),
      ];
    case _CmapFormat.segments:
      // One segment per character, each shifted to its glyph by idDelta.
      final List<int> ends = <int>[...mapped, 0xFFFF];
      final List<int> deltas = <int>[
        for (final int code in mapped) glyphOf(code) - code,
        1,
      ];

      subtable = <int>[
        ..._u16(<int>[4, 16 + ends.length * 8, 0, ends.length * 2, 0, 0, 0]),
        ..._u16(<int>[
          ...ends,
          0,
          ...ends,
          ...deltas,
          for (final int _ in ends) 0,
        ]),
      ];
  }

  return Uint8List.fromList(<int>[
    ..._u16(<int>[
      0,
      1,
      3,
      if (face.cmapFormat == _CmapFormat.groups) 10 else 1,
    ]),
    ..._u32(<int>[12]),
    ...subtable,
  ]);
}
