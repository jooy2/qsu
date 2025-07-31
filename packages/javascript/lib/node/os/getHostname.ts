import { hostname, platform } from 'os';
import { runCommand } from './runCommand.js';

export async function getHostname(): Promise<string> {
	const platformName = platform();
	let command;

	if (platformName === 'win32') {
		return process.env.COMPUTERNAME || hostname() || 'Unknown';
	} else if (platformName === 'darwin') {
		command = 'scutil --get ComputerName';
	} else if (platformName === 'linux' || platformName === 'freebsd') {
		command = 'hostnamectl --pretty';
	} else {
		return hostname() || 'Unknown';
	}

	try {
		const response = await runCommand(command);

		if (response) {
			return response;
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error?.message);
		}
	}

	throw new Error('Failed to get hostname');
}
