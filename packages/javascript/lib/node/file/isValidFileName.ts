import { getFileName } from './getFileName.js';

// CON, PRN, AUX, NUL, COM1-9 and LPT1-9 are device names reserved by Windows.
// They stay reserved even when an extension is appended (`nul.txt`).
const WINDOWS_RESERVED_NAME_REGEX = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;

// NUL terminates a path in the system calls underneath every filesystem, so a
// name carrying one is silently truncated rather than rejected. The rest of the
// C0 range and DEL are rejected by Windows outright and are never intentional.
const CONTROL_CHARACTER_REGEX = /[\u0000-\u001F\u007F]/;

// Filesystems cap a name at 255 *bytes*, not characters, so the limit is
// measured after encoding. '가'.repeat(100) is 100 characters but 300 bytes and
// cannot be created on ext4, APFS or NTFS.
const MAX_FILE_NAME_BYTES = 255;

export function isValidFileName(filePath: string, unixType?: boolean): boolean {
	let fileNameRegex;
	// Validate the *whole* name, extension included. Stripping the extension
	// first would let 'hello.:txt' through, because only 'hello' was checked.
	const fileName = getFileName(filePath, true);

	if (fileName.length < 1 || CONTROL_CHARACTER_REGEX.test(fileName)) {
		return false;
	}

	if (unixType) {
		fileNameRegex = /(^\s+$)|(^\.+$)|([:/]+)/;
	} else {
		// Windows
		fileNameRegex = /(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)/;

		if (WINDOWS_RESERVED_NAME_REGEX.test(fileName.split('.')[0])) {
			return false;
		}

		// Windows strips a trailing dot or space instead of reporting an error,
		// so 'report.' silently becomes 'report' and overwrites it.
		if (/[. ]$/.test(fileName)) {
			return false;
		}
	}

	return (
		!fileNameRegex.test(fileName) && Buffer.byteLength(fileName, 'utf8') <= MAX_FILE_NAME_BYTES
	);
}
