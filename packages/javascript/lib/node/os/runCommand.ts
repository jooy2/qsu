import { exec as processExec } from 'child_process';
import { platform } from 'os';

export function runCommand(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const execCommandProcess = processExec(
			command,
			{ encoding: 'utf8', windowsHide: true },
			(error, stdout) => {
				if (error) {
					reject(error);
					return;
				}

				const output = platform() === 'win32' ? stdout : stdout.split('\r\n')?.[0] || '';

				execCommandProcess?.stdin?.end();

				if (output) {
					resolve(output);
					return;
				}

				reject(new Error(`Command failed`));
			}
		);
	});
}
