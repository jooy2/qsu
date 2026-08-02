import { copyFile, mkdir, readdir, rename, rm, stat } from 'fs/promises';
import { join } from 'path';

async function copyRecursive(filePath: string, targetFilePath: string): Promise<void> {
	const fileItem = await stat(filePath);

	if (!fileItem.isDirectory()) {
		await copyFile(filePath, targetFilePath);
		return;
	}

	await mkdir(targetFilePath, { recursive: true });

	const fileItems = await readdir(filePath);

	for (let i = 0, iLen = fileItems.length; i < iLen; i += 1) {
		await copyRecursive(join(filePath, fileItems[i]), join(targetFilePath, fileItems[i]));
	}
}

export async function moveFile(filePath: string, targetFilePath: string): Promise<void> {
	// A path of nothing but whitespace is treated as no path at all, matching
	// the Dart implementation.
	if (!filePath?.trim() || !targetFilePath?.trim()) {
		return;
	}

	try {
		await rename(filePath, targetFilePath);
	} catch (err) {
		// `rename` cannot cross a filesystem boundary, and moving out of /tmp,
		// into a mounted volume or onto another drive is exactly that. Copying
		// and then removing the source is the only way across.
		if ((err as NodeJS.ErrnoException)?.code !== 'EXDEV') {
			throw err;
		}

		await copyRecursive(filePath, targetFilePath);
		await rm(filePath, { recursive: true, force: true });
	}
}
