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
	const { blocks, bfree, bavail, bsize } = await statfs(path);

	// The unit the block counts are in. `frsize` would name it on a POSIX system,
	// but Node only began reporting that field in v26, and libuv sets it from
	// `bsize` everywhere except Linux, where the two are the same number on every
	// filesystem in ordinary use.
	return {
		total: blocks * bsize,
		// What may still be written. Windows reports a figure that already honours
		// the caller's quota; elsewhere the blocks a filesystem holds back for the
		// superuser are left out, so the free and the used size do not add up to
		// the total. This is the same split `df` shows.
		free: (platform() === 'win32' ? bfree : bavail) * bsize,
		used: (blocks - bfree) * bsize
	};
}
