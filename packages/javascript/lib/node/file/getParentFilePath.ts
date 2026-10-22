import { normalizeFilePath } from './normalizeFilePath.js';
import { posix, win32 } from 'node:path';

export function getParentFilePath(filePath: string, isWindows?: boolean): string {
	return normalizeFilePath(
		isWindows ? win32.dirname(filePath) : posix.dirname(filePath),
		isWindows
	);
}
