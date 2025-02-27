import { rm } from 'fs/promises';

export async function deleteFile(filePath: string): Promise<void> {
	if (!filePath) {
		return;
	}

	try {
		await rm(filePath, {
			recursive: true,
			force: true
		});
	} catch {
		// Do Nothing
	}
}
