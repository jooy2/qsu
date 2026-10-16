import { open, type FileHandle } from 'node:fs/promises';
import type { FontInfo } from '../../_types/global.js';

/** (Private) A table the directory of a face points to, in bytes from the start of the file. */
interface TableRecord {
	offset: number;
	length: number;
}

/** (Private) An open font file that is read a range at a time, never whole. */
interface FontFile {
	size: number;
	read(offset: number, length: number): Promise<Buffer>;
}

const COLLECTION_TAG = 0x74746366; // 'ttcf'

// TrueType outlines, CFF outlines, and the tag Apple's own TrueType fonts carry.
const SFNT_VERSIONS = [0x00010000, 0x4f54544f, 0x74727565];

const COLOR_TABLES = ['COLR', 'sbix', 'CBDT', 'SVG '];

// The name records `getFonts` reports: family, subfamily, full name, version,
// PostScript name, manufacturer, designer, and the typographic family and subfamily.
const WANTED_NAMES = new Set([1, 2, 4, 5, 6, 8, 9, 16, 17]);

const WINDOWS_PLATFORM = 3;
const MAC_PLATFORM = 1;
const UNICODE_PLATFORM = 0;
const WINDOWS_ENGLISH = 0x0409;

// Symbol, Unicode BMP and Unicode full repertoire. All three are UTF-16BE.
const WINDOWS_UNICODE_ENCODINGS = [0, 1, 10];

// The characters a monospace font has to draw at one advance: U+0020 to U+007E.
const FIRST_PRINTABLE = 0x20;
const LAST_PRINTABLE = 0x7e;

// The upper half of Mac OS Roman, from 0x80 to 0xFF.
const MAC_ROMAN_HIGH =
	'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ';

const NAME_PADDING = /^[ \t\r\n\0]+|[ \t\r\n\0]+$/g;

/**
 * (Private) Every face a TrueType or OpenType file holds, one entry for a single
 * font and one per face for a collection. A face that cannot be read is left out
 * rather than failing the rest of the file.
 */
export async function readFontFile(path: string): Promise<FontInfo[]> {
	const handle = await open(path, 'r');

	try {
		const { size } = await handle.stat();
		const file: FontFile = {
			size,
			read: (offset, length) => readRange(handle, size, offset, length)
		};
		const header = await file.read(0, 12);
		const offsets =
			header.readUInt32BE(0) === COLLECTION_TAG
				? await readCollectionOffsets(file, header.readUInt32BE(8))
				: [0];
		const faces: FontInfo[] = [];

		for (let index = 0; index < offsets.length; index++) {
			try {
				const face = await readFace(file, path, offsets[index], index);

				if (face) {
					faces.push(face);
				}
			} catch {
				// A face whose tables point outside the file. The others may still be whole.
			}
		}

		return faces;
	} finally {
		await handle.close();
	}
}

async function readRange(
	handle: FileHandle,
	size: number,
	offset: number,
	length: number
): Promise<Buffer> {
	if (offset < 0 || length < 0 || offset + length > size) {
		throw new RangeError('The font points past the end of its file.');
	}

	const buffer = Buffer.alloc(length);
	const { bytesRead } = await handle.read(buffer, 0, length, offset);

	if (bytesRead < length) {
		throw new RangeError('The font file ended before the range was read.');
	}

	return buffer;
}

async function readCollectionOffsets(file: FontFile, count: number): Promise<number[]> {
	const data = await file.read(12, count * 4);
	const offsets: number[] = [];

	for (let i = 0; i < count; i++) {
		offsets.push(data.readUInt32BE(i * 4));
	}

	return offsets;
}

async function readFace(
	file: FontFile,
	path: string,
	offset: number,
	index: number
): Promise<FontInfo | null> {
	const header = await file.read(offset, 12);

	if (!SFNT_VERSIONS.includes(header.readUInt32BE(0))) {
		return null;
	}

	const tableCount = header.readUInt16BE(4);
	const directory = await file.read(offset + 12, tableCount * 16);
	const tables = new Map<string, TableRecord>();

	for (let i = 0; i < tableCount; i++) {
		const at = i * 16;
		const table = {
			offset: directory.readUInt32BE(at + 8),
			length: directory.readUInt32BE(at + 12)
		};

		// A table that runs past the end of the file is treated as missing.
		if (table.offset + table.length <= file.size) {
			tables.set(directory.toString('latin1', at, at + 4), table);
		}
	}

	const names = await readNames(file, tables.get('name'));
	const family = names.get(16) ?? names.get(1);

	if (!family) {
		return null;
	}

	const style = names.get(17) ?? names.get(2) ?? 'Regular';
	const macStyle = await readUint16(file, tables.get('head'), 44);
	const os2 = tables.get('OS/2');
	const os2Data = os2 ? await file.read(os2.offset, Math.min(os2.length, 64)) : null;
	const weight = os2Data && os2Data.length >= 8 ? os2Data.readUInt16BE(4) : null;
	const width = os2Data && os2Data.length >= 8 ? os2Data.readUInt16BE(6) : null;
	const fsSelection = os2Data && os2Data.length >= 64 ? os2Data.readUInt16BE(62) : null;
	const fixedPitch = await readUint32(file, tables.get('post'), 12);

	return {
		family,
		style,
		fullName: names.get(4) ?? `${family} ${style}`,
		postScriptName: names.get(6) ?? null,
		version: names.get(5) ?? null,
		manufacturer: names.get(8) ?? null,
		designer: names.get(9) ?? null,
		// `head.macStyle` stands in for a font old enough to have no OS/2 table.
		weight: weight ?? ((macStyle ?? 0) & 1 ? 700 : 400),
		width: width ?? 5,
		// Bit 0 is italic and bit 9 is oblique.
		italic: fsSelection !== null ? (fsSelection & 0x201) !== 0 : ((macStyle ?? 0) & 2) !== 0,
		monospace: Boolean(fixedPitch) || (await hasEqualAdvances(file, tables)),
		variable: tables.has('fvar'),
		color: COLOR_TABLES.some((tag) => tables.has(tag)),
		path,
		index
	};
}

async function readUint16(
	file: FontFile,
	table: TableRecord | undefined,
	at: number
): Promise<number | null> {
	if (!table || table.length < at + 2) {
		return null;
	}

	return (await file.read(table.offset + at, 2)).readUInt16BE(0);
}

async function readUint32(
	file: FontFile,
	table: TableRecord | undefined,
	at: number
): Promise<number | null> {
	if (!table || table.length < at + 4) {
		return null;
	}

	return (await file.read(table.offset + at, 4)).readUInt32BE(0);
}

async function readNames(
	file: FontFile,
	table: TableRecord | undefined
): Promise<Map<number, string>> {
	const names = new Map<number, string>();

	if (!table || table.length < 6) {
		return names;
	}

	const data = await file.read(table.offset, table.length);
	const count = data.readUInt16BE(2);
	const storage = data.readUInt16BE(4);
	const ranks = new Map<number, number>();

	for (let i = 0; i < count && 6 + (i + 1) * 12 <= data.length; i++) {
		const at = 6 + i * 12;
		const platformId = data.readUInt16BE(at);
		const nameId = data.readUInt16BE(at + 6);
		const rank = rankName(platformId, data.readUInt16BE(at + 2), data.readUInt16BE(at + 4));

		if (!WANTED_NAMES.has(nameId) || rank <= (ranks.get(nameId) ?? 0)) {
			continue;
		}

		const start = storage + data.readUInt16BE(at + 10);
		const end = start + data.readUInt16BE(at + 8);

		if (end > data.length) {
			continue;
		}

		const bytes = data.subarray(start, end);
		const text = (platformId === MAC_PLATFORM ? decodeMacRoman(bytes) : decodeUtf16(bytes)).replace(
			NAME_PADDING,
			''
		);

		if (text) {
			names.set(nameId, text);
			ranks.set(nameId, rank);
		}
	}

	return names;
}

/**
 * How much a name record is preferred, from Windows English down to any Windows
 * language. `0` is a record in an encoding this reader does not decode.
 */
function rankName(platformId: number, encodingId: number, languageId: number): number {
	if (platformId === WINDOWS_PLATFORM && WINDOWS_UNICODE_ENCODINGS.includes(encodingId)) {
		return languageId === WINDOWS_ENGLISH ? 4 : 1;
	}

	if (platformId === MAC_PLATFORM && encodingId === 0 && languageId === 0) {
		return 3;
	}

	if (platformId === UNICODE_PLATFORM) {
		return 2;
	}

	return 0;
}

function decodeUtf16(bytes: Buffer): string {
	const units: number[] = [];

	for (let i = 0; i + 1 < bytes.length; i += 2) {
		units.push(bytes.readUInt16BE(i));
	}

	let text = '';

	for (let i = 0; i < units.length; i++) {
		const unit = units[i];
		const isHigh = unit >= 0xd800 && unit <= 0xdbff;
		const next = units[i + 1] ?? 0;

		if (isHigh && next >= 0xdc00 && next <= 0xdfff) {
			text += String.fromCharCode(unit, next);
			i++;
		} else if (unit >= 0xd800 && unit <= 0xdfff) {
			// A surrogate without its other half, which no package could print.
			text += '�';
		} else {
			text += String.fromCharCode(unit);
		}
	}

	return text;
}

function decodeMacRoman(bytes: Buffer): string {
	let text = '';

	for (const byte of bytes) {
		text += byte < 0x80 ? String.fromCharCode(byte) : MAC_ROMAN_HIGH[byte - 0x80];
	}

	return text;
}

/**
 * Whether every printable ASCII character is drawn at the same advance. A font
 * that leaves `post.isFixedPitch` unset can still be monospace, which is the case
 * for Monaco and Courier on macOS.
 */
async function hasEqualAdvances(
	file: FontFile,
	tables: Map<string, TableRecord>
): Promise<boolean> {
	const hhea = tables.get('hhea');
	const hmtx = tables.get('hmtx');
	const glyphs = await mapPrintableAscii(file, tables.get('cmap'));

	if (!glyphs || !hmtx) {
		return false;
	}

	const metricCount = await readUint16(file, hhea, 34);

	if (!metricCount) {
		return false;
	}

	// A glyph past the last full metric is drawn at that metric's advance.
	const metrics = glyphs.map((glyph) => Math.min(glyph, metricCount - 1));
	const first = Math.min(...metrics);
	const last = Math.max(...metrics);

	if ((last + 1) * 4 > hmtx.length) {
		return false;
	}

	const data = await file.read(hmtx.offset + first * 4, (last - first + 1) * 4);
	const advance = data.readUInt16BE((metrics[0] - first) * 4);

	return metrics.every((metric) => data.readUInt16BE((metric - first) * 4) === advance);
}

/**
 * The glyph of each character from U+0020 to U+007E, through the first Unicode
 * `cmap` subtable in format 4 or 12. `null` when the font has no such subtable or
 * leaves one of the characters out.
 */
async function mapPrintableAscii(
	file: FontFile,
	cmap: TableRecord | undefined
): Promise<number[] | null> {
	if (!cmap || cmap.length < 4) {
		return null;
	}

	const count = (await file.read(cmap.offset + 2, 2)).readUInt16BE(0);

	if (4 + count * 8 > cmap.length) {
		return null;
	}

	const records = await file.read(cmap.offset + 4, count * 8);
	const subtables: number[] = [];
	const preferences: [number, number | null][] = [
		[WINDOWS_PLATFORM, 1],
		[WINDOWS_PLATFORM, 10],
		[UNICODE_PLATFORM, null]
	];

	for (const [platformId, encodingId] of preferences) {
		for (let i = 0; i < count; i++) {
			const at = i * 8;

			if (
				records.readUInt16BE(at) === platformId &&
				(encodingId === null || records.readUInt16BE(at + 2) === encodingId)
			) {
				subtables.push(records.readUInt32BE(at + 4));
			}
		}
	}

	const end = cmap.offset + cmap.length;

	for (const subtable of subtables) {
		const start = cmap.offset + subtable;

		if (start + 2 > end) {
			continue;
		}

		const format = (await file.read(start, 2)).readUInt16BE(0);

		if (format === 4) {
			return mapFormat4(file, start, end);
		}

		if (format === 12) {
			return mapFormat12(file, start, end);
		}
	}

	return null;
}

async function mapFormat4(file: FontFile, start: number, end: number): Promise<number[] | null> {
	if (start + 14 > end) {
		return null;
	}

	const doubleCount = (await file.read(start + 6, 2)).readUInt16BE(0);
	const arraysStart = start + 14;

	if (doubleCount === 0 || arraysStart + doubleCount * 4 + 2 > end) {
		return null;
	}

	// endCode, a reserved word, startCode, idDelta and idRangeOffset, in that order.
	const arrays = await file.read(arraysStart, doubleCount * 4 + 2);
	const startCodes = doubleCount + 2;
	const deltas = doubleCount * 2 + 2;
	const rangeOffsets = doubleCount * 3 + 2;
	const glyphs: number[] = [];
	const lookups: { position: number; address: number; delta: number }[] = [];
	let segment = 0;

	for (let code = FIRST_PRINTABLE; code <= LAST_PRINTABLE; code++) {
		while (segment < doubleCount && arrays.readUInt16BE(segment) < code) {
			segment += 2;
		}

		if (segment >= doubleCount || arrays.readUInt16BE(startCodes + segment) > code) {
			return null;
		}

		const delta = arrays.readUInt16BE(deltas + segment);
		const rangeOffset = arrays.readUInt16BE(rangeOffsets + segment);

		if (rangeOffset === 0) {
			glyphs.push((code + delta) & 0xffff);
		} else {
			// The offset counts from where it is stored to the glyph index array.
			lookups.push({
				position: glyphs.length,
				address:
					arraysStart +
					rangeOffsets +
					segment +
					rangeOffset +
					(code - arrays.readUInt16BE(startCodes + segment)) * 2,
				delta
			});
			glyphs.push(0);
		}
	}

	if (lookups.length > 0) {
		const low = Math.min(...lookups.map((lookup) => lookup.address));
		const high = Math.max(...lookups.map((lookup) => lookup.address)) + 2;

		if (high > end) {
			return null;
		}

		const data = await file.read(low, high - low);

		for (const { position, address, delta } of lookups) {
			const glyph = data.readUInt16BE(address - low);

			glyphs[position] = glyph === 0 ? 0 : (glyph + delta) & 0xffff;
		}
	}

	return glyphs.includes(0) ? null : glyphs;
}

async function mapFormat12(file: FontFile, start: number, end: number): Promise<number[] | null> {
	if (start + 16 > end) {
		return null;
	}

	// Groups are sorted and do not overlap, so no more than 127 of them can begin
	// at or below U+007E. Anything later cannot hold a printable ASCII character.
	const groupCount = Math.min((await file.read(start + 12, 4)).readUInt32BE(0), 127);

	if (start + 16 + groupCount * 12 > end) {
		return null;
	}

	const groups = await file.read(start + 16, groupCount * 12);
	const glyphs: number[] = [];
	let group = 0;

	for (let code = FIRST_PRINTABLE; code <= LAST_PRINTABLE; code++) {
		while (group < groupCount && groups.readUInt32BE(group * 12 + 4) < code) {
			group++;
		}

		const groupStart = group < groupCount ? groups.readUInt32BE(group * 12) : Infinity;

		if (groupStart > code) {
			return null;
		}

		glyphs.push(groups.readUInt32BE(group * 12 + 8) + code - groupStart);
	}

	return glyphs.includes(0) ? null : glyphs;
}
