import { execFile } from 'node:child_process';

// `attrib` prints the attribute letters first and the *absolute* path second
// (`A    H       C:\dir\file.txt`). Cutting the line where the path begins is
// the only reliable way to read the letters: removing the caller's path fails
// when a relative path was given, and an 'H' in a directory name then reads as
// hidden.
const ATTRIBUTE_COLUMN_REGEX = /^(.*?)\s+(?:[A-Za-z]:\\|\\\\)/;

export function isFileHidden(filePath: string, isWindows = false): Promise<boolean> {
	return new Promise<boolean>((resolve) => {
		if (isWindows) {
			// `execFile` runs `attrib` directly. `exec` passes the command line
			// through a shell, so a file name containing a quote closes the
			// quoting and the rest of the name runs as a command.
			execFile('attrib', [filePath], (error, stdout, stderr) => {
				if (error || stderr || !stdout) {
					resolve(false);
					return;
				}

				const firstLine = stdout.split(/\r?\n/).find((line) => line.trim().length > 0) || '';
				const attributes = ATTRIBUTE_COLUMN_REGEX.exec(firstLine);

				resolve(attributes ? attributes[1].includes('H') : false);
			});
		} else {
			resolve(/(^|\/)\.[^/.]/.test(filePath.split('/')?.pop() || '/'));
		}
	});
}
