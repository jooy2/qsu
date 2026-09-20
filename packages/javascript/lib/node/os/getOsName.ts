import { readFile } from 'node:fs/promises';
import { platform, release } from 'node:os';

const MACOS_VERSION_FILE = '/System/Library/CoreServices/SystemVersion.plist';
const MACOS_VERSION = /<key>ProductVersion<\/key>\s*<string>([^<]+)<\/string>/;

// `os-release` is the interface every distribution agrees on. The second path is
// where a system that keeps `/etc` empty puts it.
const LINUX_NAME_FILES = ['/etc/os-release', '/usr/lib/os-release'];
const LINUX_NAME = /^PRETTY_NAME="?([^"\n]+)"?$/m;

// Windows 11 kept the NT version of Windows 10, so the build number is the only
// thing that separates them. 22000 is the first Windows 11 build.
const FIRST_WINDOWS_11_BUILD = 22000;

export async function getOsName(): Promise<string> {
	const platformName = platform();

	if (platformName === 'darwin') {
		const version = (await readOptional(MACOS_VERSION_FILE))?.match(MACOS_VERSION)?.[1];

		return version ? `macOS ${version}` : 'macOS';
	}

	if (platformName === 'linux') {
		for (const path of LINUX_NAME_FILES) {
			const name = (await readOptional(path))?.match(LINUX_NAME)?.[1];

			if (name) {
				return name;
			}
		}

		return 'Linux';
	}

	if (platformName === 'win32') {
		return windowsName();
	}

	return platformName;
}

function windowsName(): string {
	const [major, minor, build] = release().split('.').map(Number);

	if (major === 10) {
		return build >= FIRST_WINDOWS_11_BUILD ? 'Windows 11' : 'Windows 10';
	}

	if (major === 6) {
		return { 3: 'Windows 8.1', 2: 'Windows 8', 1: 'Windows 7' }[minor] || 'Windows';
	}

	return 'Windows';
}

async function readOptional(path: string): Promise<string | null> {
	try {
		return await readFile(path, 'utf8');
	} catch {
		// The file is not part of every installation. The caller has a fallback.
		return null;
	}
}
