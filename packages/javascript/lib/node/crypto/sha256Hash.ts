import { createHash } from 'crypto';
import type { BinaryToTextEncoding } from 'node:crypto';

export function sha256Hash(str: string, encoding?: BinaryToTextEncoding): string {
	return createHash('sha256')
		.update(str)
		.digest(encoding ?? 'hex');
}
