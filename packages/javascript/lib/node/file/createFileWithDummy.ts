import { open } from 'fs/promises';
import { createFile } from './createFile.js';

export async function createFileWithDummy(filePath: string, size: number): Promise<boolean> {
	if (size === undefined || size === null) {
		throw new Error('Size is required');
	}
	if (size < 0) {
		throw new Error('Size must be 0 or greater');
	}

	try {
		if (size === 0) {
			await createFile(filePath);
			return true;
		}

		const data = await open(filePath, 'w');

		await data.write(Buffer.alloc(1), 0, 1, size - 1);
		await data.close();

		return true;
	} catch {
		return false;
	}
}
