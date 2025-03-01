import { readdir } from 'node:fs/promises';
import { join } from 'path';
import { deleteFile } from './deleteFile.js';

export async function deleteAllFileFromDirectory(directoryPath: string): Promise<void> {
	let fileItems: Array<string> = [];

	try {
		fileItems = await readdir(directoryPath);
	} catch {
		// Do nothing
	}

	const fileItemLength: number = fileItems.length;

	for (let i = 0; i < fileItemLength; i += 1) {
		// eslint-disable-next-line no-await-in-loop
		await deleteFile(join(directoryPath, fileItems[i]));
	}
}
