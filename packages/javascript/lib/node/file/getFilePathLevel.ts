import { posix } from 'path';
import { toPosixFilePath } from './toPosixFilePath.js';

export function getFilePathLevel(filePath: string): number {
	if (!filePath) {
		return -1;
	}

	if (filePath === '/') {
		return 1;
	}

	// Strip trailing separators of either flavour so that '/home/user' and
	// '/home/user/' report the same level.
	return toPosixFilePath(filePath.replace(/[\\/]+$/, '')).split(posix.sep).length;
}
