import { mkdir } from 'node:fs/promises';
import { isFileExists } from './isFileExists.js';

export async function createDirectory(filePath: string, recursive = true): Promise<void> {
	try {
		if (!(await isFileExists(filePath))) {
			await mkdir(filePath, {
				recursive
			});
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
}
