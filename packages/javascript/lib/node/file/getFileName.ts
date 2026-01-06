import { basename, extname, win32 } from 'path';

export function getFileName(filePath: string, withExtension = false): string {
	// For Windows path
	if (filePath.indexOf('/') === -1 && filePath.indexOf('\\') !== -1) {
		return win32.basename(filePath, withExtension ? undefined : extname(filePath)) || '';
	}

	return basename(filePath, withExtension ? undefined : extname(filePath)) || '';
}
