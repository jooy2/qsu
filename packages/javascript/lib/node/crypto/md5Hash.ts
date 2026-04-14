import { createHash } from 'crypto';
import type { BinaryToTextEncoding } from 'node:crypto';

export function md5Hash(str: string, encoding?: BinaryToTextEncoding): string {
	return createHash('md5')
		.update(str)
		.digest(encoding ?? 'hex');
}
