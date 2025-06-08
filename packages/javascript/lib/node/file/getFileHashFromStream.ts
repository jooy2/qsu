import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';

export async function getFileHashFromStream(
	fileStream: NodeJS.ReadableStream,
	algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'md5'
): Promise<string> {
	if (!fileStream) {
		throw new Error('Invalid file stream detected');
	}

	const hashHandler = createHash(algorithm);

	await pipeline(fileStream, hashHandler);

	return hashHandler.digest('hex');
}
