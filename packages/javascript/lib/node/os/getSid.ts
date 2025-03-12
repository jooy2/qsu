import { homedir, platform, userInfo } from 'os';
import { AnyValueObject } from '../../_types/global';
import { runCommand } from './runCommand.js';

export async function getSid(): Promise<string> {
	const platformName = platform();

	if (platformName === 'win32') {
		try {
			const profileLists = await runCommand(
				`REG QUERY "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList" /s`
			);

			const profiles: AnyValueObject = {};
			const sections = profileLists.split('HKEY_LOCAL_MACHINE\\');

			sections.forEach((section) => {
				const lines = section
					.split('\n')
					.map((line) => line.trim())
					.filter((line) => line);

				if (lines.length > 0) {
					const keyName: string = lines[0].split('\\').pop() || 'Unknown';
					const profileImagePath = lines.find((line) => line.startsWith('ProfileImagePath'));

					if (profileImagePath) {
						profiles[keyName] = profileImagePath.split('    ').pop() || 'Unknown';
					}
				}
			});

			for (let i = 0; i < Object.keys(profiles).length; i += 1) {
				const key = Object.keys(profiles)[i];
				const value = profiles[key];

				if (value === homedir()) {
					return key;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error?.message);
			}
		}

		throw new Error('Failed to get machine id');
	}

	if (platformName === 'darwin') {
		try {
			const execResult = await runCommand(`dsmemberutil getsid -U ${userInfo().username}`);

			if (execResult) {
				return execResult.replace(/\r?\n/g, '');
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error?.message);
			}
		}

		throw new Error('Failed to get machine id');
	}

	throw new Error('Not supported on this operating system.');
}
