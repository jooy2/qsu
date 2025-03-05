import { basename, extname, win32 } from 'path';

export function getFileName(filePath: string, withExtension = false): string {
	if (!filePath) {
		return '';
	}

	if (filePath.indexOf('/') === -1 && filePath.indexOf('\\') !== -1) {
		// Windows path
		if (withExtension) {
			return win32.basename(filePath);
		}

		return win32.basename(filePath, extname(filePath));
	}

	if (withExtension) {
		return basename(filePath);
	}

	return basename(filePath, extname(filePath));
}
