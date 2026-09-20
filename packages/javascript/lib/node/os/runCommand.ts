import { exec as processExec } from 'node:child_process';
import { EOL } from 'node:os';

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

				resolve(stdout.replace(new RegExp(`${EOL}$`), ''));
			}
		);

		// Closing the pipe here rather than in the callback, which only runs once the
		// command has already exited. A command that reads standard input would
		// otherwise wait on a pipe nothing ever writes to, and never return.
		execCommandProcess.stdin?.end();
	});
}
