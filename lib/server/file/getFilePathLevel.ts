import { posix } from 'path';
import { toPosixFilePath } from './toPosixFilePath';

export function getFilePathLevel(filePath: string): number {
	if (!filePath) {
		return -1;
	}

	if (filePath === '/') {
		return 1;
	}

	return toPosixFilePath(filePath.replace(/\\+$/, '')).split(posix.sep).length;
}
