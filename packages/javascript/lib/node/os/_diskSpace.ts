import { statfs } from 'node:fs/promises';
import { platform } from 'node:os';

/** (Private) The filesystem holding `path`, in bytes. */
export interface DiskSpace {
	total: number;
	free: number;
	used: number;
}

export async function diskSpace(path: string): Promise<DiskSpace> {
	// The filesystem error is thrown as it is, so `code`, `errno` and `path`
	// survive for the caller to read.
	const { blocks, bfree, bavail, frsize } = await statfs(path);

	return {
		total: blocks * frsize,
		// What may still be written. Windows reports a figure that already honours
		// the caller's quota; elsewhere the blocks a filesystem holds back for the
		// superuser are left out, so the free and the used size do not add up to
		// the total. This is the same split `df` shows.
		free: (platform() === 'win32' ? bfree : bavail) * frsize,
		used: (blocks - bfree) * frsize
	};
}
