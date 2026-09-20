import { homedir, platform, userInfo } from 'node:os';
import { runCommand } from './runCommand.js';

const PROFILE_LIST_KEY = 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList';

// `REG QUERY` writes the name, the type and the value of a value with runs of
// spaces between them. A profile path holds single spaces of its own, so the run
// is what separates the columns, not a fixed count.
const PROFILE_PATH_LINE = /^ProfileImagePath\s{2,}REG_\w+\s{2,}(.+)$/;

export async function getSid(): Promise<string> {
	const platformName = platform();

	if (platformName === 'win32') {
		return getWindowsSid();
	}

	if (platformName === 'darwin') {
		return getDarwinSid();
	}

	throw new Error('Not supported on this operating system.');
}

async function getWindowsSid(): Promise<string> {
	// Every profile on the machine is listed under a key named after its SID, and
	// carries the folder that profile owns. The one owning this user's home
	// directory is this user's SID.
	const profileList = await runCommand(`REG QUERY "${PROFILE_LIST_KEY}" /s`);
	const home = homedir().toLowerCase();

	let currentSid = '';

	for (const line of (profileList || '').split(/\r?\n/)) {
		const trimmed = line.trim();

		if (trimmed.startsWith('HKEY_LOCAL_MACHINE\\')) {
			currentSid = trimmed.split('\\').pop() || '';
			continue;
		}

		const profilePath = trimmed.match(PROFILE_PATH_LINE);

		// Windows paths are compared without case, so a profile recorded as
		// `C:\Users\Sam` still matches a home directory read as `C:\users\sam`.
		if (currentSid && profilePath && profilePath[1].trim().toLowerCase() === home) {
			return currentSid;
		}
	}

	throw new Error('Failed to get the SID of the current user');
}

async function getDarwinSid(): Promise<string> {
	// Quoted because the name comes from the system rather than from this code, and
	// it is written into a shell command. macOS does not allow a single quote in a
	// user name, so there is nothing for the quotes to fail to contain.
	const sid = await runCommand(`dsmemberutil getsid -U '${userInfo().username}'`);

	if (!sid) {
		throw new Error('Failed to get the SID of the current user');
	}

	return sid.replace(/\r?\n/g, '');
}
