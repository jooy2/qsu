import { rename } from 'node:fs/promises';

export async function moveFile(filePath: string, targetFilePath: string): Promise<void> {
	if (!filePath || !targetFilePath) {
		return;
	}

	await rename(filePath, targetFilePath);
}
