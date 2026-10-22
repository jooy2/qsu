import os
import re
import struct
import subprocess
import sys
import tempfile
import threading
from datetime import datetime, timedelta

import pytest

from qsu.os import (
	getArch,
	getBootTime,
	getCpuModel,
	getCpuCount,
	getDiskSize,
	getDiskUsage,
	getEndianness,
	getFonts,
	getFreeDiskSize,
	getFreeRamSize,
	getHomeDir,
	getComputerName,
	getKernelVersion,
	getMachineId,
	getCpuSpeed,
	getCpuUsage,
	getLocalIp,
	getOsName,
	getProcessRamSize,
	getPlatform,
	getRamSize,
	getRamUsage,
	getShell,
	getSid,
	getSystemUptime,
	getTempDir,
	getProcessUptime,
	getUsedRamSize,
	getUsername,
	runCommand,
)


_PLATFORM_NAMES = (
	'windows',
	'macos',
	'linux',
	'android',
	'ios',
	'freebsd',
	'unknown',
)

# Node's own vocabulary, which is what this package normalises its answer into.
_ARCHITECTURES = (
	'arm',
	'arm64',
	'ia32',
	'loong64',
	'mips',
	'mipsel',
	'ppc',
	'ppc64',
	'riscv64',
	's390',
	's390x',
	'x64',
)


def test_runCommand():
	assert runCommand('echo a') == 'a'
	assert runCommand('echo b') == 'b'


def test_runCommand_does_not_wait_on_standard_input():
	# `sort` reads standard input on every supported platform, so it never returns
	# while that pipe is open. Running it on a thread keeps a regression from hanging
	# the whole suite.
	output = []
	thread = threading.Thread(target=lambda: output.append(runCommand('sort')), daemon=True)

	thread.start()
	thread.join(10)

	assert not thread.is_alive()
	assert output == ['']


def test_getCpuModel():
	cpuName = getCpuModel()

	assert len(cpuName) > 0
	assert re.search(r'[a-zA-Z0-9]+', cpuName)
	assert cpuName != 'Unknown'
	# The model of the processor, not the architecture the process was built for.
	# Both packages answer with the same string, and an architecture name here means
	# the lookup fell through to a last resort.
	assert not re.fullmatch(
		r'(arm|arm64|aarch64|x86|x86_64|amd64|i[3-6]86)', cpuName, re.IGNORECASE
	)


def test_getComputerName():
	hostname = getComputerName()

	assert len(hostname) > 0
	assert re.search(r'[a-zA-Z0-9]+', hostname)
	assert hostname != 'Unknown'
	# A name may hold spaces of its own, but never around itself and never a line
	# ending left over from whatever was asked for it.
	assert hostname == hostname.strip()


def test_getMachineId():
	mId = getMachineId()

	if sys.platform in ('win32', 'darwin') or sys.platform.startswith('freebsd'):
		regex = r'^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}'
	else:
		regex = r'^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}'

	assert re.match(regex, mId)
	# The same machine answers with the same id, whichever call asks.
	assert getMachineId() == mId


def test_getRamSize():
	ramSize = getRamSize()

	assert isinstance(ramSize, str)
	assert len(ramSize) > 0
	assert re.match(r'^\d+\s[A-Z]+$', ramSize)


def test_getSid():
	if sys.platform not in ('win32', 'darwin'):
		with pytest.raises(RuntimeError, match='Not supported on this operating system'):
			getSid()

		return

	sidResult = getSid()

	assert re.match(
		r'^S-1-[0-59]-\d{2}-\d{8,10}-\d{8,10}-\d{8,10}-[1-9]\d{1,9}',
		sidResult,
	)


def test_getProcessUptime():
	assert isinstance(getProcessUptime(), (int, float))
	assert isinstance(getProcessUptime({'format': True}), str)
	assert '.' not in str(getProcessUptime({'floor': True}))
	assert getProcessUptime() >= 0


def test_uptime_options_accept_keyword_arguments():
	# The options may arrive as a dict or as keyword arguments, and the two mean the
	# same thing. This is what stands in for the JavaScript options object.
	for call in (getProcessUptime, getSystemUptime):
		assert isinstance(call(format=True), str)
		assert '.' not in str(call(floor=True))
		# A keyword wins over the same key in the dict.
		assert isinstance(call({'format': False}, format=True), str)


def test_getProcessUptime_counts_from_the_process_start():
	# `qsu` is imported after the wait, so a count that starts at import time reads
	# as zero here. JavaScript has `process.uptime()` and needs no equivalent test;
	# this one guards the platform calls that stand in for it.
	code = 'import time\ntime.sleep(0.5)\nfrom qsu.os import getProcessUptime\nprint(getProcessUptime())'
	result = subprocess.run([sys.executable, '-c', code], capture_output=True, text=True)

	assert result.returncode == 0, result.stderr
	assert float(result.stdout) >= 0.5


def test_getFreeRamSize():
	size = getFreeRamSize()

	assert re.match(r'^\d+\s[A-Z]+$', size)
	# A running machine always has some memory free, so a zero here is a read that
	# failed rather than a machine that is full.
	assert size != '0 B'


def test_getUsedRamSize():
	assert re.match(r'^\d+\s[A-Z]+$', getUsedRamSize())


def test_getRamUsage():
	usage = getRamUsage()

	assert isinstance(usage, (int, float))
	assert 0 <= usage <= 100
	assert isinstance(getRamUsage(0), int)
	# The argument is how many decimal places are kept.
	assert len(str(getRamUsage(3)).partition('.')[2]) <= 3


def test_getDiskSize():
	size = getDiskSize()

	assert re.match(r'^\d+\s[A-Z]+$', size)
	assert size != '0 B'
	# The current working directory is the default, named or not.
	assert getDiskSize(os.getcwd()) == size


def test_getFreeDiskSize():
	assert re.match(r'^\d+\s[A-Z]+$', getFreeDiskSize())


def test_getDiskUsage():
	usage = getDiskUsage()

	assert isinstance(usage, (int, float))
	# A disk with an operating system on it is never empty, and a reading that came
	# back as nothing would leave zero here rather than failing outright.
	assert 0 < usage <= 100
	assert isinstance(getDiskUsage(None, 0), int)


def test_disk_functions_report_a_path_that_is_not_there():
	missing = os.path.join(tempfile.gettempdir(), 'qsu-no-such-directory-8f21')

	for call in (getDiskSize, getFreeDiskSize, getDiskUsage):
		with pytest.raises(OSError):
			call(missing)


def test_getSystemUptime():
	seconds = getSystemUptime()

	assert isinstance(seconds, (int, float))
	assert seconds > 0
	# The machine has been running at least as long as this process has.
	assert seconds >= getProcessUptime()
	assert isinstance(getSystemUptime({'format': True}), str)
	assert '.' not in str(getSystemUptime({'floor': True}))


def test_getBootTime():
	bootTime = getBootTime()

	assert isinstance(bootTime, datetime)
	assert bootTime < datetime.now()
	# The boot time and the uptime are two readings of the same thing, so they agree
	# to within the moment it takes to read them twice.
	fromUptime = datetime.now() - timedelta(seconds=getSystemUptime())

	assert abs((bootTime - fromUptime).total_seconds()) < 2


def test_getUsername():
	username = getUsername()

	assert len(username) > 0
	assert username != 'Unknown'
	assert username == username.strip()


def test_getHomeDir():
	home = getHomeDir()

	assert len(home) > 0
	assert os.path.isdir(home)


def test_getTempDir():
	temp = getTempDir()

	assert len(temp) > 0
	assert os.path.isdir(temp)


def test_getShell():
	shell = getShell()

	assert len(shell) > 0

	# A path to a program rather than a bare name, on either kind of system.
	if sys.platform == 'win32':
		assert re.search(r'\\|\.exe$', shell, re.IGNORECASE)
	else:
		assert shell.startswith('/')


def test_getCpuSpeed():
	speed = getCpuSpeed()

	assert isinstance(speed, int)
	assert speed >= 0


def test_getCpuUsage():
	usage = getCpuUsage(50)

	assert isinstance(usage, (int, float))
	assert 0 <= usage <= 100
	assert isinstance(getCpuUsage(50, 0), int)
	# Nothing is sampled over no time at all, so there is nothing to report.
	assert getCpuUsage(0) == 0


def test_getLocalIp():
	address = getLocalIp()

	assert re.match(r'^(\d{1,3}\.){3}\d{1,3}$', address)
	assert address != '0.0.0.0'
	# The same machine answers with the same address, whichever call asks.
	assert getLocalIp() == address


def test_getOsName():
	name = getOsName()

	assert len(name) > 0

	if sys.platform == 'darwin':
		assert name.startswith('macOS')
	elif sys.platform == 'win32':
		assert name.startswith('Windows')
	elif sys.platform.startswith('linux'):
		# The name the distribution gives itself, not the bare word `Linux`, which is
		# what is left when `os-release` could not be read.
		assert name != 'Linux'


def test_getProcessRamSize():
	size = getProcessRamSize()

	assert re.match(r'^\d+\s[A-Z]+$', size)
	assert size != '0 B'


def test_getPlatform():
	name = getPlatform()

	assert name in _PLATFORM_NAMES
	# Every system these tests run on is one the table covers, so `unknown` here
	# means a name fell out of it.
	assert name != 'unknown'
	assert (name == 'windows') == (sys.platform == 'win32')
	assert (name == 'macos') == (sys.platform == 'darwin')
	assert (name == 'linux') == sys.platform.startswith('linux')


def test_getArch():
	assert getArch() in _ARCHITECTURES


def test_getCpuCount():
	count = getCpuCount()

	assert isinstance(count, int)
	assert count >= 1
	# The same machine answers with the same number, whichever call asks.
	assert getCpuCount() == count


def test_getKernelVersion():
	version = getKernelVersion()

	assert len(version) > 0
	assert version != 'Unknown'
	assert re.search(r'\d', version)

	# The kernel version, not the name the system is sold under. Windows is where
	# the two part company: `10.0.26100` against `11`.
	if sys.platform == 'win32':
		assert re.match(r'^\d+\.\d+\.\d+', version)


def test_getEndianness():
	assert getEndianness() in ('BE', 'LE')


def _writeFonts(directory, files):
	"""Write each file under the directory, creating the folders on the way."""
	for name, content in files.items():
		path = os.path.join(directory, *name.split('/'))
		os.makedirs(os.path.dirname(path), exist_ok=True)

		with open(path, 'wb') as handle:
			handle.write(content.encode('utf-8') if isinstance(content, str) else content)

	return directory


def test_getFonts_reads_the_names_the_style_and_the_tables_of_a_face(tmp_path):
	directory = os.path.realpath(tmp_path)
	_writeFonts(
		directory,
		{
			'sample.ttf': _buildFont(
				[
					{
						'names': {
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
						'os2': {'weight': 700, 'width': 4, 'fsSelection': 1},
						'tables': ['fvar', 'COLR'],
					}
				]
			)
		},
	)

	assert getFonts({'directories': [directory]}) == [
		{
			'family': 'Sample',
			'style': 'Bold Italic',
			'fullName': 'Sample Bold Italic',
			'postScriptName': 'Sample-BoldItalic',
			'version': 'Version 1.000',
			'manufacturer': 'Example Foundry',
			'designer': 'Example Designer',
			'weight': 700,
			'width': 4,
			'italic': True,
			'monospace': False,
			'variable': True,
			'color': True,
			'path': os.path.join(directory, 'sample.ttf'),
			'index': 0,
		}
	]


def test_getFonts_falls_back_when_a_face_leaves_a_field_out(tmp_path):
	directory = os.path.realpath(tmp_path)
	_writeFonts(
		directory,
		{
			'plain.ttf': _buildFont([{'names': {1: 'Plain'}, 'os2': None, 'macStyle': 3}]),
			'slanted.ttf': _buildFont(
				[{'names': {1: 'Slanted'}, 'os2': {'weight': 300, 'width': 5, 'fsSelection': 0x200}}]
			),
		},
	)
	fonts = getFonts(directories=[directory])

	assert fonts[0] == {
		'family': 'Plain',
		'style': 'Regular',
		'fullName': 'Plain Regular',
		'postScriptName': None,
		'version': None,
		'manufacturer': None,
		'designer': None,
		'weight': 700,
		'width': 5,
		'italic': True,
		'monospace': False,
		'variable': False,
		'color': False,
		'path': os.path.join(directory, 'plain.ttf'),
		'index': 0,
	}
	# Bit 9 of `fsSelection` is oblique, which counts as italic.
	assert fonts[1]['italic'] is True
	assert fonts[1]['weight'] == 300


def test_getFonts_decodes_the_name_records_it_prefers(tmp_path):
	directory = os.path.realpath(tmp_path)
	_writeFonts(
		directory,
		{
			'mac.ttf': _buildFont([{'macNames': {1: b'Caf\x8e'}}]),
			'both.ttf': _buildFont([{'macNames': {1: b'Mac Name'}, 'names': {1: 'Windows Name'}}]),
			'padded.ttf': _buildFont([{'names': {1: '  Padded\x00'}}]),
			'broken.ttf': _buildFont([{'names': {1: 'Broken\ud800'}}]),
		},
	)

	assert [font['family'] for font in getFonts(directories=[directory])] == [
		'Broken\ufffd',
		'Caf\u00e9',
		'Padded',
		'Windows Name',
	]


def test_getFonts_tells_a_monospace_face_by_its_flag_or_by_its_advances(tmp_path):
	directory = os.path.realpath(tmp_path)

	def proportional(code):
		return 400 + code

	def even(code):
		return 600

	_writeFonts(
		directory,
		{
			'flagged.ttf': _buildFont([{'names': {1: 'Flagged'}, 'fixedPitch': True, 'advance': proportional}]),
			'even.ttf': _buildFont([{'names': {1: 'Even'}, 'advance': even}]),
			'uneven.ttf': _buildFont(
				[{'names': {1: 'Uneven'}, 'advance': lambda code: 300 if code == 0x69 else 600}]
			),
			'space.ttf': _buildFont(
				[{'names': {1: 'Space'}, 'advance': lambda code: 300 if code == 0x20 else 600}]
			),
			'gap.ttf': _buildFont([{'names': {1: 'Gap'}, 'advance': even, 'missing': [0x7E]}]),
			'shared.ttf': _buildFont([{'names': {1: 'Shared'}, 'advance': proportional, 'metricCount': 2}]),
			'wide.ttf': _buildFont([{'names': {1: 'Wide'}, 'advance': even, 'cmapFormat': 12}]),
			'wide-gap.ttf': _buildFont(
				[{'names': {1: 'Wide Gap'}, 'advance': even, 'cmapFormat': 12, 'missing': [0x20]}]
			),
			'indexed.ttf': _buildFont([{'names': {1: 'Indexed'}, 'advance': even, 'cmapFormat': 'array'}]),
			'indexed-gap.ttf': _buildFont(
				[{'names': {1: 'Indexed Gap'}, 'advance': even, 'cmapFormat': 'array', 'missing': [0x41]}]
			),
		},
	)

	assert {font['family']: font['monospace'] for font in getFonts(directories=[directory])} == {
		'Even': True,
		'Flagged': True,
		'Gap': False,
		'Indexed': True,
		'Indexed Gap': False,
		'Shared': True,
		'Space': False,
		'Uneven': False,
		'Wide': True,
		'Wide Gap': False,
	}


def test_getFonts_reads_every_face_of_a_collection(tmp_path):
	directory = os.path.realpath(tmp_path)
	_writeFonts(
		directory,
		{
			'pair.ttc': _buildFont(
				[
					{'names': {1: 'Pair', 2: 'Regular'}},
					{'names': {}},
					{'names': {1: 'Pair', 2: 'Bold'}, 'os2': {'weight': 700, 'width': 5, 'fsSelection': 0}},
				]
			)
		},
	)

	# The face with no family is left out, and the others keep their place.
	assert [(font['style'], font['weight'], font['index']) for font in getFonts(directories=[directory])] == [
		('Regular', 400, 0),
		('Bold', 700, 2),
	]


def test_getFonts_skips_what_it_cannot_read_as_a_font(tmp_path):
	directory = os.path.realpath(tmp_path)
	valid = _buildFont([{'names': {1: 'Valid'}, 'version': 0x4F54544F}])
	_writeFonts(
		directory,
		{
			'valid.otf': valid,
			'notes.ttf': 'This is not a font.',
			'cut.ttf': valid[:40],
			'unknown.ttf': _buildFont([{'names': {1: 'Unknown'}, 'version': 0x12345678}]),
			'hidden.ttf': _buildFont([{'names': {1: '.Hidden'}}]),
			'valid.txt': valid,
		},
	)

	assert [(font['family'], font['path']) for font in getFonts(directories=[directory])] == [
		('Valid', os.path.join(directory, 'valid.otf'))
	]
	assert getFonts(directories=[os.path.join(directory, 'missing')]) == []


def test_getFonts_walks_subdirectories_reads_each_file_once_and_sorts_by_family(tmp_path):
	directory = os.path.realpath(tmp_path)
	_writeFonts(
		directory,
		{
			'b/z.ttf': _buildFont([{'names': {1: 'Beta'}}]),
			'a/nested/y.TTF': _buildFont([{'names': {1: 'Alpha'}}]),
		},
	)
	linked = False

	try:
		os.symlink(os.path.join(directory, 'a'), os.path.join(directory, 'c'), target_is_directory=True)
		os.symlink(os.path.join(directory, 'b', 'z.ttf'), os.path.join(directory, 'alias.ttf'))
		linked = True
	except OSError:
		# Creating a link needs a privilege on Windows. The rest still applies.
		pass

	fonts = getFonts(directories=[directory, os.path.join(directory, 'b')])

	assert linked or sys.platform == 'win32'
	assert [(font['family'], font['path']) for font in fonts] == [
		('Alpha', os.path.join(directory, 'a', 'nested', 'y.TTF')),
		('Beta', os.path.join(directory, 'b', 'z.ttf')),
	]


def test_getFonts_reads_the_fonts_installed_on_this_machine():
	fonts = getFonts()
	keys = [
		'family',
		'style',
		'fullName',
		'postScriptName',
		'version',
		'manufacturer',
		'designer',
		'weight',
		'width',
		'italic',
		'monospace',
		'variable',
		'color',
		'path',
		'index',
	]

	# A server image may carry no fonts at all. A desktop system always does.
	if sys.platform in ('darwin', 'win32'):
		assert len(fonts) > 0

	for font in fonts:
		assert list(font) == keys
		assert isinstance(font['family'], str)
		assert not font['family'].startswith('.')
		assert isinstance(font['weight'], int)
		assert isinstance(font['monospace'], bool)


# Glyph 0 is `.notdef`, and each character from U+0020 to U+007E gets the next one.
_PRINTABLE = list(range(0x20, 0x7F))
_GLYPH_COUNT = len(_PRINTABLE) + 1


def _u16(*values):
	return struct.pack('>%dH' % len(values), *(value & 0xFFFF for value in values))


def _u32(*values):
	return struct.pack('>%dI' % len(values), *(value & 0xFFFFFFFF for value in values))


def _buildFont(faces):
	"""A TrueType file small enough to write by hand: the tables `getFonts` reads and
	nothing else, with no outlines. More than one face makes a collection.
	"""
	tableSets = [_buildTables(face) for face in faces]
	parts = []
	data = []
	directories = []
	offset = 12 + len(faces) * 4 if len(faces) > 1 else 0

	for tables in tableSets:
		directories.append(offset)
		offset += 12 + len(tables) * 16

	if len(faces) > 1:
		parts.append(b'ttcf' + _u32(0x00010000, len(faces), *directories))

	for face, tables in zip(faces, tableSets):
		parts.append(_u32(face.get('version', 0x00010000)) + _u16(len(tables), 0, 0, 0))

		for tag, content in tables:
			padded = content + bytes((4 - len(content) % 4) % 4)
			parts.append(tag.encode('latin-1') + _u32(0, offset, len(content)))
			data.append(padded)
			offset += len(padded)

	return b''.join(parts + data)


def _buildTables(face):
	advance = face.get('advance', lambda code: 400 + code)
	metricCount = face.get('metricCount', _GLYPH_COUNT)
	head = bytearray(54)
	hhea = bytearray(36)
	post = bytearray(32)
	metrics = []

	struct.pack_into('>H', head, 44, face.get('macStyle', 0))
	struct.pack_into('>H', hhea, 34, metricCount)
	struct.pack_into('>I', post, 12, 1 if face.get('fixedPitch') else 0)

	for glyph in range(metricCount):
		metrics += [500 if glyph == 0 else advance(_PRINTABLE[glyph - 1]), 0]

	tables = [
		('name', _buildNameTable(face)),
		('head', bytes(head)),
		('hhea', bytes(hhea)),
		('post', bytes(post)),
		('cmap', _buildCmapTable(face)),
		# The glyphs past the last full metric carry only a left side bearing.
		('hmtx', _u16(*metrics) + bytes((_GLYPH_COUNT - metricCount) * 2)),
	]
	os2 = face.get('os2', {'weight': 400, 'width': 5, 'fsSelection': 0})

	if os2 is not None:
		table = bytearray(78)
		struct.pack_into('>HH', table, 4, os2['weight'], os2['width'])
		struct.pack_into('>H', table, 62, os2['fsSelection'])
		tables.append(('OS/2', bytes(table)))

	for tag in face.get('tables', []):
		tables.append((tag, bytes(4)))

	return tables


def _buildNameTable(face):
	records = [(1, 0, 0, nameId, raw) for nameId, raw in face.get('macNames', {}).items()]
	records += [
		(3, 1, 0x0409, nameId, text.encode('utf-16-be', 'surrogatepass'))
		for nameId, text in face.get('names', {}).items()
	]
	entries = []
	strings = []
	stored = 0

	for platformId, encodingId, languageId, nameId, raw in records:
		entries.append(_u16(platformId, encodingId, languageId, nameId, len(raw), stored))
		strings.append(raw)
		stored += len(raw)

	return _u16(0, len(records), 6 + len(records) * 12) + b''.join(entries + strings)


def _buildCmapTable(face):
	missing = set(face.get('missing', []))
	mapped = [code for code in _PRINTABLE if code not in missing]
	cmapFormat = face.get('cmapFormat', 4)

	def glyphOf(code):
		return code - 0x1F

	if cmapFormat == 12:
		groups = [value for code in mapped for value in (code, code, glyphOf(code))]
		subtable = _u16(12, 0) + _u32(16 + len(mapped) * 12, 0, len(mapped)) + _u32(*groups)
	elif cmapFormat == 'array':
		# One segment for the whole range, read through the glyph index array, and
		# the closing 0xFFFF segment. The range offset of 4 skips both offsets.
		glyphs = [0 if code in missing else glyphOf(code) for code in _PRINTABLE]
		subtable = (
			_u16(4, 16 + 8 * 2 + len(glyphs) * 2, 0, 4, 0, 0, 0)
			+ _u16(0x7E, 0xFFFF, 0, 0x20, 0xFFFF, 0, 1, 4, 0)
			+ _u16(*glyphs)
		)
	else:
		# One segment per character, each shifted to its glyph by idDelta.
		ends = mapped + [0xFFFF]
		deltas = [glyphOf(code) - code for code in mapped] + [1]
		subtable = _u16(4, 16 + len(ends) * 8, 0, len(ends) * 2, 0, 0, 0) + _u16(
			*ends, 0, *ends, *deltas, *(0 for _ in ends)
		)

	return _u16(0, 1, 3, 10 if cmapFormat == 12 else 1) + _u32(12) + subtable
