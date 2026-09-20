import assert from 'assert';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import {
	runCommand,
	getArch,
	getBootTime,
	getCpu,
	getDiskSize,
	getDiskUsage,
	getFreeDiskSize,
	getCpuCount,
	getEndianness,
	getKernelVersion,
	getPlatform,
	getHomeDir,
	getHostname,
	getMachineId,
	getShell,
	getSid,
	getSystemUptime,
	getRamSize,
	getRamUsage,
	getFreeRamSize,
	getUsedRamSize,
	getTempDir,
	getUptime,
	getUsername
} from '../dist/node';
import { contains } from '../dist/verify';

const PLATFORM_NAMES = ['windows', 'macos', 'linux', 'freebsd', 'unknown'];

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

	it('getCpu', () => {
		const cpuName = getCpu();

		assert.strictEqual(cpuName.length > 0, true);
		assert.match(cpuName, /[a-zA-Z0-9]+/);
		assert.notEqual(cpuName, 'Unknown');
		// The model of the processor, not the architecture the process was built for.
		// Both packages answer with the same string, and an architecture name here
		// means the lookup fell through to a last resort.
		assert.doesNotMatch(cpuName, /^(arm|arm64|aarch64|x86|x86_64|amd64|i[3-6]86)$/i);
	});

	it('getHostname', async () => {
		const hostname = await getHostname();

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

	it('getUptime', () => {
		assert.strictEqual(typeof getUptime() === 'number', true);
		assert.strictEqual(typeof getUptime({ format: true }) === 'string', true);
		assert.strictEqual(getUptime({ floor: true }).toString().indexOf('.') === -1, true);
		assert.strictEqual((getUptime() as number) >= 0, true);
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
		assert.strictEqual(usage >= 0 && usage <= 100, true);
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
		assert.strictEqual(seconds >= (getUptime() as number), true);
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
	});

	it('getEndianness', () => {
		assert.strictEqual(['BE', 'LE'].includes(getEndianness()), true);
	});
});
