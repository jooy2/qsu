import { createHash } from 'node:crypto';

export function sha1Hash(str: string): string {
	return createHash('sha1').update(str).digest('hex');
}
