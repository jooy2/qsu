import { platform } from 'os';
import { runCommand } from './runCommand.js';

export async function getMachineId(): Promise<string> {
	const platformName = platform();
	let command;

	if (platformName === 'win32') {
		command =
			'for /f "tokens=3 delims= " %i in (\'REG QUERY HKLM\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid ^| findstr MachineGuid\') do @echo %i';
	} else if (platformName === 'darwin') {
		command = "ioreg -rd1 -c IOPlatformExpertDevice | awk '/IOPlatformUUID/' | cut -d '\"' -f4";
	} else if (platformName === 'freebsd') {
		command = 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid';
	} else {
		command =
			'(cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname) | head -n 1 || :';
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

	throw new Error('Failed to get machine id');
}
