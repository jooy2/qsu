import { posix, win32 } from 'path';
import { toValidFilePath } from './toValidFilePath.js';

export function joinFilePath(isWindows: boolean, ...paths: string[]): string {
	return toValidFilePath(isWindows ? win32.join(...paths) : posix.join(...paths), isWindows);
}
