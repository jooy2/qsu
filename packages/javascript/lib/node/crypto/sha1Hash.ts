import { createHash } from 'crypto';
import type { BinaryToTextEncoding } from 'node:crypto';

export function sha1Hash(str: string, encoding?: BinaryToTextEncoding): string {
	return createHash('sha1')
		.update(str)
		.digest(encoding ?? 'hex');
}
