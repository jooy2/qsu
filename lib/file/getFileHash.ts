import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export async function getFileHash(
	filePath: string,
	algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'md5'
): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!filePath) {
			reject(new Error('Invalid path'));
			return;
		}

		const hashHandler = createHash(algorithm);
		const stream = createReadStream(filePath);

		stream.on('error', (err: Error) => {
			reject(err);
		});

		stream.on('data', (chunk: Buffer | string) => {
			hashHandler.update(chunk);
		});

		stream.on('end', () => {
			resolve(hashHandler.digest('hex'));
		});
	});
}
