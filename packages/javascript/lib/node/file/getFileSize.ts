import { Stats } from 'node:fs';
import { stat } from 'node:fs/promises';

export async function getFileSize(filePath: string): Promise<number> {
	// The filesystem error is thrown as it is, so `code`, `errno` and `path`
	// survive for the caller to read.
	const fileItem: Stats = await stat(filePath);

	return fileItem.size;
}
