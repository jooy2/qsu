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

				execCommandProcess?.stdin?.end();

				resolve(stdout.replace(new RegExp(`${EOL}$`), ''));
			}
		);
	});
}
