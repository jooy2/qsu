import { posix, win32 } from 'path';

export function getFileName(filePath: string, withExtension = false): string {
	// For Windows path
	if (filePath.indexOf('/') === -1 && filePath.indexOf('\\') !== -1) {
		return win32.basename(filePath, withExtension ? undefined : win32.extname(filePath)) || '';
	}

	return posix.basename(filePath, withExtension ? undefined : posix.extname(filePath)) || '';
}
