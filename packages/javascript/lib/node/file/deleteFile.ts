import { rm } from 'node:fs/promises';

export async function deleteFile(filePath: string): Promise<void> {
	// A path of nothing but whitespace is treated as no path at all, matching
	// the Dart implementation.
	if (!filePath?.trim()) {
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
