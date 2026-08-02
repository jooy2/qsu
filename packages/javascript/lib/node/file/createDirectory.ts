import { mkdir, stat } from 'node:fs/promises';

export async function createDirectory(filePath: string, recursive = true): Promise<void> {
	if (recursive) {
		// `mkdir` with `recursive` is already a no-op for an existing directory,
		// so the `stat` that used to guard this call was a wasted system call.
		// It also reported success when a *file* sat at the path, because the
		// guard only asked whether something was there.
		await mkdir(filePath, { recursive: true });
		return;
	}

	try {
		await mkdir(filePath);
	} catch (err) {
		if ((err as NodeJS.ErrnoException)?.code !== 'EEXIST') {
			throw err;
		}

		// An existing directory stays a no-op. Anything else in the way is an
		// error the caller needs to see.
		const fileItem = await stat(filePath);

		if (!fileItem.isDirectory()) {
			throw err;
		}
	}
}
