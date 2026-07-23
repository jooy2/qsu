import { getFileName } from './getFileName.js';

// CON, PRN, AUX, NUL, COM1-9 and LPT1-9 are device names reserved by Windows.
// They stay reserved even when an extension is appended (`nul.txt`).
const WINDOWS_RESERVED_NAME_REGEX = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;

export function isValidFileName(filePath: string, unixType?: boolean): boolean {
	let fileNameRegex;
	// Validate the *whole* name, extension included. Stripping the extension
	// first would let 'hello.:txt' through, because only 'hello' was checked.
	const fileName = getFileName(filePath, true);

	if (unixType) {
		fileNameRegex = /(^\s+$)|(^\.+$)|([:/]+)/;
	} else {
		// Windows
		fileNameRegex = /(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)/;

		if (WINDOWS_RESERVED_NAME_REGEX.test(fileName.split('.')[0])) {
			return false;
		}
	}

	return !fileNameRegex.test(fileName) && fileName.length <= 255;
}
