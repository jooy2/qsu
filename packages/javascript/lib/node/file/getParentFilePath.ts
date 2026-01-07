import { toValidFilePath } from './toValidFilePath.js';
import { posix, win32 } from 'path';

export function getParentFilePath(filePath: string, isWindows?: boolean): string {
	return toValidFilePath(isWindows ? win32.dirname(filePath) : posix.dirname(filePath), isWindows);
}
