import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

// The 64 KB stream default costs measurably more system calls than it needs to
// on a file of any size.
const READ_CHUNK_SIZE = 1024 * 1024;

export async function getFileHashFromPath(
	filePath: string,
	algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'md5'
): Promise<string> {
	if (!filePath) {
		throw new Error('Invalid path');
	}

	const hashHandler = createHash(algorithm);

	await pipeline(createReadStream(filePath, { highWaterMark: READ_CHUNK_SIZE }), hashHandler);

	return hashHandler.digest('hex');
}
