import { mkdir, open, utimes } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function createFile(filePath: string): Promise<void> {
	// A path of nothing but whitespace is treated as no path at all, matching
	// the Dart implementation, which otherwise creates a file literally named
	// '   ' out of an empty form field.
	if (!filePath?.trim()) {
		return;
	}

	const date: Date = new Date();

	try {
		await utimes(filePath, date, date);
	} catch {
		// The file does not exist yet. Its parent directory may not exist
		// either, so it is created first rather than reporting ENOENT.
		await mkdir(dirname(filePath), { recursive: true });

		const data = await open(filePath, 'a');

		await data.close();
	}
}
