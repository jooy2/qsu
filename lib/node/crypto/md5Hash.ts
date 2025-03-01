import { createHash } from 'node:crypto';

export function md5Hash(str: string): string {
	return createHash('md5').update(str).digest('hex');
}
