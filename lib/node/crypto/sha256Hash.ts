import { createHash } from 'node:crypto';

export function sha256Hash(str: string): string {
	return createHash('sha256').update(str).digest('hex');
}
