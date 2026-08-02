import { createHash } from 'node:crypto';
import type { BinaryToTextEncoding } from 'node:crypto';

export function sha512Hash(str: string, encoding?: BinaryToTextEncoding): string {
	return createHash('sha512')
		.update(str)
		.digest(encoding ?? 'hex');
}
