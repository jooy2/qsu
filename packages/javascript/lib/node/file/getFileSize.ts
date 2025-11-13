import { Stats } from 'fs';
import { stat } from 'fs/promises';

export async function getFileSize(filePath: string): Promise<number> {
	try {
		const fileItem: Stats = await stat(filePath);

		return fileItem.size;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}

	return -1;
}
