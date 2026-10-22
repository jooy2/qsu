import assert from 'assert';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, realpath, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, describe, it } from 'node:test';
import {
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
	getMacAddress,
	getOsName,
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
	getProcessRamSize,
	getTimezone,
	runCommand
} from '../dist/node';
import { contains } from '../dist/verify';

const PLATFORM_NAMES = ['windows', 'macos', 'linux', 'android', 'ios', 'freebsd', 'unknown'];

// Node's own vocabulary, which is the one the Python package normalises into.
const ARCHITECTURES = [
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
	'x64'
];

describe('OS', () => {
	it('runCommand', async () => {
		assert.strictEqual(await runCommand('echo a'), 'a');
		assert.strictEqual(await runCommand('echo b'), 'b');
	});

	// `sort` reads standard input on every supported platform, so it never returns
	// while that pipe is open. The timeout is what fails the test: a regression here
	// hangs rather than throwing.
	it('runCommand does not wait on standard input', { timeout: 10000 }, async () => {
		assert.strictEqual(await runCommand('sort'), '');
	});

	it('getCpuModel', () => {
		const cpuName = getCpuModel();

		assert.strictEqual(cpuName.length > 0, true);
		assert.match(cpuName, /[a-zA-Z0-9]+/);
		assert.notEqual(cpuName, 'Unknown');
		// The model of the processor, not the architecture the process was built for.
		// Both packages answer with the same string, and an architecture name here
		// means the lookup fell through to a last resort.
		assert.doesNotMatch(cpuName, /^(arm|arm64|aarch64|x86|x86_64|amd64|i[3-6]86)$/i);
	});

	it('getComputerName', async () => {
		const hostname = await getComputerName();

		assert.strictEqual(hostname.length > 0, true);
		assert.match(hostname, /[a-zA-Z0-9]+/);
		assert.notEqual(hostname, 'Unknown');
		// A name may hold spaces of its own, but never around itself and never a
		// line ending left over from whatever was asked for it.
		assert.strictEqual(hostname, hostname.trim());
	});

	/*
	 * Sample Response:
	 * Windows: a642d9e1-6063-4da7-8ea8-2298f989d01d
	 * Linux: 5c6ee51d3e514eb4883e4373e320192c
	 * macOS: BAC04154-124A-56E1-BFEB-D6D94FE5DBC0
	 */
	it('getMachineId', async () => {
		const mId = await getMachineId();

		let regex;

		switch (process.platform) {
			case 'win32':
			case 'darwin':
			case 'freebsd':
				regex = /^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/;
				break;
			default:
				regex = /^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}/;
				break;
		}

		assert.match(mId, regex);
		// The same machine answers with the same id, whichever call asks.
		assert.strictEqual(await getMachineId(), mId);
	});

	it('getRamSize', async () => {
		const ramSize = getRamSize();

		assert.strictEqual(ramSize.endsWith('GB'), true);
		assert.strictEqual(contains(ramSize, ['1', '2', '4', '7', '8', '14', '16', '32']), true);
	});

	// Example: S-1-5-21-406418252-5582013529-1321253100-2001
	it('getSid', async () => {
		const { platform } = process;

		if (platform !== 'win32' && platform !== 'darwin') {
			await assert.rejects(getSid(), /Not supported on this operating system/);
			return;
		}

		const sidResult = await getSid();

		assert.match(sidResult, /^S-1-[0-59]-\d{2}-\d{8,10}-\d{8,10}-\d{8,10}-[1-9]\d{1,9}/);
	});

	it('getProcessUptime', () => {
		assert.strictEqual(typeof getProcessUptime() === 'number', true);
		assert.strictEqual(typeof getProcessUptime({ format: true }) === 'string', true);
		assert.strictEqual(getProcessUptime({ floor: true }).toString().indexOf('.') === -1, true);
		assert.strictEqual((getProcessUptime() as number) >= 0, true);
	});

	it('getFreeRamSize', () => {
		const size = getFreeRamSize();

		assert.match(size, /^\d+ [A-Z]+$/);
		// A running machine always has some memory free, so a zero here is a read
		// that failed rather than a machine that is full.
		assert.notEqual(size, '0 B');
	});

	it('getUsedRamSize', () => {
		assert.match(getUsedRamSize(), /^\d+ [A-Z]+$/);
	});

	it('getRamUsage', () => {
		const usage = getRamUsage();

		assert.strictEqual(typeof usage === 'number', true);
		assert.strictEqual(usage >= 0 && usage <= 100, true);
		assert.strictEqual(Number.isInteger(getRamUsage(0)), true);
		// The argument is how many decimal places are kept.
		assert.strictEqual((getRamUsage(3).toString().split('.')[1] || '').length <= 3, true);
	});

	it('getDiskSize', async () => {
		const size = await getDiskSize();

		assert.match(size, /^\d+ [A-Z]+$/);
		assert.notEqual(size, '0 B');
		// The current working directory is the default, named or not.
		assert.strictEqual(await getDiskSize(process.cwd()), size);
	});

	it('getFreeDiskSize', async () => {
		assert.match(await getFreeDiskSize(), /^\d+ [A-Z]+$/);
	});

	it('getDiskUsage', async () => {
		const usage = await getDiskUsage();

		assert.strictEqual(typeof usage === 'number', true);
		// A disk with an operating system on it is never empty, and a reading that
		// came back as `NaN` would leave zero here rather than failing outright.
		assert.strictEqual(usage > 0 && usage <= 100, true);
		assert.strictEqual(Number.isInteger(await getDiskUsage(undefined, 0)), true);
	});

	it('the disk functions report a path that is not there', async () => {
		const missing = join(tmpdir(), 'qsu-no-such-directory-8f21');

		await assert.rejects(getDiskSize(missing));
		await assert.rejects(getFreeDiskSize(missing));
		await assert.rejects(getDiskUsage(missing));
	});

	it('getSystemUptime', () => {
		const seconds = getSystemUptime() as number;

		assert.strictEqual(typeof seconds === 'number', true);
		assert.strictEqual(seconds > 0, true);
		// The machine has been running at least as long as this process has.
		assert.strictEqual(seconds >= (getProcessUptime() as number), true);
		assert.strictEqual(typeof getSystemUptime({ format: true }) === 'string', true);
		assert.strictEqual(getSystemUptime({ floor: true }).toString().indexOf('.') === -1, true);
	});

	it('getBootTime', () => {
		const bootTime = getBootTime();

		assert.strictEqual(bootTime instanceof Date, true);
		assert.strictEqual(bootTime.getTime() < Date.now(), true);
		// The boot time and the uptime are two readings of the same thing, so they
		// agree to within the moment it takes to read them twice.
		const fromUptime = Date.now() - (getSystemUptime() as number) * 1000;

		assert.strictEqual(Math.abs(bootTime.getTime() - fromUptime) < 2000, true);
	});

	it('getUsername', () => {
		const username = getUsername();

		assert.strictEqual(username.length > 0, true);
		assert.notEqual(username, 'Unknown');
		assert.strictEqual(username, username.trim());
	});

	it('getHomeDir', () => {
		const home = getHomeDir();

		assert.strictEqual(home.length > 0, true);
		assert.strictEqual(existsSync(home), true);
	});

	it('getTempDir', () => {
		const temp = getTempDir();

		assert.strictEqual(temp.length > 0, true);
		assert.strictEqual(existsSync(temp), true);
	});

	it('getShell', () => {
		const shell = getShell();

		assert.strictEqual(shell.length > 0, true);
		// A path to a program rather than a bare name, on either kind of system.
		assert.match(shell, process.platform === 'win32' ? /\\|\.exe$/i : /^\//);
	});

	it('getCpuSpeed', () => {
		const speed = getCpuSpeed();

		assert.strictEqual(Number.isInteger(speed), true);
		assert.strictEqual(speed >= 0, true);
	});

	it('getCpuUsage', async () => {
		const usage = await getCpuUsage(50);

		assert.strictEqual(typeof usage === 'number', true);
		assert.strictEqual(usage >= 0 && usage <= 100, true);
		assert.strictEqual(Number.isInteger(await getCpuUsage(50, 0)), true);
		// Nothing is sampled over no time at all, so there is nothing to report.
		assert.strictEqual(await getCpuUsage(0), 0);
	});

	it('getLocalIp', async () => {
		const address = await getLocalIp();

		assert.match(address, /^(\d{1,3}\.){3}\d{1,3}$/);
		assert.notEqual(address, '0.0.0.0');
		// The same machine answers with the same address, whichever call asks.
		assert.strictEqual(await getLocalIp(), address);
	});

	it('getMacAddress', () => {
		const address = getMacAddress();

		assert.match(address, /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/);
		// A machine with a network interface has an address on it.
		assert.notEqual(address, '00:00:00:00:00:00');
	});

	it('getOsName', async () => {
		const name = await getOsName();

		assert.strictEqual(name.length > 0, true);

		if (process.platform === 'darwin') {
			assert.match(name, /^macOS/);
		} else if (process.platform === 'win32') {
			assert.match(name, /^Windows/);
		} else if (process.platform === 'linux') {
			// The name the distribution gives itself, not the bare word `Linux`,
			// which is what is left when `os-release` could not be read.
			assert.notEqual(name, 'Linux');
		}
	});

	it('getProcessRamSize', () => {
		const size = getProcessRamSize();

		assert.match(size, /^\d+ [A-Z]+$/);
		assert.notEqual(size, '0 B');
	});

	it('getTimezone', () => {
		const timezone = getTimezone();

		assert.strictEqual(timezone.length > 0, true);
		// An IANA name, such as `Asia/Seoul`, or one of the bare ones like `UTC`.
		assert.match(timezone, /^[A-Za-z]+(\/[A-Za-z0-9_+-]+)*$/);
	});

	it('getPlatform', () => {
		const name = getPlatform();

		assert.strictEqual(PLATFORM_NAMES.includes(name), true);
		// Every system these tests run on is one the table covers, so `unknown` here
		// means a name fell out of it.
		assert.notEqual(name, 'unknown');
		assert.strictEqual(name === 'windows', process.platform === 'win32');
		assert.strictEqual(name === 'macos', process.platform === 'darwin');
		assert.strictEqual(name === 'linux', process.platform === 'linux');
	});

	it('getArch', () => {
		const architecture = getArch();

		assert.strictEqual(ARCHITECTURES.includes(architecture), true);
		assert.strictEqual(architecture, process.arch);
	});

	it('getCpuCount', () => {
		const count = getCpuCount();

		assert.strictEqual(Number.isInteger(count), true);
		assert.strictEqual(count >= 1, true);
		// The same machine answers with the same number, whichever call asks.
		assert.strictEqual(getCpuCount(), count);
	});

	it('getKernelVersion', () => {
		const version = getKernelVersion();

		assert.strictEqual(version.length > 0, true);
		assert.notEqual(version, 'Unknown');
		assert.match(version, /\d/);

		// The kernel version, not the name the system is sold under. Windows is
		// where the two part company: `10.0.26100` against `11`.
		if (process.platform === 'win32') {
			assert.match(version, /^\d+\.\d+\.\d+/);
		}
	});

	it('getEndianness', () => {
		assert.strictEqual(['BE', 'LE'].includes(getEndianness()), true);
	});
});

describe('getFonts', () => {
	let root: string;

	before(async () => {
		root = await realpath(await mkdtemp(join(tmpdir(), 'qsu-fonts-')));
	});

	after(async () => {
		await rm(root, { recursive: true, force: true });
	});

	// A directory of its own for each case, holding the given files.
	const writeFonts = async (files: Record<string, Buffer | string>): Promise<string> => {
		const directory = await mkdtemp(join(root, 'case-'));

		for (const [name, content] of Object.entries(files)) {
			await mkdir(join(directory, name, '..'), { recursive: true });
			await writeFile(join(directory, name), content);
		}

		return directory;
	};

	it('reads the names, the style and the tables of a face', async () => {
		const directory = await writeFonts({
			'sample.ttf': buildFont([
				{
					names: {
						1: 'Sample Legacy',
						2: 'Bold Italic',
						4: 'Sample Bold Italic',
						5: 'Version 1.000',
						6: 'Sample-BoldItalic',
						8: 'Example Foundry',
						9: 'Example Designer',
						16: 'Sample',
						17: 'Bold Italic'
					},
					os2: { weight: 700, width: 4, fsSelection: 1 },
					tables: ['fvar', 'COLR']
				}
			])
		});

		assert.deepStrictEqual(await getFonts({ directories: [directory] }), [
			{
				family: 'Sample',
				style: 'Bold Italic',
				fullName: 'Sample Bold Italic',
				postScriptName: 'Sample-BoldItalic',
				version: 'Version 1.000',
				manufacturer: 'Example Foundry',
				designer: 'Example Designer',
				weight: 700,
				width: 4,
				italic: true,
				monospace: false,
				variable: true,
				color: true,
				path: join(directory, 'sample.ttf'),
				index: 0
			}
		]);
	});

	it('falls back when a face leaves a field out', async () => {
		const directory = await writeFonts({
			'plain.ttf': buildFont([{ names: { 1: 'Plain' }, os2: null, macStyle: 3 }]),
			'slanted.ttf': buildFont([
				{ names: { 1: 'Slanted' }, os2: { weight: 300, width: 5, fsSelection: 0x200 } }
			])
		});
		const fonts = await getFonts({ directories: [directory] });

		assert.deepStrictEqual(fonts[0], {
			family: 'Plain',
			style: 'Regular',
			fullName: 'Plain Regular',
			postScriptName: null,
			version: null,
			manufacturer: null,
			designer: null,
			weight: 700,
			width: 5,
			italic: true,
			monospace: false,
			variable: false,
			color: false,
			path: join(directory, 'plain.ttf'),
			index: 0
		});
		// Bit 9 of `fsSelection` is oblique, which counts as italic.
		assert.strictEqual(fonts[1].italic, true);
		assert.strictEqual(fonts[1].weight, 300);
	});

	it('decodes the name records it prefers', async () => {
		const directory = await writeFonts({
			'mac.ttf': buildFont([{ macNames: { 1: 'Caf\x8e' } }]),
			'both.ttf': buildFont([{ macNames: { 1: 'Mac Name' }, names: { 1: 'Windows Name' } }]),
			'padded.ttf': buildFont([{ names: { 1: '  Padded\0' } }]),
			'broken.ttf': buildFont([{ names: { 1: 'Broken\ud800' } }])
		});
		const fonts = await getFonts({ directories: [directory] });

		assert.deepStrictEqual(
			fonts.map((font) => font.family),
			['Broken�', 'Café', 'Padded', 'Windows Name']
		);
	});

	it('tells a monospace face by its flag or by its advances', async () => {
		const proportional = (code: number) => 400 + code;
		const even = () => 600;
		const directory = await writeFonts({
			'flagged.ttf': buildFont([
				{ names: { 1: 'Flagged' }, fixedPitch: true, advance: proportional }
			]),
			'even.ttf': buildFont([{ names: { 1: 'Even' }, advance: even }]),
			'uneven.ttf': buildFont([
				{ names: { 1: 'Uneven' }, advance: (code) => (code === 0x69 ? 300 : 600) }
			]),
			'space.ttf': buildFont([
				{ names: { 1: 'Space' }, advance: (code) => (code === 0x20 ? 300 : 600) }
			]),
			'gap.ttf': buildFont([{ names: { 1: 'Gap' }, advance: even, missing: [0x7e] }]),
			'shared.ttf': buildFont([{ names: { 1: 'Shared' }, advance: proportional, metricCount: 2 }]),
			'wide.ttf': buildFont([{ names: { 1: 'Wide' }, advance: even, cmapFormat: 12 }]),
			'wide-gap.ttf': buildFont([
				{ names: { 1: 'Wide Gap' }, advance: even, cmapFormat: 12, missing: [0x20] }
			]),
			'indexed.ttf': buildFont([{ names: { 1: 'Indexed' }, advance: even, cmapFormat: 'array' }]),
			'indexed-gap.ttf': buildFont([
				{ names: { 1: 'Indexed Gap' }, advance: even, cmapFormat: 'array', missing: [0x41] }
			])
		});
		const fonts = await getFonts({ directories: [directory] });

		assert.deepStrictEqual(Object.fromEntries(fonts.map((font) => [font.family, font.monospace])), {
			Even: true,
			Flagged: true,
			Gap: false,
			Indexed: true,
			'Indexed Gap': false,
			Shared: true,
			Space: false,
			Uneven: false,
			Wide: true,
			'Wide Gap': false
		});
	});

	it('reads every face of a collection', async () => {
		const directory = await writeFonts({
			'pair.ttc': buildFont([
				{ names: { 1: 'Pair', 2: 'Regular' } },
				{ names: {} },
				{ names: { 1: 'Pair', 2: 'Bold' }, os2: { weight: 700, width: 5, fsSelection: 0 } }
			])
		});
		const fonts = await getFonts({ directories: [directory] });

		// The face with no family is left out, and the others keep their place.
		assert.deepStrictEqual(
			fonts.map((font) => [font.style, font.weight, font.index]),
			[
				['Regular', 400, 0],
				['Bold', 700, 2]
			]
		);
	});

	it('skips what it cannot read as a font', async () => {
		const valid = buildFont([{ names: { 1: 'Valid' }, version: 0x4f54544f }]);
		const directory = await writeFonts({
			'valid.otf': valid,
			'notes.ttf': 'This is not a font.',
			'cut.ttf': valid.subarray(0, 40),
			'unknown.ttf': buildFont([{ names: { 1: 'Unknown' }, version: 0x12345678 }]),
			'hidden.ttf': buildFont([{ names: { 1: '.Hidden' } }]),
			'valid.txt': valid
		});

		assert.deepStrictEqual(
			(await getFonts({ directories: [directory] })).map((font) => [font.family, font.path]),
			[['Valid', join(directory, 'valid.otf')]]
		);
		assert.deepStrictEqual(await getFonts({ directories: [join(root, 'missing')] }), []);
	});

	it('walks subdirectories, reads each file once and sorts by family', async () => {
		const directory = await writeFonts({
			'b/z.ttf': buildFont([{ names: { 1: 'Beta' } }]),
			'a/nested/y.TTF': buildFont([{ names: { 1: 'Alpha' } }])
		});
		let linked = false;

		try {
			await symlink(join(directory, 'a'), join(directory, 'c'), 'dir');
			await symlink(join(directory, 'b', 'z.ttf'), join(directory, 'alias.ttf'));
			linked = true;
		} catch {
			// Creating a link needs a privilege on Windows. The rest still applies.
		}

		const fonts = await getFonts({ directories: [directory, join(directory, 'b')] });

		assert.strictEqual(linked || process.platform === 'win32', true);
		assert.deepStrictEqual(
			fonts.map((font) => [font.family, font.path]),
			[
				['Alpha', join(directory, 'a', 'nested', 'y.TTF')],
				['Beta', join(directory, 'b', 'z.ttf')]
			]
		);
	});

	it('reads the fonts installed on this machine', async () => {
		const fonts = await getFonts();
		const keys = [
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
			'index'
		];

		// A server image may carry no fonts at all. A desktop system always does.
		if (process.platform === 'darwin' || process.platform === 'win32') {
			assert.strictEqual(fonts.length > 0, true);
		}

		for (const font of fonts) {
			assert.deepStrictEqual(Object.keys(font), keys);
			assert.strictEqual(typeof font.family, 'string');
			assert.strictEqual(font.family.startsWith('.'), false);
			assert.strictEqual(Number.isInteger(font.weight), true);
			assert.strictEqual(typeof font.monospace, 'boolean');
		}
	});
});

interface TestFace {
	names?: Record<number, string>;
	macNames?: Record<number, string>;
	fixedPitch?: boolean;
	advance?: (code: number) => number;
	missing?: number[];
	cmapFormat?: 4 | 12 | 'array';
	metricCount?: number;
	os2?: { weight: number; width: number; fsSelection: number } | null;
	macStyle?: number;
	tables?: string[];
	version?: number;
}

// Glyph 0 is `.notdef`, and each character from U+0020 to U+007E gets the next one.
const PRINTABLE = Array.from({ length: 95 }, (_, i) => 0x20 + i);
const GLYPH_COUNT = PRINTABLE.length + 1;

function u16(...values: number[]): Buffer {
	const buffer = Buffer.alloc(values.length * 2);

	values.forEach((value, i) => buffer.writeUInt16BE(value & 0xffff, i * 2));

	return buffer;
}

function u32(...values: number[]): Buffer {
	const buffer = Buffer.alloc(values.length * 4);

	values.forEach((value, i) => buffer.writeUInt32BE(value >>> 0, i * 4));

	return buffer;
}

/**
 * A TrueType file small enough to write by hand: the tables `getFonts` reads and
 * nothing else, with no outlines. More than one face makes a collection.
 */
function buildFont(faces: TestFace[]): Buffer {
	const tableSets = faces.map(buildTables);
	const parts: Buffer[] = [];
	const data: Buffer[] = [];
	const directories: number[] = [];
	let offset = faces.length > 1 ? 12 + faces.length * 4 : 0;

	for (const tables of tableSets) {
		directories.push(offset);
		offset += 12 + tables.length * 16;
	}

	if (faces.length > 1) {
		parts.push(Buffer.from('ttcf', 'latin1'), u32(0x00010000, faces.length, ...directories));
	}

	tableSets.forEach((tables, i) => {
		parts.push(u32(faces[i].version ?? 0x00010000), u16(tables.length, 0, 0, 0));

		for (const [tag, content] of tables) {
			const padded = Buffer.concat([content, Buffer.alloc((4 - (content.length % 4)) % 4)]);

			parts.push(Buffer.from(tag, 'latin1'), u32(0, offset, content.length));
			data.push(padded);
			offset += padded.length;
		}
	});

	return Buffer.concat([...parts, ...data]);
}

function buildTables(face: TestFace): [string, Buffer][] {
	const advance = face.advance ?? ((code: number) => 400 + code);
	const metricCount = face.metricCount ?? GLYPH_COUNT;
	const head = Buffer.alloc(54);
	const hhea = Buffer.alloc(36);
	const post = Buffer.alloc(32);
	const metrics: number[] = [];

	head.writeUInt16BE(face.macStyle ?? 0, 44);
	hhea.writeUInt16BE(metricCount, 34);
	post.writeUInt32BE(face.fixedPitch ? 1 : 0, 12);

	for (let glyph = 0; glyph < metricCount; glyph++) {
		metrics.push(glyph === 0 ? 500 : advance(PRINTABLE[glyph - 1]), 0);
	}

	const tables: [string, Buffer][] = [
		['name', buildNameTable(face)],
		['head', head],
		['hhea', hhea],
		['post', post],
		['cmap', buildCmapTable(face)],
		// The glyphs past the last full metric carry only a left side bearing.
		['hmtx', Buffer.concat([u16(...metrics), Buffer.alloc((GLYPH_COUNT - metricCount) * 2)])]
	];
	const os2 = face.os2 === undefined ? { weight: 400, width: 5, fsSelection: 0 } : face.os2;

	if (os2) {
		const table = Buffer.alloc(78);

		table.writeUInt16BE(os2.weight, 4);
		table.writeUInt16BE(os2.width, 6);
		table.writeUInt16BE(os2.fsSelection, 62);
		tables.push(['OS/2', table]);
	}

	for (const tag of face.tables ?? []) {
		tables.push([tag, Buffer.alloc(4)]);
	}

	return tables;
}

function buildNameTable(face: TestFace): Buffer {
	const records: [number, number, number, number, Buffer][] = [];
	const entries: Buffer[] = [];
	const strings: Buffer[] = [];
	let stored = 0;

	for (const [id, text] of Object.entries(face.macNames ?? {})) {
		records.push([1, 0, 0, Number(id), Buffer.from(text, 'latin1')]);
	}

	for (const [id, text] of Object.entries(face.names ?? {})) {
		records.push([3, 1, 0x0409, Number(id), Buffer.from(text, 'utf16le').swap16()]);
	}

	for (const [platformId, encodingId, languageId, nameId, bytes] of records) {
		entries.push(u16(platformId, encodingId, languageId, nameId, bytes.length, stored));
		strings.push(bytes);
		stored += bytes.length;
	}

	return Buffer.concat([u16(0, records.length, 6 + records.length * 12), ...entries, ...strings]);
}

function buildCmapTable(face: TestFace): Buffer {
	const missing = new Set(face.missing ?? []);
	const mapped = PRINTABLE.filter((code) => !missing.has(code));
	const glyphOf = (code: number) => code - 0x1f;
	let subtable: Buffer;

	if (face.cmapFormat === 12) {
		const groups = mapped.flatMap((code) => [code, code, glyphOf(code)]);

		subtable = Buffer.concat([
			u16(12, 0),
			u32(16 + mapped.length * 12, 0, mapped.length),
			u32(...groups)
		]);
	} else if (face.cmapFormat === 'array') {
		// One segment for the whole range, read through the glyph index array, and
		// the closing 0xFFFF segment. The range offset of 4 skips both offsets.
		const glyphs = PRINTABLE.map((code) => (missing.has(code) ? 0 : glyphOf(code)));

		subtable = u16(4, 16 + 8 * 2 + glyphs.length * 2, 0, 4, 0, 0, 0);
		subtable = Buffer.concat([
			subtable,
			u16(0x7e, 0xffff, 0, 0x20, 0xffff, 0, 1, 4, 0),
			u16(...glyphs)
		]);
	} else {
		// One segment per character, each shifted to its glyph by idDelta.
		const ends = [...mapped, 0xffff];
		const deltas = [...mapped.map((code) => glyphOf(code) - code), 1];

		subtable = Buffer.concat([
			u16(4, 16 + ends.length * 8, 0, ends.length * 2, 0, 0, 0),
			u16(...ends, 0, ...ends, ...deltas, ...ends.map(() => 0))
		]);
	}

	return Buffer.concat([u16(0, 1, 3, face.cmapFormat === 12 ? 10 : 1), u32(12), subtable]);
}
