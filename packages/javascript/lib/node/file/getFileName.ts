import { posix, win32 } from 'path';

export function getFileName(filePath: string, withExtension = false): string {
	const removeExtension = !withExtension && !filePath.endsWith('/') && !filePath.endsWith('\\');

	// For Windows path
	if (filePath.indexOf('/') === -1 && filePath.indexOf('\\') !== -1) {
		return win32.basename(filePath, removeExtension ? win32.extname(filePath) : undefined) || '';
	}

	return posix.basename(filePath, removeExtension ? posix.extname(filePath) : undefined) || '';
}
