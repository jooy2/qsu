import { posix, win32 } from 'node:path';
import { normalizeFilePath } from './normalizeFilePath.js';

export function joinFilePath(isWindows: boolean, ...paths: string[]): string {
	return normalizeFilePath(isWindows ? win32.join(...paths) : posix.join(...paths), isWindows);
}
