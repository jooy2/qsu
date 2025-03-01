import { posix, win32 } from 'path';
import { toValidFilePath } from './toValidFilePath';

export function joinFilePath(isWindows: boolean, ...paths: string[]): string {
	if (isWindows) {
		return toValidFilePath(win32.join(...paths), true);
	}

	return toValidFilePath(posix.join(...paths), false);
}
