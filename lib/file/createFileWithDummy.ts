import { open } from 'fs/promises';
import { createFile } from './createFile.js';

export async function createFileWithDummy(filePath: string, size: number): Promise<boolean> {
	if (!size || size < 0) {
		throw new Error('Size is required');
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
	} catch (err) {
		return false;
	}
}
