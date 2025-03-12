import { exec as processExec } from 'child_process';
import { EOL } from 'os';

export function runCommand(command: string): Promise<string | null> {
	return new Promise((resolve, reject) => {
		const execCommandProcess = processExec(
			command,
			{ encoding: 'utf8', windowsHide: true },
			(error, stdout) => {
				if (error) {
					reject(error);
					return;
				}

				const output = stdout.split(EOL)?.[0];

				execCommandProcess?.stdin?.end();

				resolve(output);
			}
		);
	});
}
