import { readFile } from 'node:fs/promises';
import { hostname, platform } from 'node:os';
import { runCommand } from './runCommand.js';

// In the order the value is trusted. On systemd the second is a symlink to the
// first, and a system carrying neither has no machine id to give.
const MACHINE_ID_FILES = ['/var/lib/dbus/machine-id', '/etc/machine-id'];

const WINDOWS_GUID_VALUE = /MachineGuid\s+REG_\w+\s+(\S+)/;
const DARWIN_UUID_VALUE = /"IOPlatformUUID"\s*=\s*"([^"]+)"/;

export async function getMachineId(): Promise<string> {
	const platformName = platform();
	let machineId: string | null;

	if (platformName === 'win32') {
		machineId = await getWindowsMachineId();
	} else if (platformName === 'darwin') {
		machineId = await getDarwinMachineId();
	} else if (platformName === 'freebsd') {
		machineId = await runCommand('kenv -q smbios.system.uuid || sysctl -n kern.hostuuid');
	} else {
		machineId = await getLinuxMachineId();
	}

	if (machineId) {
		return machineId.trim();
	}

	throw new Error('Failed to get machine id');
}

async function getWindowsMachineId(): Promise<string | null> {
	const value = await runCommand(
		'REG QUERY HKLM\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid'
	);

	return value?.match(WINDOWS_GUID_VALUE)?.[1] || null;
}

async function getDarwinMachineId(): Promise<string | null> {
	const properties = await runCommand('ioreg -rd1 -c IOPlatformExpertDevice');

	return properties?.match(DARWIN_UUID_VALUE)?.[1] || null;
}

async function getLinuxMachineId(): Promise<string | null> {
	for (const path of MACHINE_ID_FILES) {
		try {
			// The id is the first line; the file is not supposed to hold anything else.
			const id = (await readFile(path, 'utf8')).split('\n')[0].trim();

			if (id) {
				return id;
			}
		} catch {
			// A system that keeps no machine id simply has no such file. Try the next.
		}
	}

	return hostname() || null;
}
