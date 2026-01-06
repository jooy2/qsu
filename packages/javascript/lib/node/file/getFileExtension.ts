import { extname } from 'path';
import { getFileName } from './getFileName.js';

export function getFileExtension(filePath: string): string | null {
	const ext = extname(getFileName(filePath, true)).replace('.', '').toLowerCase();

	return ext?.length > 0 ? ext : null;
}
