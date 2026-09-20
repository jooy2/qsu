import { readFile } from 'node:fs/promises';
import { hostname, platform } from 'node:os';
import { runCommand } from './runCommand.js';

export async function getHostname(): Promise<string> {
	const platformName = platform();

	if (platformName === 'darwin') {
		// The name given to the machine in System Settings, which is not the kernel
		// hostname: `Sam's MacBook` against `sams-macbook.local`.
		return (await readComputerName()) || hostname() || 'Unknown';
	}

	if (platformName === 'linux') {
		return (await readStaticHostname()) || hostname() || 'Unknown';
	}

	if (platformName === 'win32') {
		return process.env.COMPUTERNAME || hostname() || 'Unknown';
	}

	return hostname() || 'Unknown';
}

async function readComputerName(): Promise<string | null> {
	try {
		return (await runCommand('scutil --get ComputerName'))?.trim() || null;
	} catch {
		// No name has been set, or the tool refused to answer. The kernel always has
		// a name of its own, so the caller is not left with an error.
		return null;
	}
}

async function readStaticHostname(): Promise<string | null> {
	try {
		// What `hostnamectl` reports, without needing systemd to be installed.
		return (await readFile('/etc/hostname', 'utf8')).split('\n')[0].trim() || null;
	} catch {
		// A system that sets its hostname another way keeps no such file.
		return null;
	}
}
