import { readdir } from 'fs/promises';
import { join } from 'path';
import { deleteFile } from './deleteFile.js';

// Enough entries in flight to keep the disk busy without opening thousands of
// handles at once.
const DELETE_CONCURRENCY = 32;

export async function deleteAllFileFromDirectory(directoryPath: string): Promise<void> {
	let fileItems: Array<string> = [];

	try {
		fileItems = await readdir(directoryPath);
	} catch {
		// Do nothing
	}

	const fileItemLength: number = fileItems.length;

	// Awaiting one entry at a time leaves the process idle on a system call it
	// could have overlapped with the next one.
	for (let i = 0; i < fileItemLength; i += DELETE_CONCURRENCY) {
		await Promise.all(
			fileItems
				.slice(i, i + DELETE_CONCURRENCY)
				.map((fileItem) => deleteFile(join(directoryPath, fileItem)))
		);
	}
}
